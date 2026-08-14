import { Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import type { ReviewEntry } from '@/data/reviewsMock'

export function ReviewEntryCard({ review }: { review: ReviewEntry }) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <Avatar name={review.reviewerName} size="sm" />
          <div>
            <p className="text-sm font-medium text-on-surface">{review.reviewerName}</p>
            <p className="text-[11px] text-on-surface-variant/70">{review.date}</p>
          </div>
        </div>
        <div className="flex gap-0.5 flex-shrink-0">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < review.rating ? 'text-tertiary fill-tertiary' : 'text-white/15'}`}
            />
          ))}
        </div>
      </div>

      <p className="text-sm text-on-surface-variant leading-relaxed">{review.comment}</p>

      <div className="flex items-center gap-2">
        <Badge variant={review.role === 'teacher' ? 'primary' : 'secondary'} size="sm" className="normal-case font-body">
          {review.role === 'teacher' ? 'Teaching review' : 'Learning review'}
        </Badge>
        <Badge variant="neutral" size="sm" className="normal-case font-body">
          {review.skill}
        </Badge>
      </div>
    </GlassCard>
  )
}
