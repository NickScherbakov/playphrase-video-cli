#!/usr/bin/env python3
import argparse
import os
import re
import sqlite3
from pathlib import Path
from typing import List, Tuple

SRT_BLOCK_RE = re.compile(
    r'(\d+)\s*\r?\n'
    r'(\d{2}:\d{2}:\d{2},\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2},\d{3})\s*\r?\n'
    r'(.+?)(?:\r?\n\r?\n|\Z)',
    re.DOTALL
)

TIME_PARTS_RE = re.compile(r'(\d{2}):(\d{2}):(\d{2}),(\d{3})')
VIDEO_EXTS = {'.mp4', '.mkv'}
SUB_EXT = '.srt'

def time_to_seconds(ts: str) -> float:
    m = TIME_PARTS_RE.match(ts.strip())
    if not m:
        raise ValueError(f'Bad timestamp: {ts}')
    h, mi, s, ms = map(int, m.groups())
    return h * 3600 + mi * 60 + s + ms / 1000.0

def parse_srt(path: Path) -> List[Tuple[str, float, float]]:
    text = path.read_text(encoding='utf-8', errors='replace')
    entries = []
    for match in SRT_BLOCK_RE.finditer(text):
        start_raw = match.group(2)
        end_raw = match.group(3)
        body = match.group(4).strip()
        body_clean = re.sub(r'<[^>]+>', '', body)
        body_clean = re.sub(r'\s+', ' ', body_clean).strip()
        if not body_clean:
            continue
        start = time_to_seconds(start_raw)
        end = time_to_seconds(end_raw)
        if end <= start:
            continue
        entries.append((body_clean, start, end))
    return entries

def init_db(db_path: Path):
    conn = sqlite3.connect(str(db_path))
    conn.execute('PRAGMA journal_mode=WAL;')
    conn.execute('PRAGMA synchronous=NORMAL;')
    conn.execute('''
        CREATE TABLE IF NOT EXISTS subtitles (
            id INTEGER PRIMARY KEY,
            text TEXT NOT NULL,
            start_time REAL NOT NULL,
            end_time REAL NOT NULL,
            video_path TEXT NOT NULL
        );
    ''')
    conn.execute('''
        CREATE VIRTUAL TABLE IF NOT EXISTS subtitles_fts 
        USING fts5(text, content='subtitles', content_rowid='id');
    ''')
    conn.execute('''
        CREATE TRIGGER IF NOT EXISTS subtitles_ai AFTER INSERT ON subtitles BEGIN
            INSERT INTO subtitles_fts(rowid, text) VALUES (new.id, new.text);
        END;
    ''')
    conn.execute('''
        CREATE TRIGGER IF NOT EXISTS subtitles_ad AFTER DELETE ON subtitles BEGIN
            INSERT INTO subtitles_fts(subtitles_fts, rowid, text) VALUES('delete', old.id, old.text);
        END;
    ''')
    conn.execute('''
        CREATE TRIGGER IF NOT EXISTS subtitles_au AFTER UPDATE ON subtitles BEGIN
            INSERT INTO subtitles_fts(subtitles_fts, rowid, text) VALUES('delete', old.id, old.text);
            INSERT INTO subtitles_fts(rowid, text) VALUES (new.id, new.text);
        END;
    ''')
    conn.commit()
    return conn

def find_video_for_sub(srt_path: Path, search_root: Path) -> Path | None:
    base = srt_path.stem
    for ext in VIDEO_EXTS:
        candidate = srt_path.with_suffix(ext)
        if candidate.exists():
            return candidate
    for p in srt_path.parent.iterdir():
        if p.is_file() and p.suffix.lower() in VIDEO_EXTS and base in p.stem:
            return p
    for p in search_root.rglob('*'):
        if p.is_file() and p.suffix.lower() in VIDEO_EXTS and base in p.stem:
            return p
    return None

def ingest(root: Path, db_path: Path):
    conn = init_db(db_path)
    cur = conn.cursor()
    for srt in root.rglob(f'*{SUB_EXT}'):
        video = find_video_for_sub(srt, root)
        if not video:
            print(f'[warn] Video not found for {srt}')
            continue
        entries = parse_srt(srt)
        for text, start, end in entries:
            cur.execute(
                'INSERT INTO subtitles(text, start_time, end_time, video_path) VALUES (?,?,?,?)',
                (text, start, end, str(video))
            )
        print(f'[ok] {srt.name}: {len(entries)} entries')
    conn.commit()
    conn.close()


def main():
    ap = argparse.ArgumentParser(description='Build subtitles SQLite + FTS5 index.')
    ap.add_argument('media_root', type=str, help='Root directory containing video + .srt files')
    ap.add_argument('--db', type=str, default='subtitles.db', help='SQLite database file')
    args = ap.parse_args()
    root = Path(args.media_root).resolve()
    if not root.exists():
        raise SystemExit(f'Root does not exist: {root}')
    ingest(root, Path(args.db).resolve())

if __name__ == '__main__':
    main()
