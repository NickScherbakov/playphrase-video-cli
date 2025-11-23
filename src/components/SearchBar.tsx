import { useState, FormEvent } from 'react'
import { MagnifyingGlass, FilmStrip } from '@phosphor-icons/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

export function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 text-primary mb-2">
          <FilmStrip size={32} weight="duotone" />
          <h1 className="text-2xl font-semibold tracking-tight">Playphrase</h1>
        </div>
      </div>
      
      <div className="relative flex gap-2">
        <div className="relative flex-1">
          <MagnifyingGlass 
            size={20} 
            className="absolute left-6 top-1/2 -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="text"
            placeholder="Search for any phrase... (e.g., &quot;I'll be back&quot;)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-14 pr-6 py-6 text-lg bg-card border-input focus-visible:ring-primary"
            disabled={isLoading}
          />
        </div>
        <Button 
          type="submit" 
          size="lg"
          className="px-8 py-6 text-base"
          disabled={isLoading || !query.trim()}
        >
          Search
        </Button>
      </div>
    </form>
  )
}
