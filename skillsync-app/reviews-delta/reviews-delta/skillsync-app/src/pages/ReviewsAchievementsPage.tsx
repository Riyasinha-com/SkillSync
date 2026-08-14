import { useMemo, useState } from 'react'
import { Star, MessageSquare, GraduationCap, BookOpen } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { XPLevelCard } from '@/components/reviews/XPLevelCard'
import { RatingSummaryCard } from '@/components/reviews/RatingSummaryCard'
import { ReviewFilterBar, type RoleFilter, type StarFilter } from '@/components/reviews/ReviewFilterBar'
import { ReviewEntryCard } from '@/components/reviews/ReviewEntryCard'
import { AchievementCard } from '@/components/reviews/AchievementCard'
import { CertificateCard } from '@/components/reviews/CertificateCard'
import { AchievementTimeline } from '@/components/reviews/AchievementTimeline'
import {
  REVIEWS_DATA, ACHIEVEMENTS_DATA, CERTIFICATES_DATA, XP_LEVEL, ACHIEVEMENT_TIMELINE,
  averageRating, type AchievementCategory,
} from '@/data/reviewsMock'

const CATEGORIES: AchievementCategory[] = ['Skill Milestones', 'Session Milestones', 'Community Reputation']

export default function ReviewsAchievementsPage() {
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<RoleFilter>('all')
  const [starFilter, setStarFilter] = useState<StarFilter>('all')

  const teacherReviews = REVIEWS_DATA.filter((r) => r.role === 'teacher')
  const learnerReviews = REVIEWS_DATA.filter((r) => r.role === 'learner')
  const avg = averageRating(REVIEWS_DATA)

  const filteredReviews = useMemo(() => {
    const q = search.trim().toLowerCase()
    return REVIEWS_DATA.filter((r) => {
      if (roleFilter !== 'all' && r.role !== roleFilter) return false
      if (starFilter !== 'all' && Math.round(r.rating) !== starFilter) return false
      if (q && !r.reviewerName.toLowerCase().includes(q) && !r.skill.toLowerCase().includes(q) && !r.comment.toLowerCase().includes(q)) {
        return false
      }
      return true
    })
  }, [search, roleFilter, starFilter])

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Reviews & Achievements
        </h1>
        <p className="text-on-surface-variant">
          Your reputation, milestones and recognition across SkillSync.
        </p>
      </div>

      {/* XP + quick stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <XPLevelCard data={XP_LEVEL} />
        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard label="Average Rating" value={avg.toFixed(1)} icon={Star} tint="tertiary" />
          <StatCard label="Total Reviews" value={String(REVIEWS_DATA.length)} icon={MessageSquare} tint="primary" />
          <StatCard label="Teaching Reviews" value={String(teacherReviews.length)} icon={GraduationCap} tint="secondary" />
          <StatCard label="Learning Reviews" value={String(learnerReviews.length)} icon={BookOpen} tint="primary" />
        </div>
      </section>

      {/* Rating breakdown */}
      <section>
        <SectionHeader title="Rating Summary" />
        <RatingSummaryCard reviews={REVIEWS_DATA} />
      </section>

      {/* Reviews */}
      <section>
        <SectionHeader title="Reviews" />
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
              No reviews match your search or filters.
            </GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 gap-4">
              {filteredReviews.map((review) => (
                <ReviewEntryCard key={review.id} review={review} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Achievements, grouped by category */}
      {CATEGORIES.map((category) => (
        <section key={category}>
          <SectionHeader title={category} />
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {ACHIEVEMENTS_DATA.filter((a) => a.category === category).map((achievement) => (
              <AchievementCard key={achievement.id} achievement={achievement} />
            ))}
          </div>
        </section>
      ))}

      {/* Certificates */}
      <section>
        <SectionHeader title="Certificates" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CERTIFICATES_DATA.map((cert) => (
            <CertificateCard key={cert.id} certificate={cert} />
          ))}
        </div>
      </section>

      {/* Achievement timeline */}
      <section>
        <SectionHeader title="Achievement Timeline" />
        <AchievementTimeline events={ACHIEVEMENT_TIMELINE} />
      </section>
    </div>
  )
}
