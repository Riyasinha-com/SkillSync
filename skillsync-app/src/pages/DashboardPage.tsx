import {
  Plus,
  BookOpen,
  Clock,
  Users,
  Calendar,
  CheckCircle,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'
import { CircularProgress } from '@/components/ui/CircularProgress'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { StatCard } from '@/components/dashboard/StatCard'
import { SkillTeachCard } from '@/components/dashboard/SkillTeachCard'
import AddSkillModal from '@/components/dashboard/AddSkillModal'
import { LearningGoalCard } from '@/components/dashboard/LearningGoalCard'
import { MatchCard } from '@/components/dashboard/MatchCard'
import { SessionCard } from '@/components/dashboard/SessionCard'
import { AchievementBadge } from '@/components/dashboard/AchievementBadge'
import { ActivityItem } from '@/components/dashboard/ActivityItem'
import { DailyTipCard, SkillPillsCard } from '@/components/dashboard/RightPanelWidgets'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import {
  
  LEARNING_GOALS,
  MATCHES,
  UPCOMING_SESSION,
  PROGRESS_STATS,
  ACHIEVEMENTS,
  ACTIVITY_FEED,
  DAILY_TIP,
  RECOMMENDED_SKILLS,
  TRENDING_SKILLS,
} from '@/data/dashboardMock'

interface BackendSkill {
  _id: string
  title: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience: number
}

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export default function DashboardPage() {

  const [dashboard, setDashboard] = useState({
  skillsCount: 0,
  pendingRequests: 0,
  acceptedRequests: 0,
  upcomingSessions: 0,
  completedSessions: 0,
  averageRating: 0,
  activeConversations: 0,
})

const [mySkills, setMySkills] = useState<BackendSkill[]>([])
const [isAddSkillOpen, setIsAddSkillOpen] = useState(false)
const [editingSkill, setEditingSkill] = useState<BackendSkill | null>(null)

const [isEditOpen, setIsEditOpen] = useState(false)

const fetchDashboard = async () => {
  try {
    const res = await api.get("/dashboard")
    setDashboard(res.data)

    const skillsRes = await api.get("/skills")
    setMySkills(skillsRes.data)

  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
  fetchDashboard()
}, [])

  return (
    <div className="flex flex-col gap-10">
      {/* Welcome */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          {greeting()}, {JSON.parse(localStorage.getItem('user') || '{}')?.name || 'User'}
        </h1>
        <p className="text-on-surface-variant">
          Welcome back to SkillSync.{' '}
          <span className="text-on-surface">Every skill you share helps someone grow.</span>
        </p>
      </div>

      {/* Quick stats */}
      <section>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
<StatCard
  label="Skills"
  value={String(dashboard.skillsCount)}
  icon={BookOpen}
  tint="primary"
/>

<StatCard
  label="Pending"
  value={String(dashboard.pendingRequests)}
  icon={Clock}
  tint="error"
/>

<StatCard
  label="Matches"
  value={String(dashboard.acceptedRequests)}
  icon={Users}
  tint="secondary"
/>

<StatCard
  label="Upcoming"
  value={String(dashboard.upcomingSessions)}
  icon={Calendar}
  tint="tertiary"
/>

<StatCard
  label="Completed"
  value={String(dashboard.completedSessions)}
  icon={CheckCircle}
  tint="primary"
/>

<StatCard
  label="Chats"
  value={String(dashboard.activeConversations)}
  icon={MessageCircle}
  tint="secondary"
/>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-10 min-w-0">
          {/* My skills */}
          <section>
            <SectionHeader
              title="Skills I Teach"
              action={
                <Button
           variant="glass"
            size="sm"
            onClick={() => setIsAddSkillOpen(true)}
           >
            <Plus className="w-4 h-4" />
            Add Skill
          </Button>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
  {mySkills.length > 0 ? (
    mySkills.map((skill) => (
      <SkillTeachCard
  key={skill._id}
  skill={{
    name: skill.title,
    level: skill.level,
    experience: `${skill.yearsOfExperience} yrs experience`,
  }}
  onEdit={() => {
    setEditingSkill(skill)
    setIsEditOpen(true)
  }}
/>
    ))
  ) : (
    <p className="text-on-surface-variant">
      No skills added yet.
    </p>
  )}
</div>
            
          </section>

          {/* Learning goals */}
          <section>
            <SectionHeader
              title="Skills I Want to Learn"
              action={
                <Button variant="glass" size="sm">
                  <Plus className="w-4 h-4" />
                  Add goal
                </Button>
              }
            />
            <div className="grid sm:grid-cols-2 gap-4">
              {LEARNING_GOALS.map((goal) => (
                <LearningGoalCard key={goal.name} goal={goal} />
              ))}
            </div>
          </section>

          {/* Matches */}
          <section>
            <SectionHeader title="Your Matches" />
            <div className="flex flex-col gap-4">
              {MATCHES.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          {/* Progress */}
          <section>
            <SectionHeader title="Your Progress" />
            <GlassCard className="p-6 md:p-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress
                    value={PROGRESS_STATS.skillsLearned.value}
                    max={PROGRESS_STATS.skillsLearned.max}
                    tint="primary"
                    label={`${PROGRESS_STATS.skillsLearned.value}`}
                  />
                  <span className="text-xs text-on-surface-variant text-center">Skills Learned</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress
                    value={PROGRESS_STATS.hoursCompleted.value}
                    max={PROGRESS_STATS.hoursCompleted.max}
                    tint="secondary"
                    label={`${PROGRESS_STATS.hoursCompleted.value}`}
                  />
                  <span className="text-xs text-on-surface-variant text-center">Hours Completed</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress
                    value={PROGRESS_STATS.sessionsFinished.value}
                    max={PROGRESS_STATS.sessionsFinished.max}
                    tint="tertiary"
                    label={`${PROGRESS_STATS.sessionsFinished.value}`}
                  />
                  <span className="text-xs text-on-surface-variant text-center">Sessions Finished</span>
                </div>
                <div className="flex flex-col items-center gap-3">
                  <CircularProgress
                    value={PROGRESS_STATS.achievementProgress.value}
                    max={PROGRESS_STATS.achievementProgress.max}
                    tint="primary"
                    label={`${PROGRESS_STATS.achievementProgress.value}/${PROGRESS_STATS.achievementProgress.max}`}
                  />
                  <span className="text-xs text-on-surface-variant text-center">Achievements</span>
                </div>
              </div>
            </GlassCard>
          </section>

          {/* Achievements */}
          <section>
            <SectionHeader title="Achievements" />
            <GlassCard className="p-6 md:p-8">
              <div className="flex flex-wrap gap-6 justify-center sm:justify-start">
                {ACHIEVEMENTS.map((a) => (
                  <AchievementBadge key={a.id} achievement={a} />
                ))}
              </div>
            </GlassCard>
          </section>

          {/* Community activity */}
          <section>
            <SectionHeader title="Community Activity" />
            <GlassCard className="p-6">
              {ACTIVITY_FEED.map((entry) => (
                <ActivityItem key={entry.id} entry={entry} />
              ))}
            </GlassCard>
          </section>
        </div>

        {/* Right panel */}
        <aside className="flex flex-col gap-6">
          <SessionCard session={UPCOMING_SESSION} />
          <DailyTipCard tip={DAILY_TIP} />
          <SkillPillsCard title="Recommended for you" skills={RECOMMENDED_SKILLS} variant="recommended" />
          <SkillPillsCard title="Trending skills" skills={TRENDING_SKILLS} variant="trending" />
        </aside>

        <AddSkillModal
  isOpen={isAddSkillOpen}
  onClose={() => setIsAddSkillOpen(false)}
  onSkillAdded={fetchDashboard}
/>

{isEditOpen && (
  <div className="fixed bottom-6 right-6 rounded-xl bg-green-600 p-4 text-white">
    Editing: {editingSkill?.title}
  </div>
)}

      </div>
    </div>
  )
}
