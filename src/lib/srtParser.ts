export interface ParsedSubtitle {
  id: string
  startTime: number
  endTime: number
  text: string
}

function timeToSeconds(timeString: string): number {
  // Support both SRT format (00:00:00,000) and VTT format (00:00:00.000)
  const normalized = timeString.replace(',', '.')
  const [time, milliseconds] = normalized.split('.')
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds + Number(milliseconds || 0) / 1000
}

export function parseSRT(srtContent: string): ParsedSubtitle[] {
  const entries: ParsedSubtitle[] = []
  const blocks = srtContent.trim().split(/\n\s*\n/)

  blocks.forEach((block, index) => {
    const lines = block.split('\n')
    if (lines.length < 3) return

    // Skip index line (lines[0])
    const timeLine = lines[1]
    const textLines = lines.slice(2)

    // Match both SRT format (,) and VTT format (.)
    const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2}[.,]\d{3}) --> (\d{2}:\d{2}:\d{2}[.,]\d{3})/)
    
    if (timeMatch) {
      const startTime = timeToSeconds(timeMatch[1])
      const endTime = timeToSeconds(timeMatch[2])
      const text = textLines.join(' ').replace(/<[^>]*>/g, '') // Remove HTML tags if any

      entries.push({
        id: `custom-${index}`,
        startTime,
        endTime,
        text
      })
    }
  })

  return entries
}

export function parseVTT(vttContent: string): ParsedSubtitle[] {
  // Remove WEBVTT header and metadata
  const content = vttContent.replace(/^WEBVTT.*?\n\n/s, '').replace(/NOTE.*?\n/g, '')
  
  const entries: ParsedSubtitle[] = []
  const blocks = content.trim().split(/\n\s*\n/)

  blocks.forEach((block, index) => {
    const lines = block.trim().split('\n')
    if (lines.length < 2) return

    let timeLine = ''
    let textLines: string[] = []
    
    // VTT can have optional cue identifier
    if (lines[0].includes('-->')) {
      timeLine = lines[0]
      textLines = lines.slice(1)
    } else if (lines.length >= 2 && lines[1].includes('-->')) {
      timeLine = lines[1]
      textLines = lines.slice(2)
    } else {
      return
    }

    // Match VTT time format (may include position info after timestamp)
    const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2}\.\d{3}) --> (\d{2}:\d{2}:\d{2}\.\d{3})/)
    
    if (timeMatch) {
      const startTime = timeToSeconds(timeMatch[1])
      const endTime = timeToSeconds(timeMatch[2])
      const text = textLines
        .join(' ')
        .replace(/<[^>]*>/g, '') // Remove HTML/VTT tags
        .replace(/\{[^}]*\}/g, '') // Remove voice tags
        .trim()

      if (text) {
        entries.push({
          id: `custom-${index}`,
          startTime,
          endTime,
          text
        })
      }
    }
  })

  return entries
}

export function parseSubtitles(content: string, filename: string): ParsedSubtitle[] {
  const extension = filename.toLowerCase().split('.').pop()
  
  if (extension === 'vtt') {
    return parseVTT(content)
  } else if (extension === 'srt') {
    return parseSRT(content)
  } else {
    // Try to auto-detect format
    if (content.trim().startsWith('WEBVTT')) {
      return parseVTT(content)
    } else {
      return parseSRT(content)
    }
  }
}
