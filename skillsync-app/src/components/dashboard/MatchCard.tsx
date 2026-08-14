import { Link } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import { CircularProgress } from '@/components/ui/CircularProgress'
import type { Match } from '@/data/dashboardMock'

export function MatchCard({ match }: { match: Match }) {
  return (
    <GlassCard interactive className="p-5 flex flex-col sm:flex-row sm:items-center gap-5">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Avatar name={match.name} size="lg" />
        <div className="min-w-0">
          <h4 className="font-display font-semibold text-on-surface mb-2">{match.name}</h4>
          <div className="flex flex-wrap gap-1.5 mb-1.5">
            {match.teaches.map((s) => (
              <Badge key={s} variant="primary" size="sm">
                {s}
              </Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {match.wants.map((s) => (
              <Badge key={s} variant="secondary" size="sm">
                {s}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0 justify-between sm:justify-end">
        <div className="flex flex-col items-center flex-shrink-0">
          <CircularProgress value={match.matchScore} size={56} strokeWidth={5} tint="tertiary" label={`${match.matchScore}`} />
          <span className="text-[10px] font-mono-label text-on-surface-variant/70 mt-1">MATCH</span>
        </div>
        <div className="flex gap-2">
          <Button variant="glass" size="sm">
            <MessageCircle className="w-4 h-4" />
            Chat
          </Button>
          <Link to={`/profile?u=${match.id}`}>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </Link>
        </div>
      </div>
    </GlassCard>
  )
}
