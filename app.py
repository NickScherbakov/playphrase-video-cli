#!/usr/bin/env python3
import asyncio
import os
import subprocess
from pathlib import Path
from typing import List, Optional

import aiosqlite
from fastapi import FastAPI, HTTPException, Query, UploadFile, File
from fastapi.responses import StreamingResponse, JSONResponse, FileResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from build_subtitles_db import parse_srt, ingest

DB_PATH = Path('subtitles.db')
MEDIA_ROOT = Path('media')
FFMPEG_BIN = str(Path('ffmpeg-8.0.1-essentials_build/bin/ffmpeg.exe').resolve())

app = FastAPI(title='PlayPhrase 2025', version='2.0.0')
app.mount('/static', StaticFiles(directory='.'), name='static')
app.mount('/media', StaticFiles(directory=str(MEDIA_ROOT)), name='media')

class Subtitle(BaseModel):
    id: int
    text: str
    start_time: float
    end_time: float
    video_path: str

def ensure_media():
    MEDIA_ROOT.mkdir(exist_ok=True)

async def get_db_path():
    return str(DB_PATH)

@app.get('/search', response_model=List[Subtitle])
async def search(q: str = Query(min_length=1), limit: int = 50):
    phrase = q.strip()
    if ' ' in phrase and '"' not in phrase:
        phrase = f'"{phrase}"'
    
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        # FTS5 Search
        sql = '''
        SELECT s.id, s.text, s.start_time, s.end_time, s.video_path
        FROM subtitles s
        JOIN subtitles_fts f ON s.id = f.rowid
        WHERE subtitles_fts MATCH ?
        ORDER BY s.start_time
        LIMIT ?
        '''
        async with db.execute(sql, (phrase, limit)) as cursor:
            rows = await cursor.fetchall()
            
        if not rows:
            # Fallback to LIKE
            like_sql = '''
            SELECT id, text, start_time, end_time, video_path
            FROM subtitles
            WHERE text LIKE ?
            ORDER BY start_time
            LIMIT ?
            '''
            async with db.execute(like_sql, (f'%{q}%', limit)) as cursor:
                rows = await cursor.fetchall()
                
        return [Subtitle(**dict(r)) for r in rows]

@app.get('/random', response_model=Subtitle)
async def random_quote():
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute('SELECT * FROM subtitles ORDER BY RANDOM() LIMIT 1') as cursor:
            row = await cursor.fetchone()
            if not row:
                raise HTTPException(status_code=404, detail="No subtitles found")
            return Subtitle(**dict(row))

@app.get('/download/{subtitle_id}')
async def download_clip(subtitle_id: int):
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute('SELECT * FROM subtitles WHERE id=?', (subtitle_id,)) as cursor:
            row = await cursor.fetchone()
    
    if not row:
        raise HTTPException(status_code=404, detail='Subtitle not found')
        
    start = row['start_time']
    end = row['end_time']
    video_path = row['video_path']
    duration = max(0.5, end - start)
    
    if not Path(video_path).exists():
        raise HTTPException(status_code=404, detail='Video file missing')

    # Generate a filename
    safe_text = "".join([c for c in row['text'] if c.isalnum() or c in (' ', '-', '_')]).strip()[:30]
    filename = f"playphrase_{subtitle_id}_{safe_text}.mp4"

    # FFmpeg command to cut and re-encode for compatibility
    cmd = [
        FFMPEG_BIN,
        '-hide_banner', '-loglevel', 'error',
        '-ss', f'{start:.3f}',
        '-i', video_path,
        '-t', f'{duration:.3f}',
        '-c:v', 'libx264', '-preset', 'fast', '-crf', '23',
        '-c:a', 'aac', '-b:a', '128k',
        '-movflags', '+faststart',
        '-f', 'mp4',
        '-'
    ]

    try:
        proc = await asyncio.create_subprocess_exec(
            *cmd,
            stdout=asyncio.subprocess.PIPE,
            stderr=asyncio.subprocess.PIPE
        )
    except FileNotFoundError:
        raise HTTPException(status_code=500, detail='ffmpeg not found')

    async def stream_generator():
        try:
            while True:
                chunk = await proc.stdout.read(64 * 1024)
                if not chunk:
                    break
                yield chunk
        finally:
            # Ensure process is cleaned up
            if proc.returncode is None:
                try:
                    proc.terminate()
                    await proc.wait()
                except ProcessLookupError:
                    pass

    return StreamingResponse(
        stream_generator(),
        media_type='video/mp4',
        headers={"Content-Disposition": f"attachment; filename={filename}"}
    )

@app.get('/')
def root():
    index_path = Path('index.html')
    if index_path.exists():
        return FileResponse(str(index_path), media_type='text/html')
    return {'message': 'PlayPhrase 2025 API'}

@app.post('/upload')
async def upload_media(video_file: UploadFile = File(None), subtitle_file: UploadFile = File(None)):
    ensure_media()
    if not video_file and not subtitle_file:
        raise HTTPException(status_code=400, detail='Provide at least one file')

    saved_video_path = None
    saved_sub_path = None

    if video_file:
        if not video_file.filename.lower().endswith(('.mp4', '.mkv')):
            raise HTTPException(status_code=400, detail='Video must be .mp4 or .mkv')
        target_video = MEDIA_ROOT / Path(video_file.filename).name
        content = await video_file.read()
        with open(target_video, 'wb') as f:
            f.write(content)
        saved_video_path = target_video

    if subtitle_file:
        if not subtitle_file.filename.lower().endswith('.srt'):
            raise HTTPException(status_code=400, detail='Subtitle must be .srt')
        
        original_sub = Path(subtitle_file.filename).name
        if saved_video_path:
            base = saved_video_path.stem
            sub_name = base + '.srt'
        else:
            sub_name = original_sub
            
        target_sub = MEDIA_ROOT / sub_name
        content = await subtitle_file.read()
        with open(target_sub, 'wb') as f:
            f.write(content)
        saved_sub_path = target_sub

    inserted = 0
    if saved_sub_path:
        try:
            # Run parsing in thread pool to avoid blocking
            entries = await asyncio.to_thread(parse_srt, saved_sub_path)
            
            if not saved_video_path:
                stem = saved_sub_path.stem
                for ext in ('.mp4', '.mkv'):
                    candidate = MEDIA_ROOT / f'{stem}{ext}'
                    if candidate.exists():
                        saved_video_path = candidate
                        break
            
            if not saved_video_path:
                saved_video_path = Path(f'{saved_sub_path.stem}.mp4')

            async with aiosqlite.connect(DB_PATH) as db:
                for text, start, end in entries:
                    # Check dup
                    async with db.execute(
                        'SELECT 1 FROM subtitles WHERE video_path=? AND ABS(start_time-?)<0.001 AND text=?',
                        (str(saved_video_path), start, text)
                    ) as cursor:
                        if await cursor.fetchone():
                            continue
                    
                    await db.execute(
                        'INSERT INTO subtitles(text, start_time, end_time, video_path) VALUES (?,?,?,?)',
                        (text, start, end, str(saved_video_path))
                    )
                    inserted += 1
                await db.commit()
                
        except Exception as e:
            raise HTTPException(status_code=500, detail=f'Failed to process subtitle: {e}')

    return JSONResponse({
        'video_saved': str(saved_video_path) if saved_video_path else None,
        'subtitle_saved': str(saved_sub_path) if saved_sub_path else None,
        'entries_inserted': inserted
    })

@app.post('/reindex')
async def reindex_endpoint():
    ensure_media()
    if DB_PATH.exists():
        DB_PATH.unlink()
    
    # Run ingest in thread pool
    await asyncio.to_thread(ingest, MEDIA_ROOT, DB_PATH)
    
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute('SELECT COUNT(*) FROM subtitles') as cursor:
            row = await cursor.fetchone()
            count = row[0]
            
    return {'rows': count, 'message': 'Reindex complete'}
