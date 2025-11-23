import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { parseSRT } from '@/lib/srtParser'
import { SubtitleEntry } from '@/lib/movieDatabase'
import { Upload } from 'lucide-react'

interface UploadDialogProps {
  onUpload: (entries: SubtitleEntry[]) => void
}

export function UploadDialog({ onUpload }: UploadDialogProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null)
  const [srtFile, setSrtFile] = useState<File | null>(null)
  const [movieTitle, setMovieTitle] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const handleUpload = async () => {
    if (!videoFile || !srtFile || !movieTitle) return

    setIsProcessing(true)
    try {
      const srtContent = await srtFile.text()
      const parsedSubtitles = parseSRT(srtContent)
      const videoUrl = URL.createObjectURL(videoFile)

      const newEntries: SubtitleEntry[] = parsedSubtitles.map(sub => ({
        id: `${movieTitle}-${sub.id}`,
        text: sub.text,
        startTime: sub.startTime,
        endTime: sub.endTime,
        movieTitle: movieTitle,
        year: new Date().getFullYear(),
        videoUrl: videoUrl
      }))

      onUpload(newEntries)
      setIsOpen(false)
      // Reset form
      setVideoFile(null)
      setSrtFile(null)
      setMovieTitle('')
    } catch (error) {
      console.error('Error processing files:', error)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Upload className="h-4 w-4" />
          Upload Video
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Video & Subtitles</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="movie-title">Movie Title</Label>
            <Input
              id="movie-title"
              value={movieTitle}
              onChange={(e) => setMovieTitle(e.target.value)}
              placeholder="Enter movie title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="video-file">Video File (MP4, WebM)</Label>
            <Input
              id="video-file"
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="srt-file">Subtitles (SRT)</Label>
            <Input
              id="srt-file"
              type="file"
              accept=".srt"
              onChange={(e) => setSrtFile(e.target.files?.[0] || null)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleUpload} disabled={!videoFile || !srtFile || !movieTitle || isProcessing}>
            {isProcessing ? 'Processing...' : 'Add to Library'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
