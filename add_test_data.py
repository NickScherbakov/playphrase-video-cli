#!/usr/bin/env python3
"""
Добавляет тестовые данные в базу subtitles.db для проверки поиска
без необходимости импорта реальных видео/субтитров
"""
import sqlite3

TEST_DATA = [
    ("I'll be back", 120.5, 122.3, "terminator.mp4"),
    ("May the Force be with you", 45.0, 47.5, "starwars.mp4"),
    ("You talking to me?", 180.2, 181.8, "taxi_driver.mp4"),
    ("Here's looking at you, kid", 95.3, 97.1, "casablanca.mp4"),
    ("I'm going to make him an offer he can't refuse", 210.5, 213.8, "godfather.mp4"),
    ("You can't handle the truth!", 305.1, 307.0, "few_good_men.mp4"),
    ("Houston, we have a problem", 88.5, 90.2, "apollo13.mp4"),
    ("Show me the money!", 142.7, 144.3, "jerry_maguire.mp4"),
    ("I see dead people", 201.4, 203.0, "sixth_sense.mp4"),
    ("There's no place like home", 115.8, 117.5, "wizard_of_oz.mp4"),
]

def add_test_data():
    conn = sqlite3.connect('subtitles.db')
    cur = conn.cursor()
    
    # Проверяем, есть ли уже данные
    count = cur.execute('SELECT COUNT(*) FROM subtitles').fetchone()[0]
    if count > 0:
        print(f'Database already has {count} entries.')
        response = input('Add test data anyway? (y/n): ')
        if response.lower() != 'y':
            print('Aborted.')
            return
    
    for text, start, end, video in TEST_DATA:
        cur.execute(
            'INSERT INTO subtitles(text, start_time, end_time, video_path) VALUES (?,?,?,?)',
            (text, start, end, video)
        )
    
    conn.commit()
    print(f'Added {len(TEST_DATA)} test entries.')
    
    # Показываем пример поиска
    print('\nExample searches:')
    print("  /search?q=back")
    print("  /search?q=force")
    print("  /search?q=truth")
    
    conn.close()

if __name__ == '__main__':
    add_test_data()
