import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MatchCardBase } from '@/components/matches/MatchCardBase'
import type { PersonMatch } from '@/data/matchesMock'

export function CompletedMatchCard({
  match,
  selected,
  onSelect,
}: {
  match: PersonMatch
  selected?: boolean
  onSelect?: () => void
}) {
  return (
    <MatchCardBase
      match={match}
      selected={selected}
      onSelect={onSelect}
      metaLine={`Completed ${match.completionDate}`}
      footer={
        <div className="flex flex-col gap-3 pt-1">
          {match.sessionSummary && (
            <p className="text-xs text-on-surface-variant leading-relaxed bg-white/[0.03] border border-white/8 rounded-xl px-3 py-2.5">
              {match.sessionSummary}
            </p>
          )}
          <Link to="/reviews" onClick={(e) => e.stopPropagation()}>
            <Button variant="glass" size="sm" className="w-full">
              <Star className="w-4 h-4" />
              Leave a Review
            </Button>
          </Link>
        </div>
      }
    />
  )
}
