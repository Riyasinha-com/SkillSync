import { GlassCard } from '@/components/ui/GlassCard'
import { ModerationReviewCard } from '@/components/admin/ModerationReviewCard'
import type { ModerationReview } from '@/data/adminMock'

export function ReviewsModerationSection({
  reviews,
  onDelete,
  onRestore,
}: {
  reviews: ModerationReview[]
  onDelete: (id: string) => void
  onRestore: (id: string) => void
}) {
  const flagged = reviews.filter((r) => r.flagged)
  const rest = reviews.filter((r) => !r.flagged)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">
          Flagged Reviews ({flagged.length})
        </h3>
        {flagged.length === 0 ? (
          <GlassCard className="p-6 text-sm text-on-surface-variant text-center">No flagged reviews.</GlassCard>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {flagged.map((r) => (
              <ModerationReviewCard key={r.id} review={r} onDelete={onDelete} onRestore={onRestore} />
            ))}
          </div>
        )}
      </div>

      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Recent Reviews</h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {rest.map((r) => (
            <ModerationReviewCard key={r.id} review={r} onDelete={onDelete} onRestore={onRestore} />
          ))}
        </div>
      </div>
    </div>
  )
}
