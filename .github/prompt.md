Act as a Senior Full-Stack Developer and Video Processing Expert.

I need you to write a complete, functional MVP (Minimum Viable Product) for a web application similar to "Playphrase.me".

**Core Concept:**
The user types a phrase (e.g., "I'll be back") into a search bar. The app searches a local database of subtitles, finds matches, and plays the exact video clip from a local movie file corresponding to that subtitle's timestamp.

**Tech Stack Requirements:**
1.  **Backend:** Python (FastAPI or Flask).
2.  **Database:** SQLite (utilizing FTS5 - Full Text Search) to store subtitle text, start time, end time, and file path.
3.  **Video Processing:** FFmpeg (subprocess calls) to slice video clips dynamically or serve them.
4.  **Frontend:** Simple HTML/JavaScript (Vanilla or generic) with a video player and a search input.

**Please provide the code in the following steps:**

**Step 1: The Database & Parser**
Write a Python script that:
* Scans a specific folder for `.mkv` or `.mp4` files and their corresponding `.srt` subtitle files.
* Parses the `.srt` files.
* Inserts the data into the SQLite database. Table schema should include: `id`, `text`, `start_time`, `end_time`, `video_path`.

**Step 2: The Backend API**
Write the FastAPI/Flask application that:
* Has an endpoint `/search?q=phrase` that queries the SQLite FTS database.
* Has an endpoint `/stream/{subtitle_id}` that uses FFmpeg to cut the specific segment of the video (based on start/end timestamps) and streams it to the browser.

**Step 3: The Frontend**
Write a single `index.html` file that:
* Has a search bar.
* Fetches results from the API.
* Automatically plays the video clip of the first result.
* Has "Next/Prev" buttons to jump to the next occurrence of the phrase.

**Step 4: Instructions**
Briefly explain how to install dependencies (requirements.txt) and run the server.