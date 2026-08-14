import { useEffect, useMemo, useState } from 'react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { XPLevelCard } from '@/components/reviews/XPLevelCard'
import { AchievementCard } from '@/components/reviews/AchievementCard'
import { CertificateCard } from '@/components/reviews/CertificateCard'
import { AchievementTimeline } from '@/components/reviews/AchievementTimeline'
import {
  ACHIEVEMENTS_DATA,
  CERTIFICATES_DATA,
  XP_LEVEL,
  ACHIEVEMENT_TIMELINE,
  type AchievementCategory,
  type AchievementItem,
} from '@/data/reviewsMock'
import { Trophy, Award, Lock } from 'lucide-react'
import api from '@/api/api'

const CATEGORIES: AchievementCategory[] = [
  'Skill Milestones',
  'Session Milestones',
  'Community Reputation',
]

export default function AchievementsPage() {
  const [sessions, setSessions] = useState<any[]>([])
  const [skills, setSkills] = useState<any[]>([])
  const [reviews, setReviews] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadAchievementData = async () => {
      try {
        setLoading(true)
        setError(null)

        const user = JSON.parse(
          localStorage.getItem('user') || '{}'
        )

        const currentUserId = user._id || ''

        if (!currentUserId) {
          throw new Error(
            'User information is missing. Please log in again.'
          )
        }

        const [
          sessionsRes,
          skillsRes,
          reviewsRes,
        ] = await Promise.all([
          api.get('/sessions'),
          api.get('/skills'),
          api.get(`/reviews/${currentUserId}`),
        ])

        setSessions(
          Array.isArray(sessionsRes.data)
            ? sessionsRes.data
            : []
        )

        setSkills(
          Array.isArray(skillsRes.data)
            ? skillsRes.data
            : []
        )

        setReviews(
          Array.isArray(reviewsRes.data)
            ? reviewsRes.data
            : []
        )
      } catch (err: any) {
        console.error(
          'Failed to load achievement data:',
          err
        )

        setError(
          err.response?.data?.message ||
          err.message ||
          'Unable to load achievement data.'
        )
      } finally {
        setLoading(false)
      }
    }

    void loadAchievementData()
  }, [])

  const dynamicAchievements = useMemo<AchievementItem[]>(() => {
    const completedSessions = sessions.filter(
      (session) => session.status === 'Completed'
    )

    const teachingSkills = skills.filter(
      (skill) => skill.type === 'Teach'
    )

    const learningSkills = skills.filter(
      (skill) => skill.type === 'Learn'
    )

    // Distinct learning categories
    const learningCategories = new Set(
      learningSkills
        .map((skill) => skill.category?.trim())
        .filter(Boolean)
    )

    // Calculate total learning-session hours.
    const learningHours = completedSessions
      .filter((session) => {
        const user = JSON.parse(
          localStorage.getItem('user') || '{}'
        )

        return (
          session.learner?._id === user._id ||
          session.learner === user._id
        )
      })
      .reduce((total, session) => {
        if (!session.startTime || !session.endTime) {
          return total
        }

        const start = new Date(
          `1970-01-01T${session.startTime}`
        )

        const end = new Date(
          `1970-01-01T${session.endTime}`
        )

        let duration =
          (end.getTime() - start.getTime()) /
          (1000 * 60 * 60)

        // Handle sessions that cross midnight.
        if (duration < 0) {
          duration += 24
        }

        return total + duration
      }, 0)

    // Verified teaching skill
    const hasVerifiedTeachingSkill = teachingSkills.some(
      (skill) => skill.verified === true
    )

    // Top Rated
    const reviewCount = reviews.length

    const averageReviewRating =
      reviewCount > 0
        ? reviews.reduce(
            (sum, review) =>
              sum + Number(review.rating || 0),
            0
          ) / reviewCount
        : 0

    // Distinct learners taught
    const learnerIds = new Set(
      completedSessions
        .filter((session) => {
          const user = JSON.parse(
            localStorage.getItem('user') || '{}'
          )

          return (
            session.teacher?._id === user._id ||
            session.teacher === user._id
          )
        })
        .map((session) =>
          typeof session.learner === 'string'
            ? session.learner
            : session.learner?._id
        )
        .filter(Boolean)
    )

    return ACHIEVEMENTS_DATA.map((achievement) => {
      let unlocked = false

      switch (achievement.id) {
        // First Skill Swap
        case 'ac1':
          unlocked = completedSessions.length >= 1
          break

        // Multi-Skill Teacher
        case 'ac2':
          unlocked = teachingSkills.length >= 5
          break

        // Polyglot Learner
        case 'ac3':
          unlocked = learningCategories.size >= 5
          break

        // 5 Successful Sessions
        case 'ac4':
          unlocked = completedSessions.length >= 5
          break

        // 25 Successful Sessions
        case 'ac5':
          unlocked = completedSessions.length >= 25
          break

        // Marathon Learner
        case 'ac6':
          unlocked = learningHours >= 100
          break

        // Verified Teacher
        case 'ac7':
          unlocked = hasVerifiedTeachingSkill
          break

        // Top Rated
        case 'ac8':
          unlocked =
            reviewCount >= 20 &&
            averageReviewRating >= 4.8
          break

        // Community Helper
        case 'ac9':
          unlocked = learnerIds.size >= 10
          break

        default:
          unlocked = achievement.unlocked
      }

      return {
        ...achievement,
        unlocked,
      }
    })
  }, [sessions, skills, reviews])

  const unlockedAchievements =
    dynamicAchievements.filter(
      (achievement) => achievement.unlocked
    )

  const lockedAchievements =
    dynamicAchievements.filter(
      (achievement) => !achievement.unlocked
    )

  if (loading) {
    return (
      <div className="p-10 text-center text-on-surface-variant">
        Loading achievements...
      </div>
    )
  }

  if (error) {
    return (
      <GlassCard className="p-8 text-center">
        <h1 className="font-display text-xl font-semibold text-on-surface">
          Unable to load achievements
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
          Achievements
        </h1>

        <p className="text-on-surface-variant">
          Track your milestones, growth, and recognition across SkillSync.
        </p>
      </div>

      {/* XP + Quick Stats */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <XPLevelCard data={XP_LEVEL} />

        <div className="lg:col-span-2 grid grid-cols-2 gap-4">
          <StatCard
            label="Achievements Unlocked"
            value={String(unlockedAchievements.length)}
            icon={Trophy}
            tint="tertiary"
          />

          <StatCard
            label="Achievements Remaining"
            value={String(lockedAchievements.length)}
            icon={Lock}
            tint="secondary"
          />

          <StatCard
            label="Certificates"
            value={String(CERTIFICATES_DATA.length)}
            icon={Award}
            tint="primary"
          />

          <StatCard
            label="Current Level"
            value={`Level ${XP_LEVEL.level}`}
            icon={Trophy}
            tint="primary"
          />
        </div>
      </section>

      {/* Achievement Categories */}
      {CATEGORIES.map((category) => {
        const achievements =
          dynamicAchievements.filter(
            (achievement) =>
              achievement.category === category
          )

        return (
          <section key={category}>
            <SectionHeader title={category} />

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard
                  key={achievement.id}
                  achievement={achievement}
                />
              ))}
            </div>
          </section>
        )
      })}

      {/* Certificates */}
      <section>
        <SectionHeader title="Certificates" />

        {CERTIFICATES_DATA.length === 0 ? (
          <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
            No certificates earned yet.
          </GlassCard>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {CERTIFICATES_DATA.map((certificate) => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
              />
            ))}
          </div>
        )}
      </section>

      {/* Achievement Timeline */}
      <section>
        <SectionHeader title="Achievement Timeline" />

        {ACHIEVEMENT_TIMELINE.length === 0 ? (
          <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
            Your achievement timeline will appear here as you progress.
          </GlassCard>
        ) : (
          <AchievementTimeline
            events={ACHIEVEMENT_TIMELINE}
          />
        )}
      </section>
    </div>
  )
}