import { MagnifyingGlass } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface EmptyStateProps {
  query?: string
  suggestions?: string[]
  onSuggestionClick: (suggestion: string) => void
}

export function EmptyState({ query, suggestions = [], onSuggestionClick }: EmptyStateProps) {
  const isNoResults = query && query.length > 0

  return (
    <Card className="p-12 text-center max-w-2xl mx-auto mt-12">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center">
          <MagnifyingGlass size={40} className="text-muted-foreground" />
        </div>
      </div>

      {isNoResults ? (
        <>
          <h2 className="text-2xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground mb-8">
            We couldn't find any movie quotes matching "<span className="text-foreground font-medium">{query}</span>"
          </p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">Search movie quotes</h2>
          <p className="text-muted-foreground mb-8">
            Type any phrase to find the exact movie scene where it was spoken
          </p>
        </>
      )}

      {suggestions.length > 0 && (
        <div>
          <p className="text-sm text-muted-foreground mb-4">Try searching for:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestions.map((suggestion) => (
              <Button
                key={suggestion}
                variant="outline"
                onClick={() => onSuggestionClick(suggestion)}
                className="text-sm"
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      )}
    </Card>
  )
}
