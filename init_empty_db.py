import sqlite3
conn = sqlite3.connect('subtitles.db')
conn.execute('CREATE TABLE IF NOT EXISTS subtitles (id INTEGER PRIMARY KEY, text TEXT, start_time REAL, end_time REAL, video_path TEXT)')
conn.execute('CREATE VIRTUAL TABLE IF NOT EXISTS subtitles_fts USING fts5(text, content="subtitles", content_rowid="id")')
conn.commit()
print('Empty DB created')
