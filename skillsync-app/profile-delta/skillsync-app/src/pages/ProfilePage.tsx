import { useState } from 'react'
import { Plus, Star, BookOpen, Heart, Repeat, CalendarCheck2, MessageSquare, Flame } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { ProfileHeader } from '@/components/profile/ProfileHeader'
import { ProfileSkillCard } from '@/components/profile/ProfileSkillCard'
import { ProfileLearningGoalCard } from '@/components/profile/ProfileLearningGoalCard'
import { AvailabilityScheduler } from '@/components/profile/AvailabilityScheduler'
import { SessionsList } from '@/components/profile/SessionsList'
import { ReviewCard } from '@/components/profile/ReviewCard'
import { ProfileAchievementBadge } from '@/components/profile/ProfileAchievementBadge'
import { AccountSettingsPreview } from '@/components/profile/AccountSettingsPreview'
import {
  PROFILE, PROFILE_STATS, PROFILE_TEACH_SKILLS, PROFILE_LEARNING_GOALS,
  DEFAULT_AVAILABILITY, RECENT_SESSIONS, REVIEWS, PROFILE_ACHIEVEMENTS, ACCOUNT_PREVIEW,
  type AvailabilityState,
} from '@/data/profileMock'

const STAT_ICONS = [BookOpen, Heart, Repeat, CalendarCheck2, MessageSquare, Flame] as const
const STAT_TINTS = ['primary', 'secondary', 'tertiary', 'primary', 'secondary', 'tertiary'] as const

export default function ProfilePage() {
  const [teachSkills, setTeachSkills] = useState(PROFILE_TEACH_SKILLS)
  const [availability, setAvailability] = useState<AvailabilityState>(DEFAULT_AVAILABILITY)
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">My Profile</h1>
        <p className="text-on-surface-variant">
          Manage your profile, skills, availability and achievements.
        </p>
      </div>

      <ProfileHeader profile={PROFILE} />

      {/* Stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {PROFILE_STATS.map((stat, i) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={STAT_ICONS[i]} tint={STAT_TINTS[i]} />
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-10 min-w-0">
          {/* Skills I teach */}
          <section>
            <SectionHeader
              title="Skills I Teach"
              action={
                <Button variant="glass" size="sm">
                  <Plus className="w-4 h-4" />
                  Add New Skill
                </Button>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {teachSkills.map((skill) => (
                <ProfileSkillCard
                  key={skill.id}
                  skill={skill}
                  onDelete={(id) => setTeachSkills((list) => list.filter((s) => s.id !== id))}
                />
              ))}
            </div>
          </section>

          {/* Learning goals */}
          <section>
            <SectionHeader
              title="Skills I Want to Learn"
              action={
                <Button variant="glass" size="sm">
                  <Plus className="w-4 h-4" />
                  Add Learning Goal
                </Button>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {PROFILE_LEARNING_GOALS.map((goal) => (
                <ProfileLearningGoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </section>

          {/* Availability */}
          <section>
            <SectionHeader title="Availability" />
            <AvailabilityScheduler availability={availability} onChange={setAvailability} />
          </section>

          {/* Recent sessions */}
          <section>
            <SectionHeader title="Recent Sessions" />
            <SessionsList sessions={RECENT_SESSIONS} />
          </section>

          {/* Reviews */}
          <section>
            <SectionHeader
              title="Reviews"
              action={
                <span className="flex items-center gap-1.5 text-sm text-on-surface">
                  <Star className="w-4 h-4 text-tertiary fill-tertiary" />
                  <span className="font-semibold">{avgRating}</span>
                  <span className="text-on-surface-variant">average</span>
                </span>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {REVIEWS.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-10">
          <section>
            <SectionHeader title="Achievements" />
            <GlassCard className="p-6">
              <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
                {PROFILE_ACHIEVEMENTS.map((a) => (
                  <ProfileAchievementBadge key={a.id} achievement={a} />
                ))}
              </div>
            </GlassCard>
          </section>

          <section>
            <SectionHeader title="Account Settings" />
            <AccountSettingsPreview
              email={ACCOUNT_PREVIEW.email}
              notifications={ACCOUNT_PREVIEW.notifications}
              privacy={ACCOUNT_PREVIEW.privacy}
            />
          </section>
        </aside>
      </div>
    </div>
  )
}
