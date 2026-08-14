import { useEffect, useState } from 'react'
import {
  CalendarDays,
  CheckCircle2,
  Clock,
  Video,
  Users2,
  Star,
} from 'lucide-react'
import api from '@/api/api'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PlatformBadge } from '@/components/calendar/PlatformBadge'
import type { ScheduledSession } from '@/types/calendar'

function useCountdown(target?: string) {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!target) {
      setLabel(null)
      return
    }
    function tick() {
      const remaining = new Date(target!).getTime() - Date.now()
      if (remaining <= 0) {
        setLabel('Starting now')
        return
      }
      const hours = Math.floor(remaining / (1000 * 60 * 60))
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      setLabel(hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`)
    }
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [target])

  return label
}

export function SessionDetailsPanel({
  session,
  onComplete,
  completing = false,
  hasReview = false,
}: {
  session: ScheduledSession | null
  onComplete: (id: string) => void
  completing?: boolean
  hasReview?: boolean
}) {
  const countdown = useCountdown(session?.startsAt)
  const [showReview, setShowReview] = useState(false)
const [rating, setRating] = useState(0)
const [comment, setComment] = useState('')
const [reviewSubmitting, setReviewSubmitting] = useState(false)
const [reviewError, setReviewError] = useState<string | null>(null)
const [reviewSubmitted, setReviewSubmitted] = useState(false)


async function submitReview() {
  if (!session || rating < 1) return

  try {
    setReviewSubmitting(true)
    setReviewError(null)

    await api.post('/reviews', {
      sessionId: session.id,
      rating,
      comment,
    })

    setReviewSubmitted(true)
  } catch (error: any) {
    console.error('Failed to submit review:', error)

    setReviewError(
      error.response?.data?.message ||
      'Unable to submit your review. Please try again.'
    )
  } finally {
    setReviewSubmitting(false)
  }
}

  if (!session) {
    return (
      <GlassCard className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center">
          <Users2 className="w-5 h-5 text-on-surface-variant/60" />
        </div>
        <p className="text-sm text-on-surface-variant">
          Select a session to see its details.
        </p>
      </GlassCard>
    )
  }

  const canJoin = session.status === 'accepted' && !!session.meetLink
  const canComplete = session.status === 'accepted'

  return (
    <GlassCard raised className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Avatar name={session.partnerName} size="md" />
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-on-surface truncate">{session.partnerName}</h3>
          <p className="text-xs text-on-surface-variant">
            {session.role === 'Teacher' ? 'You\u2019re learning from them' : 'You\u2019re teaching them'}
          </p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skill</p>
        <Badge variant="primary" size="sm">
          {session.skill}
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <CalendarDays className="w-4 h-4 text-primary" />
          {session.dateLabel}
        </div>
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <Clock className="w-4 h-4 text-primary" />
          {session.time} · {session.durationMins} min
        </div>
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <Video className="w-4 h-4 text-primary" />
          <PlatformBadge platform={session.platform} />
        </div>
      </div>

      {countdown && (
        <div className="text-center py-3 rounded-xl bg-primary/10 border border-primary/20">
          <span className="text-xs font-mono-label text-primary">STARTS IN {countdown.toUpperCase()}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
  {session.status !== 'completed' && (
    <>
      <Button
        variant="magical"
        size="md"
        className="w-full"
        disabled={!canJoin}
      >
        <Video className="w-4 h-4" />
        Join Meeting
      </Button>

      {canComplete && (
        <Button
          variant="glass"
          size="sm"
          className="w-full"
          loading={completing}
          onClick={() => onComplete(session.id)}
        >
          <CheckCircle2 className="w-4 h-4" />
          Complete Session
        </Button>
      )}
    </>
  )}

  {session.status === 'completed' && !hasReview && !reviewSubmitted && (
    <Button
      variant="magical"
      size="md"
      className="w-full"
      onClick={() => {
        setShowReview(true)
        setReviewError(null)
      }}
    >
      <Star className="w-4 h-4" />
      Leave Review
    </Button>
  )}

  {(hasReview || reviewSubmitted) && (
  <div className="text-center py-3 rounded-xl bg-tertiary/10 border border-tertiary/20">
    <p className="text-sm font-medium text-tertiary">
      Review submitted successfully!
    </p>
  </div>
)}
</div>

{showReview && !reviewSubmitted && (
  <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/10">
    <div>
      <h4 className="font-display font-semibold text-on-surface">
        Leave a review
      </h4>

      <p className="text-xs text-on-surface-variant mt-1">
        How was your session with {session.partnerName}?
      </p>
    </div>

    <div>
      <p className="text-xs text-on-surface-variant mb-2">
        Your rating
      </p>

      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => setRating(value)}
            aria-label={`Rate ${value} out of 5`}
            className="transition-transform hover:scale-110"
          >
            <Star
              className={`w-7 h-7 ${
                value <= rating
                  ? 'text-tertiary fill-tertiary'
                  : 'text-white/20'
              }`}
            />
          </button>
        ))}
      </div>
    </div>

    <textarea
      value={comment}
      onChange={(event) => setComment(event.target.value)}
      placeholder="Share your experience..."
      rows={4}
      className="w-full rounded-xl border border-outline-variant bg-white/5 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/60 resize-none"
    />

    {reviewError && (
      <p className="text-xs text-error">
        {reviewError}
      </p>
    )}

    <div className="flex gap-2">
      <Button
        variant="magical"
        size="sm"
        className="flex-1"
        loading={reviewSubmitting}
        disabled={rating === 0}
        onClick={submitReview}
      >
        Submit Review
      </Button>

      <Button
        variant="outline"
        size="sm"
        onClick={() => setShowReview(false)}
      >
        Cancel
      </Button>
    </div>
  </div>
)}

    </GlassCard>
  )
}
