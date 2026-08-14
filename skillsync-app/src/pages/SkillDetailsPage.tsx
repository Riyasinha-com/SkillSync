import { useParams, Link } from 'react-router-dom'
import { Users, GraduationCap, Star, ArrowLeft } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { SessionsList } from '@/components/profile/SessionsList'
import { ReviewEntryCard } from '@/components/reviews/ReviewEntryCard'
import { RoadmapSteps } from '@/components/skill-details/RoadmapSteps'
import { PersonMiniRow } from '@/components/skill-details/PersonMiniRow'
import { SKILL_DETAIL } from '@/data/skillDetailsMock'
import { CATEGORY_ICONS, TEACHERS } from '@/data/exploreMock'
import { RECENT_SESSIONS } from '@/data/profileMock'
import { REVIEWS_DATA } from '@/data/reviewsMock'

const DIFFICULTY_VARIANT = { Beginner: 'tertiary', Intermediate: 'secondary', Advanced: 'primary' } as const

export default function SkillDetailsPage() {
  // No backend, so :id isn't used to fetch anything real — the mock always
  // represents the same skill. Kept in the route for realistic navigation.
  useParams<{ id: string }>()
  const skill = SKILL_DETAIL
  const Icon = CATEGORY_ICONS[skill.category]

  const mentors = TEACHERS.filter((t) => t.teaches.some((s) => s.name === skill.name))
  const learners = TEACHERS.filter((t) => t.wants.includes(skill.name))
  const sessions = RECENT_SESSIONS.filter((s) => s.skill.toLowerCase().includes(skill.name.toLowerCase()))
  const reviews = REVIEWS_DATA.filter((r) => r.skill === skill.name)

  return (
    <div className="flex flex-col gap-10">
      <Link to="/explore" className="flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface w-fit transition-colors">
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to Explore Skills
      </Link>

      {/* Overview */}
      <GlassCard raised className="p-6 md:p-8">
        <div className="flex flex-wrap items-start gap-6">
          <div className="w-16 h-16 rounded-2xl bg-primary-container/20 flex items-center justify-center flex-shrink-0">
            <Icon className="w-7 h-7 text-primary" />
          </div>
          <div className="flex-1 min-w-[200px]">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface">{skill.name}</h1>
              <Badge variant="neutral" size="sm" className="normal-case font-body">
                {skill.category}
              </Badge>
              <Badge variant={DIFFICULTY_VARIANT[skill.difficulty]} size="sm" className="normal-case font-body">
                {skill.difficulty}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-1 text-sm text-on-surface-variant">
              <span className="flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-primary" />
                {skill.teacherCount} teachers
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                {skill.learnerCount} learners
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-tertiary fill-tertiary" />
                {skill.rating}
              </span>
            </div>
          </div>
          <Link to="/explore?tab=people">
            <Button variant="magical" size="sm">
              Find a Teacher
            </Button>
          </Link>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-10 min-w-0">
          <section>
            <SectionHeader title="Description" />
            <GlassCard className="p-6">
              <p className="text-sm text-on-surface-variant leading-relaxed">{skill.description}</p>
            </GlassCard>
          </section>

          <section>
            <SectionHeader title="Learning Roadmap" />
            <RoadmapSteps stages={skill.roadmap} />
          </section>

          <section>
            <SectionHeader title="Sessions" />
            {sessions.length === 0 ? (
              <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
                No sessions for this skill yet.
              </GlassCard>
            ) : (
              <SessionsList sessions={sessions} />
            )}
          </section>

          <section>
            <SectionHeader title="Reviews" />
            {reviews.length === 0 ? (
              <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
                No reviews for this skill yet.
              </GlassCard>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {reviews.map((r) => (
                  <ReviewEntryCard key={r.id} review={r} />
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-8">
          {skill.yourProgress !== undefined && (
            <section>
              <SectionHeader title="Your Progress" />
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-on-surface-variant">Progress</span>
                  <span className="text-xs font-mono-label text-primary">{skill.yourProgress}%</span>
                </div>
                <ProgressBar value={skill.yourProgress} tint="primary" />
              </GlassCard>
            </section>
          )}

          <section>
            <SectionHeader title="Related Mentors" />
            {mentors.length === 0 ? (
              <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
                No mentors listed yet.
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-4">
                <GlassCard className="p-6">
  <p className="text-sm text-on-surface-variant">
    Mentor information will be loaded from the database soon.
  </p>
</GlassCard>
              </div>
            )}
          </section>

          <section>
            <SectionHeader title="Related Learners" />
            <GlassCard className="p-2">
              {learners.length === 0 ? (
                <p className="text-sm text-on-surface-variant text-center py-4">No learners listed yet.</p>
              ) : (
                learners.map((l) => (
                  <PersonMiniRow key={l.id} person={l} note={`Wants to learn ${skill.name}`} />
                ))
              )}
            </GlassCard>
          </section>
        </aside>
      </div>
    </div>
  )
}
