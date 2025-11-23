#!/usr/bin/env python3
"""Generate demo video matching demo.srt subtitles"""
import subprocess
from pathlib import Path

FFMPEG = Path('ffmpeg-8.0.1-essentials_build/bin/ffmpeg.exe').resolve()
OUTPUT = Path('media/demo.mp4')

phrases = [
    (1.0, 3.0, "Hello world"),
    (4.0, 6.0, "I will be back"),
    (7.0, 9.0, "Force is with you"),
    (9.5, 11.5, "Show me the money")
]

# Build drawtext filters
filters = []
for start, end, text in phrases:
    filters.append(
        f"drawtext=fontfile='C\\:/Windows/Fonts/arial.ttf':"
        f"text='{text}':"
        f"fontcolor=white:fontsize=48:"
        f"x=(w-text_w)/2:y=(h-text_h)/2:"
        f"enable='between(t,{start},{end})'"
    )

vf = ','.join(filters)

cmd = [
    str(FFMPEG),
    '-f', 'lavfi',
    '-i', 'color=c=black:s=640x360:d=12',
    '-vf', vf,
    '-y',
    str(OUTPUT)
]

print('Generating demo video...')
result = subprocess.run(cmd, capture_output=True, text=True)
if result.returncode == 0:
    print(f'Created: {OUTPUT}')
else:
    print('Error:', result.stderr)
