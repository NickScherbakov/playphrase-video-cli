import { CaretLeft, CaretRight } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface ResultNavigationProps {
  currentIndex: number
  totalResults: number
  onPrevious: () => void
  onNext: () => void
}

export function ResultNavigation({
  currentIndex,
  totalResults,
  onPrevious,
  onNext,
}: ResultNavigationProps) {
  if (totalResults === 0) {
    return null
  }

  return (
    <div className="flex items-center justify-center gap-4 mt-6">
      <Button
        variant="outline"
        size="lg"
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="px-6"
      >
        <CaretLeft size={20} weight="bold" className="mr-2" />
        Previous
      </Button>

      <Badge variant="secondary" className="px-4 py-2 text-base">
        {currentIndex + 1} of {totalResults}
      </Badge>

      <Button
        variant="outline"
        size="lg"
        onClick={onNext}
        disabled={currentIndex === totalResults - 1}
        className="px-6"
      >
        Next
        <CaretRight size={20} weight="bold" className="ml-2" />
      </Button>
    </div>
  )
}
