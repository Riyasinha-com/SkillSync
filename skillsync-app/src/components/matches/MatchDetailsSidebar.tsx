import { Users2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { CircularProgress } from '@/components/ui/CircularProgress'
import type { PersonMatch } from '@/data/matchesMock'

export function MatchDetailsSidebar({ match }: { match: PersonMatch | null }) {
  if (!match) {
    return (
      <GlassCard className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center">
          <Users2 className="w-5 h-5 text-on-surface-variant/60" />
        </div>
        <p className="text-sm text-on-surface-variant">
          Select a match to see compatibility details.
        </p>
      </GlassCard>
    )
  }

  return (
    <GlassCard raised className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Avatar name={match.name} size="md" />
        <div>
          <h3 className="font-display font-semibold text-on-surface">{match.name}</h3>
          <p className="text-xs text-on-surface-variant">Match details</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 py-2">
        <CircularProgress value={match.matchScore} size={96} strokeWidth={8} tint="tertiary" label={`${match.matchScore}%`} />
        <span className="text-xs font-mono-label text-on-surface-variant/70">COMPATIBILITY SCORE</span>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skills You Teach</p>
        <div className="flex flex-wrap gap-1.5">
          {match.youTeachThemWant.length ? (
            match.youTeachThemWant.map((s) => (
              <Badge key={s} variant="primary" size="sm">
                {s}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-on-surface-variant/60">No overlap yet</span>
          )}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skills You Learn</p>
        <div className="flex flex-wrap gap-1.5">
          {match.youLearnFromThem.map((s) => (
            <Badge key={s} variant="secondary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Mutual Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {match.mutualInterests.map((s) => (
            <Badge key={s} variant="tertiary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Availability Overlap</p>
        <ul className="flex flex-col gap-1.5">
          {match.availabilityOverlap.map((slot) => (
            <li key={slot} className="text-sm text-on-surface-variant flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-tertiary flex-shrink-0" />
              {slot}
            </li>
          ))}
        </ul>
      </div>
    </GlassCard>
  )
}
