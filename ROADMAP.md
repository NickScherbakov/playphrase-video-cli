# PlayPhrase Roadmap 🗺️

This document outlines the development plan and future vision for **PlayPhrase 2025**.

## 🚀 Current Status (v2.0)
- ✅ Modern Glassmorphism UI
- ✅ Async Backend (FastAPI + aiosqlite)
- ✅ FTS5 Search (Exact & Like fallback)
- ✅ Clip Downloading
- ✅ Random "I'm Feeling Lucky" Mode
- ✅ Web-based Upload & Reindexing

## 📅 Short-term Goals (v2.1 - Polish & UX)
- [ ] **UI/UX Improvements:**
    - Add loading skeletons/spinners during search.
    - Toast notifications for copy/download actions.
    - Mobile-responsive layout refinements.
- [ ] **Subtitle Support:**
    - Support for `.vtt` format (automatically convert to srt or parse native).
    - Robust handling of different encodings (UTF-8, Latin-1, cp1251).
- [ ] **Player Controls:**
    - Volume persistence (remember volume between clips).
    - Playback speed control (0.5x, 1.5x, 2x).

## 🔭 Medium-term Goals (v2.5 - Functionality)
- [ ] **Advanced Search:**
    - Filter by movie/series title.
    - Regex search support.
- [ ] **Content Management:**
    - Delete videos/subtitles via UI.
    - Edit subtitle text manually.
- [ ] **Clip Editor:**
    - Adjust start/end times of the clip before downloading.
    - Burn subtitles into the downloaded video (hardsubs).

## 🔮 Long-term Vision (v3.0 - AI & Scaling)
- [ ] **AI Integration:**
    - **Semantic Search:** Find clips by meaning, not just exact keywords (using vector embeddings).
    - **Auto-Subtitling:** Integrate OpenAI Whisper to generate subtitles for videos that don't have them.
- [ ] **Platform:**
    - Desktop App wrapper (Electron or Tauri).
    - Docker containerization for easy deployment on NAS/Home Servers.

## 🤝 Community Requests
- [ ] Multi-language UI support.
- [ ] Public shareable links (for self-hosted instances).
