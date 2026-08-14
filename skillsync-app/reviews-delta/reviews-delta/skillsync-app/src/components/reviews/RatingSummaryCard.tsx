import { Star } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import type { ReviewEntry } from '@/data/reviewsMock'
import { ratingBreakdown, averageRating } from '@/data/reviewsMock'

export function RatingSummaryCard({ reviews }: { reviews: ReviewEntry[] }) {
  const breakdown = ratingBreakdown(reviews)
  const avg = averageRating(reviews)
  const total = reviews.length

  return (
    <GlassCard raised className="p-6 md:p-8 grid sm:grid-cols-[auto_1fr] gap-8">
      <div className="flex flex-col items-center justify-center gap-2 sm:pr-8 sm:border-r border-white/8">
        <span className="font-display text-5xl font-bold text-on-surface">{avg.toFixed(1)}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${i < Math.round(avg) ? 'text-tertiary fill-tertiary' : 'text-white/15'}`}
            />
          ))}
        </div>
        <span className="text-xs text-on-surface-variant">{total} reviews</span>
      </div>

      <div className="flex flex-col gap-2.5 justify-center">
        {([5, 4, 3, 2, 1] as const).map((star) => {
          const count = breakdown[star]
          const pct = total ? (count / total) * 100 : 0
          return (
            <div key={star} className="flex items-center gap-3">
              <span className="text-xs text-on-surface-variant w-8 flex-shrink-0">{star}★</span>
              <div className="h-1.5 flex-1 rounded-full bg-white/8 overflow-hidden">
                <div className="h-full rounded-full bg-tertiary transition-all duration-700 ease-out" style={{ width: `${pct}%` }} />
              </div>
              <span className="text-xs text-on-surface-variant/70 w-6 text-right flex-shrink-0">{count}</span>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
