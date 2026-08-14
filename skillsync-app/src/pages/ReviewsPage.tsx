import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Star, MessageSquare, GraduationCap, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { ReviewFilterBar, type RoleFilter, type StarFilter } from '@/components/reviews/ReviewFilterBar'
import { ReviewEntryCard } from '@/components/reviews/ReviewEntryCard'
import api from '@/api/api'
import type { ReviewEntry } from '@/data/reviewsMock'

interface Review {
  _id: string
  rating: number
  comment: string
  createdAt: string

  reviewer?: {
    _id: string
    name: string
    profilePic?: string
  }

  session?: {
  _id?: string

  teacher?: {
    _id?: string
    name?: string
  }

  learner?: {
    _id: string
    name?: string
  }

  match?: {
      sender?: string
      receiver?: string

      senderSkill?: {
        _id?: string
        title?: string
        owner?: string
      }

      receiverSkill?: {
        _id?: string
        title?: string
        owner?: string
      }
    }
  }
}

export default function ReviewsPage() {

  const [searchParams] = useSearchParams()
  const reviewMatchId = searchParams.get('matchId')

  const [reviewSessionId, setReviewSessionId] = useState<string | null>(null)
  const [reviewPartnerName, setReviewPartnerName] = useState('your skill partner')

  const [showReviewForm, setShowReviewForm] = useState(!!reviewMatchId)
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [reviewSubmitting, setReviewSubmitting] = useState(false)
  const [reviewError, setReviewError] = useState<string | null>(null)
  const [reviewSuccess, setReviewSuccess] = useState(false)


  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [starFilter, setStarFilter] = useState<StarFilter>('all')


 useEffect(() => {
  if (!reviewMatchId) {
    setShowReviewForm(false)
    return
  }

  const loadReviewSession = async () => {
    try {
      setReviewError(null)
      setReviewSuccess(false)

      const user = JSON.parse(
        localStorage.getItem('user') || '{}'
      )

      const currentUserId = user._id || ''

      if (!currentUserId) {
        setReviewError('User information is missing. Please log in again.')
        return
      }

      // Find the completed session for this match.
      const { data: sessionData } = await api.get('/sessions')

      const sessions = Array.isArray(sessionData)
        ? sessionData
        : []

      const completedSession = sessions.find(
        (session: any) =>
          session.match?._id === reviewMatchId &&
          session.status === 'Completed'
      )

      if (!completedSession) {
        setReviewError(
          'No completed session was found for this match.'
        )
        return
      }

      setReviewSessionId(completedSession._id)

      // Check whether the current user has already reviewed
      // this session.
      const { data: myReviewsData } = await api.get('/reviews/my')

      const myReviews = Array.isArray(myReviewsData)
        ? myReviewsData
        : []

      const alreadyReviewed = myReviews.some(
        (review: any) =>
          review.session?._id === completedSession._id
      )

      if (alreadyReviewed) {
        setReviewSuccess(true)
        setShowReviewForm(true)
        return
      }

      // Determine the review partner.
      const teacherId =
        typeof completedSession.teacher === 'string'
          ? completedSession.teacher
          : completedSession.teacher?._id

      const learnerId =
        typeof completedSession.learner === 'string'
          ? completedSession.learner
          : completedSession.learner?._id

      const partner =
        teacherId === currentUserId
          ? completedSession.learner
          : learnerId === currentUserId
            ? completedSession.teacher
            : null

      const partnerName =
        typeof partner === 'string'
          ? 'your skill partner'
          : partner?.name || 'your skill partner'

      setReviewPartnerName(partnerName)
      setShowReviewForm(true)

    } catch (error: any) {
      console.error(
        'Failed to load review session:',
        error
      )

      setReviewError(
        error.response?.data?.message ||
        'Unable to load the completed session for this review.'
      )
    }
  }

  void loadReviewSession()
}, [reviewMatchId])

  const submitReview = async () => {
    if (!reviewSessionId) {
      setReviewError('Unable to identify the completed session.')
      return
    }

    if (rating < 1) {
      setReviewError('Please select a rating.')
      return
    }

    try {
      setReviewSubmitting(true)
      setReviewError(null)

      await api.post('/reviews', {
        sessionId: reviewSessionId,
        rating,
        comment: comment.trim(),
      })

      setReviewSuccess(true)

     // Refresh reviews received by the user.
const user = JSON.parse(
  localStorage.getItem('user') || '{}'
)

if (user._id) {
  const { data } = await api.get(`/reviews/${user._id}`)
  setReviews(Array.isArray(data) ? data : [])
}

// Confirm the review is persisted in the backend.

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


  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true)
        setError(null)

        const user = JSON.parse(localStorage.getItem('user') || '{}')

        if (!user._id) {
          throw new Error('User information is missing. Please log in again.')
        }

        const { data } = await api.get(`/reviews/${user._id}`)

        setReviews(Array.isArray(data) ? data : [])
      } catch (err: any) {
        console.error('Failed to load reviews:', err)

        setError(
          err.response?.data?.message ||
          err.message ||
          'Unable to load your reviews.'
        )
      } finally {
        setLoading(false)
      }
    }

    void loadReviews()
  }, [])

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0

    return (
      reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length
    )
  }, [reviews])

  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
const currentUserId = currentUser._id || ''

const teachingReviews = reviews.filter(
  (review) => review.session?.teacher?._id === currentUserId
)

const learningReviews = reviews.filter(
  (review) => review.session?.learner?._id === currentUserId
)

  const normalizedReviews = useMemo(() => {
  return reviews.map((review) => {
    const senderSkill = review.session?.match?.senderSkill
    const receiverSkill = review.session?.match?.receiverSkill

    const isTeacher =
      review.session?.teacher?._id === currentUserId

    const teachingSkill =
  senderSkill?.owner === currentUserId
    ? senderSkill?.title
    : receiverSkill?.owner === currentUserId
      ? receiverSkill?.title
      : ''

    return {
      ...review,
      reviewerName: review.reviewer?.name || 'SkillSync User',
      date: new Date(review.createdAt).toLocaleDateString(),
      skill: teachingSkill || 'Skill Swap',
      role: (isTeacher ? 'teacher' : 'learner') as ReviewEntry['role'],
    }
  })
}, [reviews, currentUserId])

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase()

    return normalizedReviews.filter((review) => {
      if (
        roleFilter !== 'all' &&
        review.role !== roleFilter
      ) {
        return false
      }

      if (
        starFilter !== 'all' &&
        Math.round(review.rating) !== starFilter
      ) {
        return false
      }

      if (
        q &&
        !review.reviewerName.toLowerCase().includes(q) &&
        !review.skill.toLowerCase().includes(q) &&
        !review.comment.toLowerCase().includes(q)
      ) {
        return false
      }

      return true
    })
  }, [normalizedReviews, search, roleFilter, starFilter])

  if (loading) {
    return (
      <div className="p-10 text-center text-on-surface-variant">
        Loading reviews...
      </div>
    )
  }

  if (error) {
    return (
      <GlassCard className="p-8 text-center">
        <h1 className="font-display text-xl font-semibold text-on-surface">
          Unable to load reviews
        </h1>

        <p className="mt-2 text-sm text-on-surface-variant">
          {error}
        </p>
      </GlassCard>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Reviews
        </h1>

        <p className="text-on-surface-variant">
          See what your SkillSync learning partners think about your sessions.
        </p>
      </div>

      
            {/* Leave Review */}
      {reviewMatchId && showReviewForm && (
        <section>
          <SectionHeader title="Leave a Review" />

          <GlassCard className="p-6 md:p-8">
            {reviewSuccess ? (
              <div className="flex flex-col items-center text-center gap-3 py-6">
                <div className="w-14 h-14 rounded-full bg-tertiary/10 border border-tertiary/20 flex items-center justify-center">
                  <Star className="w-7 h-7 text-tertiary fill-tertiary" />
                </div>

                <h2 className="font-display text-xl font-semibold text-on-surface">
                  Review submitted!
                </h2>

                <p className="text-sm text-on-surface-variant">
                  Thank you for sharing your experience with{' '}
                  {reviewPartnerName}.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-6">

                {/* Heading */}
                <div>
                  <h2 className="font-display text-xl font-semibold text-on-surface">
                    How was your session?
                  </h2>

                  <p className="mt-1 text-sm text-on-surface-variant">
                    Share your experience with {reviewPartnerName}.
                  </p>
                </div>

                {/* Star rating */}
                <div>
                  <p className="text-sm font-medium text-on-surface mb-3">
                    Your rating
                  </p>

                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((value) => (
                      <button
                        key={value}
                        type="button"
                        onClick={() => {
                          setRating(value)
                          setReviewError(null)
                        }}
                        aria-label={`Rate ${value} out of 5`}
                        className="transition-transform hover:scale-110 focus:outline-none"
                      >
                        <Star
                          className={`w-8 h-8 transition-colors ${
                            value <= rating
                              ? 'text-tertiary fill-tertiary'
                              : 'text-white/20 hover:text-tertiary/50'
                          }`}
                        />
                      </button>
                    ))}
                  </div>

                  {rating > 0 && (
                    <p className="mt-2 text-xs text-on-surface-variant">
                      {rating} out of 5 stars
                    </p>
                  )}
                </div>

                {/* Comment */}
                <div>
                  <label
                    htmlFor="review-comment"
                    className="block text-sm font-medium text-on-surface mb-2"
                  >
                    Your experience
                  </label>

                  <textarea
                    id="review-comment"
                    value={comment}
                    onChange={(event) => {
                      setComment(event.target.value)
                      setReviewError(null)
                    }}
                    placeholder="Tell them what you enjoyed about the session..."
                    rows={5}
                    maxLength={1000}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 resize-none focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30"
                  />

                  <div className="mt-1 text-right text-xs text-on-surface-variant/60">
                    {comment.length}/1000
                  </div>
                </div>

                {/* Error */}
                {reviewError && (
                  <div className="rounded-xl border border-error/20 bg-error/10 px-4 py-3">
                    <p className="text-sm text-error">
                      {reviewError}
                    </p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="magical"
                    size="md"
                    loading={reviewSubmitting}
                    disabled={!reviewSessionId || rating === 0}
                    onClick={submitReview}
                  >
                    <Star className="w-4 h-4" />
                    Submit Review
                  </Button>

                  <Button
                    variant="outline"
                    size="md"
                    disabled={reviewSubmitting}
                    onClick={() => {
                      setShowReviewForm(false)
                      setRating(0)
                      setComment('')
                      setReviewError(null)

                      window.history.replaceState(
                        {},
                        '',
                        '/reviews'
                      )
                    }}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </GlassCard>
        </section>
      )}
      
      
      
      {/* Quick stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatCard
          label="Average Rating"
          value={averageRating.toFixed(1)}
          icon={Star}
          tint="tertiary"
        />

        <StatCard
          label="Total Reviews"
          value={String(reviews.length)}
          icon={MessageSquare}
          tint="primary"
        />

        <StatCard
          label="5-Star Reviews"
          value={String(
            reviews.filter((review) => review.rating === 5).length
          )}
          icon={Star}
          tint="secondary"
        />
      </section>

      {/* Rating Summary */}
      <section>
        <SectionHeader title="Rating Summary" />

        <GlassCard className="p-6">
          {reviews.length === 0 ? (
            <div className="text-sm text-on-surface-variant text-center">
              No reviews yet. Complete a session and receive your first review!
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = reviews.filter(
                  (review) => review.rating === rating
                ).length

                const percentage =
                  reviews.length > 0
                    ? (count / reviews.length) * 100
                    : 0

                return (
                  <div
                    key={rating}
                    className="flex items-center gap-3"
                  >
                    <div className="flex items-center gap-1 w-14">
                      <span className="text-sm text-on-surface">
                        {rating}
                      </span>

                      <Star className="w-3.5 h-3.5 text-tertiary fill-tertiary" />
                    </div>

                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-tertiary"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="text-xs text-on-surface-variant w-8 text-right">
                      {count}
                    </span>
                  </div>
                )
              })}
            </div>
          )}
        </GlassCard>
      </section>

      {/* Reviews */}
      <section>
        <SectionHeader title="Reviews Received" />

        <div className="flex flex-col gap-5">
          <ReviewFilterBar
            search={search}
            onSearchChange={setSearch}
            roleFilter={roleFilter}
            onRoleFilterChange={setRoleFilter}
            starFilter={starFilter}
            onStarFilterChange={setStarFilter}
          />

          {filteredReviews.length === 0 ? (
            <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
              {reviews.length === 0
                ? 'You have not received any reviews yet.'
                : 'No reviews match your search or filters.'}
            </GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredReviews.map((review) => (
                <ReviewEntryCard
                  key={review._id}
                  review={{
                    id: review._id,
                    reviewerName: review.reviewerName,
                    date: review.date,
                    rating: review.rating,
                    comment: review.comment,
                    role: review.role,
                    skill: review.skill,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Review role explanation */}
      <section className="grid sm:grid-cols-2 gap-4">
        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>

          <div>
            <p className="text-sm font-medium text-on-surface">
              Teaching Reviews
            </p>

            <p className="text-xs text-on-surface-variant">
              Reviews connected to skills you taught.
            </p>

            <p className="text-lg font-semibold text-on-surface mt-1">
              {teachingReviews.length}
            </p>
          </div>
        </GlassCard>

        <GlassCard className="p-5 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <BookOpen className="w-5 h-5 text-secondary" />
          </div>

          <div>
            <p className="text-sm font-medium text-on-surface">
              Learning Reviews
            </p>

            <p className="text-xs text-on-surface-variant">
              Reviews connected to skills you learned.
            </p>

            <p className="text-lg font-semibold text-on-surface mt-1">
              {learningReviews.length}
            </p>
          </div>
        </GlassCard>
      </section>
    </div>
  )
}