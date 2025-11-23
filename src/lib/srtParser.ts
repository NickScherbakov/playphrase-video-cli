export interface ParsedSubtitle {
  id: string
  startTime: number
  endTime: number
  text: string
}

function timeToSeconds(timeString: string): number {
  const [time, milliseconds] = timeString.split(',')
  const [hours, minutes, seconds] = time.split(':').map(Number)
  return hours * 3600 + minutes * 60 + seconds + Number(milliseconds) / 1000
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

    const timeMatch = timeLine.match(/(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/)
    
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
