import type { ReactNode } from 'react'
import { Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { CircularProgress } from '@/components/ui/CircularProgress'
import { cn } from '@/lib/utils'
import type { PersonMatch } from '@/data/matchesMock'

export function MatchCardBase({
  match,
  selected,
  onSelect,
  metaLine,
  footer,
}: {
  match: PersonMatch
  selected?: boolean
  onSelect?: () => void
  /** Small line under the name — e.g. "Requested Jul 26, 2026" */
  metaLine: ReactNode
  footer: ReactNode
}) {
  return (
    <GlassCard
      interactive
      onClick={onSelect}
      className={cn(
        'p-6 flex flex-col gap-5 cursor-pointer',
        selected && 'border-primary/40 bg-primary/[0.04]'
      )}
    >
      <div className="flex items-start gap-4">
        <Avatar name={match.name} size="lg" />
        <div className="min-w-0 flex-1">
          <h3 className="font-display font-semibold text-on-surface truncate">{match.name}</h3>
          <p className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
            <Star className="w-3.5 h-3.5 text-tertiary fill-tertiary" />
            <span className="text-on-surface font-medium">{match.rating}</span>
          </p>
          <p className="text-xs text-on-surface-variant/70 mt-1">{metaLine}</p>
        </div>
        <div className="flex flex-col items-center flex-shrink-0">
          <CircularProgress value={match.matchScore} size={52} strokeWidth={5} tint="tertiary" label={`${match.matchScore}`} />
          <span className="text-[10px] font-mono-label text-on-surface-variant/70 mt-1">MATCH</span>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Teaches</p>
        <div className="flex flex-wrap gap-1.5">
          {match.teaches.map((s) => (
            <Badge key={s} variant="primary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Wants to learn</p>
        <div className="flex flex-wrap gap-1.5">
          {match.wants.map((s) => (
            <Badge key={s} variant="secondary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {footer}
    </GlassCard>
  )
}
