import { useState, useEffect } from 'react'
import { useKV } from '@github/spark/hooks'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster, toast } from 'sonner'
import { SearchBar } from '@/components/SearchBar'
import { VideoPlayer } from '@/components/VideoPlayer'
import { ResultNavigation } from '@/components/ResultNavigation'
import { SearchHistory } from '@/components/SearchHistory'
import { EmptyState } from '@/components/EmptyState'
import { UploadDialog } from '@/components/UploadDialog'
import { searchSubtitles, getRandomSuggestions, type SubtitleEntry } from '@/lib/movieDatabase'

function App() {
  const [searchHistory, setSearchHistory] = useKV<string[]>('search-history', [])
  const [currentQuery, setCurrentQuery] = useState('')
  const [searchResults, setSearchResults] = useState<SubtitleEntry[]>([])
  const [customEntries, setCustomEntries] = useState<SubtitleEntry[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [suggestions] = useState(getRandomSuggestions(5))

  const handleUpload = (entries: SubtitleEntry[]) => {
    setCustomEntries(prev => [...prev, ...entries])
    toast.success(`Added ${entries.length} subtitles to library`)
  }

  const handleSearch = (query: string) => {
    setIsLoading(true)
    setCurrentQuery(query)
    
    setTimeout(() => {
      const staticResults = searchSubtitles(query)
      
      const lowerQuery = query.toLowerCase().trim()
      const customResults = customEntries.filter(entry => 
        entry.text.toLowerCase().includes(lowerQuery)
      )

      const results = [...staticResults, ...customResults].sort((a, b) => {
        const aIndex = a.text.toLowerCase().indexOf(lowerQuery)
        const bIndex = b.text.toLowerCase().indexOf(lowerQuery)
        return aIndex - bIndex
      })

      setSearchResults(results)
      setCurrentIndex(0)
      setIsLoading(false)

      if (results.length > 0) {
        toast.success(`Found ${results.length} result${results.length > 1 ? 's' : ''}`)
        
        setSearchHistory((prev) => {
          const current = prev || []
          const filtered = current.filter(p => p.toLowerCase() !== query.toLowerCase())
          return [query, ...filtered].slice(0, 10)
        })
      } else {
        toast.error('No results found')
      }
    }, 300)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < searchResults.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const handleRemoveFromHistory = (phrase: string) => {
    setSearchHistory((prev) => (prev || []).filter(p => p !== phrase))
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (searchResults.length === 0) return
      
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        e.preventDefault()
        handlePrevious()
      } else if (e.key === 'ArrowRight' && currentIndex < searchResults.length - 1) {
        e.preventDefault()
        handleNext()
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [currentIndex, searchResults.length])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12">
            <div className="flex gap-4 items-start mb-6">
              <div className="flex-1">
                <SearchBar onSearch={handleSearch} isLoading={isLoading} />
              </div>
              <UploadDialog onUpload={handleUpload} />
            </div>
            <SearchHistory
              history={searchHistory || []}
              onSelectPhrase={handleSearch}
              onRemovePhrase={handleRemoveFromHistory}
            />
          </div>

          <AnimatePresence mode="wait">
            {searchResults.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <EmptyState
                  query={currentQuery}
                  suggestions={suggestions}
                  onSuggestionClick={handleSearch}
                />
              </motion.div>
            ) : (
              <motion.div
                key={`result-${searchResults[currentIndex]?.id}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="space-y-6"
              >
                <VideoPlayer entry={searchResults[currentIndex]} autoPlay />
                <ResultNavigation
                  currentIndex={currentIndex}
                  totalResults={searchResults.length}
                  onPrevious={handlePrevious}
                  onNext={handleNext}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default App