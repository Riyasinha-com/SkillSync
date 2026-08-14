import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import api from "@/api/api"
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
  PROFILE_STATS,
  PROFILE_LEARNING_GOALS,
  DEFAULT_AVAILABILITY,
  RECENT_SESSIONS,
  REVIEWS,
  PROFILE_ACHIEVEMENTS,
  type AvailabilityState,
} from '@/data/profileMock'

const STAT_ICONS = [BookOpen, Heart, Repeat, CalendarCheck2, MessageSquare, Flame] as const
const STAT_TINTS = ['primary', 'secondary', 'tertiary', 'primary', 'secondary', 'tertiary'] as const

export default function ProfilePage() {
  const [searchParams] = useSearchParams()

const userId = searchParams.get("u")

const isOwnProfile = !userId

const [profile, setProfile] = useState<any>(null)

const [isLoading, setIsLoading] = useState(true)

const [loadError, setLoadError] = useState<string | null>(null)

const [skills, setSkills] = useState<any[]>([])

const [availability, setAvailability] =
  useState<AvailabilityState>(DEFAULT_AVAILABILITY)

  useEffect(() => {
  const fetchProfile = async () => {
  setIsLoading(true)
  setLoadError(null)
  setProfile(null)

  try {
    const res = userId
      ? await api.get(`/profile/${userId}`)
      : await api.get("/profile")

    if (!res.data) {
      throw new Error("Profile was not found")
    }

    setProfile(res.data)

    const skillsRes = userId
      ? await api.get(`/skills/user/${userId}`)
      : await api.get("/skills")

    setSkills(skillsRes.data)

  } catch (err) {
    console.error(err)
    setLoadError("We couldn't load this profile. Please try again.")
  } finally {
    setIsLoading(false)
  }
}

  fetchProfile()
}, [userId])

if (isLoading) {
  return (
    <div className="p-10 text-center">
      Loading...
    </div>
  )
}

if (loadError || !profile) {
  return (
    <div className="p-10 text-center text-on-surface">
      <h1 className="font-display text-2xl font-semibold">Profile unavailable</h1>
      <p className="mt-2 text-on-surface-variant">
        {loadError || "We couldn't find this profile."}
      </p>
    </div>
  )
}
  const avgRating = (REVIEWS.reduce((sum, r) => sum + r.rating, 0) / REVIEWS.length).toFixed(1)

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
       <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
  {isOwnProfile ? "My Profile" : `${profile.name}'s Profile`}
</h1>

<p className="text-on-surface-variant">
  {isOwnProfile
    ? "Manage your profile, skills, availability and achievements."
    : `View ${profile.name}'s profile, skills and achievements.`}
</p>
      </div>

     <ProfileHeader
  profile={profile}
  isOwnProfile={isOwnProfile}
/>
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
  title={isOwnProfile ? "Skills I Teach" : "Skills They Teach"}
  action={
    isOwnProfile ? (
      <Button variant="glass" size="sm">
        <Plus className="w-4 h-4" />
        Add New Skill
      </Button>
    ) : null
  }
/>
            <div className="grid sm:grid-cols-2 gap-4">
  {skills.filter((s) => s.type === "Teach").length === 0 ? (
    <p className="text-on-surface-variant">
      No teaching skills added yet.
    </p>
  ) : (
    skills
      .filter((skill) => skill.type === "Teach")
      .map((skill) => (
        <ProfileSkillCard
  key={skill._id}
  skill={{
    id: skill._id,
    name: skill.title,
    category: skill.category,
    level: skill.level,
    years: skill.yearsOfExperience,
    proof: skill.proofUrl,
  }}
  onDelete={() => {}}
/>
      ))
  )}
</div>
          </section>

          {/* Learning goals */}
          <section>
            <SectionHeader
  title={
    isOwnProfile
      ? "Skills I Want to Learn"
      : "Learning Goals"
  }
  action={
    isOwnProfile ? (
      <Button variant="glass" size="sm">
        <Plus className="w-4 h-4" />
        Add Learning Goal
      </Button>
    ) : null
  }
/>
            <div className="grid sm:grid-cols-2 gap-4">
              {PROFILE_LEARNING_GOALS.map((goal) => (
                <ProfileLearningGoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          </section>

          {/* Availability */}
          {isOwnProfile && (
            <section>
              <SectionHeader title="Availability" />
              <AvailabilityScheduler availability={availability} onChange={setAvailability} />
            </section>
          )}

          {/* Recent sessions */}
          <section>
            <SectionHeader
  title={
    isOwnProfile
      ? "Recent Sessions"
      : "Completed Sessions"
  }
/>
            <SessionsList sessions={RECENT_SESSIONS} />
          </section>

          {/* Reviews */}
          <section>
           <SectionHeader
  title={
    isOwnProfile
      ? "Reviews"
      : `${profile.name}'s Reviews`
  }
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

          {isOwnProfile && (
  <section>
    <SectionHeader title="Account Settings" />

    <AccountSettingsPreview
      email={profile.email}
      notifications="On"
      privacy="Public profile"
    />
  </section>
)}
        </aside>
      </div>
    </div>
  )
}
