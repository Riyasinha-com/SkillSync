import { Star, Flag, Trash2, RotateCcw } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import type { ModerationReview } from '@/data/adminMock'

export function ModerationReviewCard({
  review,
  onDelete,
  onRestore,
}: {
  review: ModerationReview
  onDelete: (id: string) => void
  onRestore: (id: string) => void
}) {
  return (
    <GlassCard className={cn('p-5 flex flex-col gap-3', review.deleted && 'opacity-50')}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-sm text-on-surface">
          <span className="font-medium">{review.reviewerName}</span> on {review.targetUser}
        </p>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? 'text-tertiary fill-tertiary' : 'text-white/15'}`} />
          ))}
        </div>
      </div>

      <p className={cn('text-sm leading-relaxed', review.deleted ? 'text-on-surface-variant/60 italic' : 'text-on-surface-variant')}>
        {review.deleted ? 'This review has been removed by a moderator.' : review.comment}
      </p>

      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {review.flagged && (
            <Badge variant="secondary" size="sm" className="normal-case font-body gap-1">
              <Flag className="w-3 h-3" />
              Flagged
            </Badge>
          )}
          <span className="text-[11px] text-on-surface-variant/60">{review.date}</span>
        </div>
        {review.deleted ? (
          <Button variant="glass" size="sm" onClick={() => onRestore(review.id)}>
            <RotateCcw className="w-3.5 h-3.5" />
            Restore
          </Button>
        ) : (
          <Button variant="outline" size="sm" className="hover:border-error/50 hover:text-error" onClick={() => onDelete(review.id)}>
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        )}
      </div>
    </GlassCard>
  )
}
