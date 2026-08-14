import { Sparkles } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CircularProgress } from '@/components/ui/CircularProgress'
import type { RecommendedMatch } from '@/data/exploreMock'

export function RecommendedMatchCard({
  match,
  onRequest,
}: {
  match: RecommendedMatch
  onRequest?: () => void
}) {
  return (
    <GlassCard raised interactive className="p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={match.name} size="md" />
          <div>
            <h3 className="font-display font-semibold text-on-surface">{match.name}</h3>
            <span className="flex items-center gap-1 text-[11px] text-primary">
              <Sparkles className="w-3 h-3" />
              Recommended for you
            </span>
          </div>
        </div>
        <CircularProgress value={match.matchScore} size={52} strokeWidth={5} tint="tertiary" label={`${match.matchScore}`} />
      </div>

      <div className="relative z-10 flex flex-wrap gap-1.5">
        {match.sharedSkills.map((s) => (
          <Badge key={s} variant="primary" size="sm">
            {s}
          </Badge>
        ))}
      </div>

      <p className="relative z-10 text-sm text-on-surface-variant leading-relaxed">{match.reason}</p>

      <Button
  variant="magical"
  size="sm"
  className="relative z-10 w-full mt-auto"
  onClick={onRequest}
>
  Request Swap
</Button>
    </GlassCard>
  )
}
