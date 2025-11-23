import { Clock, X } from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface SearchHistoryProps {
  history: string[]
  onSelectPhrase: (phrase: string) => void
  onRemovePhrase: (phrase: string) => void
}

export function SearchHistory({ history, onSelectPhrase, onRemovePhrase }: SearchHistoryProps) {
  if (history.length === 0) {
    return null
  }

  return (
    <div className="w-full max-w-2xl mx-auto mt-6">
      <div className="flex items-center gap-2 mb-3">
        <Clock size={16} className="text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Recent searches</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((phrase, index) => (
          <Badge
            key={`${phrase}-${index}`}
            variant="secondary"
            className="px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors group"
          >
            <span onClick={() => onSelectPhrase(phrase)}>{phrase}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-2 h-4 w-4 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation()
                onRemovePhrase(phrase)
              }}
            >
              <X size={12} />
            </Button>
          </Badge>
        ))}
      </div>
    </div>
  )
}
