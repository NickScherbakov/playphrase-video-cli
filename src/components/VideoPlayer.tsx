import { useEffect, useRef, useState } from 'react'
import { Play, Pause } from '@phosphor-icons/react'
import { Card } from '@/components/ui/card'
import type { SubtitleEntry } from '@/lib/movieDatabase'

interface VideoPlayerProps {
  entry: SubtitleEntry
  autoPlay?: boolean
}

export function VideoPlayer({ entry, autoPlay = true }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showControls, setShowControls] = useState(false)

  useEffect(() => {
    if (videoRef.current && autoPlay) {
      videoRef.current.play().then(() => {
        setIsPlaying(true)
      }).catch(() => {
        setIsPlaying(false)
      })
    }
  }, [entry.id, autoPlay])

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
        setIsPlaying(false)
      } else {
        videoRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  return (
    <Card 
      className="relative overflow-hidden bg-black aspect-video group"
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={entry.videoUrl}
        className="w-full h-full object-contain"
        onEnded={() => setIsPlaying(false)}
        onClick={togglePlayPause}
      />
      
      <div 
        className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 cursor-pointer ${
          showControls || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={togglePlayPause}
      >
        {!isPlaying && (
          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors">
            <Play size={40} weight="fill" className="text-primary-foreground ml-1" />
          </div>
        )}
        {isPlaying && showControls && (
          <div className="w-20 h-20 rounded-full bg-primary/90 flex items-center justify-center hover:bg-primary transition-colors">
            <Pause size={40} weight="fill" className="text-primary-foreground" />
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
        <p className="text-white text-lg font-medium mb-1">{entry.text}</p>
        <p className="text-white/70 text-sm">
          {entry.movieTitle} ({entry.year})
        </p>
      </div>
    </Card>
  )
}
