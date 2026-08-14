import { Link } from 'react-router-dom'
import { MessageCircle, CalendarPlus, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MatchCardBase } from '@/components/matches/MatchCardBase'
import type { PersonMatch } from '@/data/matchesMock'

export function AcceptedMatchCard({
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
      metaLine={`Matched ${match.acceptedDate}`}
      footer={
        <div className="flex flex-wrap gap-2 pt-1">
          <Link to="/chat" className="flex-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="glass" size="sm" className="w-full">
              <MessageCircle className="w-4 h-4" />
              Chat
            </Button>
          </Link>
          <Link to="/sessions/new" className="flex-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="magical" size="sm" className="w-full">
              <CalendarPlus className="w-4 h-4" />
              Schedule
            </Button>
          </Link>
          <Link to={`/profile?u=${match.id}`} className="flex-1" onClick={(e) => e.stopPropagation()}>
            <Button variant="outline" size="sm" className="w-full">
              <User className="w-4 h-4" />
              Profile
            </Button>
          </Link>
        </div>
      }
    />
  )
}
