# FFmpeg Setup Guide

This project requires FFmpeg for video processing. Follow the instructions below to install it.

## Windows

1. **Download FFmpeg**
   - Visit [ffmpeg.org](https://ffmpeg.org/download.html#build-windows)
   - Or download directly from [gyan.dev](https://www.gyan.dev/ffmpeg/builds/ffmpeg-release-essentials.zip)
   - Download the "essentials" build (smaller, contains only necessary tools)

2. **Extract Files**
   - Extract the downloaded archive
   - You'll get a folder like `ffmpeg-X.X.X-essentials_build`

3. **Place in Project Directory**
   - Copy the entire ffmpeg folder to this project's root directory
   - The path should be: `playphrase-main/ffmpeg-X.X.X-essentials_build/`

4. **Verify Installation**
   - Open PowerShell in the project directory
   - Run: `.\ffmpeg-8.0.1-essentials_build\bin\ffmpeg.exe -version`
   - You should see FFmpeg version information

## Linux

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install ffmpeg

# Fedora
sudo dnf install ffmpeg

# Arch Linux
sudo pacman -S ffmpeg
```

## macOS

```bash
# Using Homebrew
brew install ffmpeg
```

## Environment Variables (Optional)

For easier access, you can add FFmpeg to your system PATH:

### Windows
1. Right-click "This PC" → Properties
2. Advanced system settings → Environment Variables
3. Under System Variables, select "Path" → Edit
4. Add: `C:\Users\YourUsername\Documents\GitHub\playphrase-main\ffmpeg-X.X.X-essentials_build\bin`

### Linux/macOS
Add to `~/.bashrc` or `~/.zshrc`:
```bash
export PATH="/path/to/playphrase-main/ffmpeg-X.X.X-essentials_build/bin:$PATH"
```

## Verification

After installation, the project scripts should automatically detect FFmpeg in:
- The project's ffmpeg folder
- System PATH

If you encounter issues, ensure the `bin` directory contains:
- `ffmpeg.exe` (Windows) or `ffmpeg` (Linux/macOS)
- `ffprobe.exe` (Windows) or `ffprobe` (Linux/macOS)

## Why FFmpeg is Not Included

FFmpeg binaries are large (90+ MB each) and exceed GitHub's file size recommendations. By downloading FFmpeg separately, we keep the repository lightweight and ensure you always have the latest version.
