#!/usr/bin/env python3
"""Ultra-simple launcher for PlayPhrase MVP.

Run just:
    python run_app.py

Steps performed automatically:
 1. Create `media/` folder if missing.
 2. If no .srt files found, create a tiny example `media/demo.srt`.
 3. Build `subtitles.db` (only if empty/missing).
 4. Start FastAPI server at http://127.0.0.1:8000.

Drop your video+subtitle pairs (movie.mp4 + movie.srt) into `media/` before or after first run.
"""

from pathlib import Path
import sqlite3
import uvicorn
import sys

try:
    from build_subtitles_db import ingest
except ImportError as e:
    print("[fatal] Cannot import ingestion logic:", e)
    sys.exit(1)

MEDIA_ROOT = Path('media').resolve()
DB_PATH = Path('subtitles.db').resolve()

def ensure_media_folder():
    MEDIA_ROOT.mkdir(exist_ok=True)
    srt_count = sum(1 for _ in MEDIA_ROOT.rglob('*.srt'))
    if srt_count == 0:
        demo_path = MEDIA_ROOT / 'demo.srt'
        if not demo_path.exists():
            demo_path.write_text(
                "1\n00:00:01,000 --> 00:00:03,000\nHello world\n\n"
                "2\n00:00:05,000 --> 00:00:07,000\nI'll be back\n\n",
                encoding='utf-8'
            )
            print('[info] Created example subtitle: media/demo.srt')
            print('[hint] Add a matching video file: media/demo.mp4 to test streaming.')
        else:
            print('[info] Example subtitle already present.')
    else:
        print(f'[info] Found {srt_count} subtitle file(s) in media/.')

def db_has_rows(db: Path) -> bool:
    if not db.exists():
        return False
    try:
        conn = sqlite3.connect(str(db))
        cur = conn.cursor()
        cur.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='subtitles'")
        if not cur.fetchone():
            conn.close()
            return False
        cur.execute('SELECT COUNT(*) FROM subtitles')
        count = cur.fetchone()[0]
        conn.close()
        return count > 0
    except Exception as e:
        print('[warn] Could not read existing DB:', e)
        return False

def build_db_if_needed():
    if db_has_rows(DB_PATH):
        print('[info] Using existing subtitles.db')
        return
    print('[info] Building database from media/...')
    ingest(MEDIA_ROOT, DB_PATH)
    if db_has_rows(DB_PATH):
        print('[info] Database ready.')
    else:
        print('[warn] Database empty; add .srt files into media/ and rerun.')

def start_server():
    print('\n==== PlayPhrase MVP ====' )
    print('Open: http://127.0.0.1:8000')
    print('Search any phrase. Ctrl+C to stop.')
    print('========================\n')
    uvicorn.run('app:app', host='127.0.0.1', port=8000, reload=False)

def main():
    ensure_media_folder()
    build_db_if_needed()
    start_server()

if __name__ == '__main__':
    main()
