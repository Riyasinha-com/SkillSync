import { useEffect, useMemo, useState } from 'react'
import { CalendarDays, Send } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { CalendarViewToggle, type CalendarView } from '@/components/calendar/CalendarViewToggle'
import { MonthCalendarGrid } from '@/components/calendar/MonthCalendarGrid'
import { WeekScheduleStrip } from '@/components/calendar/WeekScheduleStrip'
import { SessionListItem } from '@/components/calendar/SessionListItem'
import { SessionDetailsPanel } from '@/components/calendar/SessionDetailsPanel'
import { TimeSlotPicker } from '@/components/calendar/TimeSlotPicker'
import { AvailabilityScheduler } from '@/components/profile/AvailabilityScheduler'
import { toISODate } from '@/lib/date'
import api from '@/api/api'
import type { MeetingPlatform } from '@/data/profileMock'
import type { ScheduledSession } from '@/types/calendar'
import { DEFAULT_AVAILABILITY, type AvailabilityState } from '@/data/profileMock'

type SessionUser = { _id: string; name?: string }
type SessionSkill = { title?: string }
 type ApiSession = {
  _id: string
  teacher: SessionUser | string | null
  learner: SessionUser | string | null
  scheduledDate: string
  startTime: string
  endTime: string
  meetingLink?: string
  status: string
  match?: { senderSkill?: SessionSkill; receiverSkill?: SessionSkill }
}

function userId(user: SessionUser | string | null) {
  return typeof user === 'string' ? user : user?._id || ''
}

function minutes(time: string) {
  const match = time.trim().match(/^(\d{1,2}):(\d{2})(?:\s*([AaPp][Mm]))?$/)
  if (!match) return 0
  let hours = Number(match[1])
  const period = match[3]?.toLowerCase()
  if (period === 'pm' && hours !== 12) hours += 12
  if (period === 'am' && hours === 12) hours = 0
  return hours * 60 + Number(match[2])
}

function displayTime(time: string) {
  if (/[AaPp][Mm]$/.test(time.trim())) return time
  const [hours, minutes] = time.split(':').map(Number)
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return time
  return new Date(2000, 0, 1, hours, minutes).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

function platformFor(meetingLink = ''): MeetingPlatform {
  if (/meet\.google\.com/i.test(meetingLink)) return 'Google Meet'
  if (/zoom\.us/i.test(meetingLink)) return 'Zoom'
  return 'Other'
}

function mapSession(session: ApiSession, currentUserId: string): ScheduledSession {
  const date = session.scheduledDate.slice(0, 10)

  const teacherId = userId(session.teacher)
  const learnerId = userId(session.learner)

  const isTeacher = teacherId === currentUserId
  const isLearner = learnerId === currentUserId

  const partner = isTeacher
    ? session.learner
    : isLearner
      ? session.teacher
      : session.teacher || session.learner

  const partnerName =
    typeof partner === 'string'
      ? 'Skill partner'
      : partner?.name || 'Skill partner'

  const durationMins = Math.max(
    0,
    minutes(session.endTime) - minutes(session.startTime)
  )

  const scheduledAt = new Date(`${date}T${session.startTime}`)

  return {
    id: session._id,
    partnerName,
    role: isTeacher ? 'Learner' : 'Teacher',
    skill: session.match?.senderSkill?.title || 'Skill session',
    date,
    dateLabel: new Date(`${date}T00:00:00`).toLocaleDateString(
      undefined,
      {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }
    ),
    time: displayTime(session.startTime),
    durationMins,
    platform: platformFor(session.meetingLink),
    meetLink: session.meetingLink || '',
    status:
      session.status === 'Completed'
        ? 'completed'
        : session.status === 'Cancelled'
          ? 'cancelled'
          : 'accepted',
    startsAt: Number.isNaN(scheduledAt.getTime())
      ? undefined
      : scheduledAt.toISOString(),
  }
}
  

export default function CalendarPage() {
  const [sessions, setSessions] = useState<ScheduledSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [completingId, setCompletingId] = useState<string | null>(null)
  const [view, setView] = useState<CalendarView>('month')
  const [cursor, setCursor] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()))
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(null)
  const [availability, setAvailability] = useState<AvailabilityState>(DEFAULT_AVAILABILITY)
  const [proposedSlot, setProposedSlot] = useState<string | null>(null)
  const [reviewedSessionIds, setReviewedSessionIds] = useState<string[]>([])
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true)
      setError(null)
      try {
        const currentUserId = JSON.parse(localStorage.getItem('user') || '{}')._id || ''
        const response = await api.get<ApiSession[]>('/sessions')

const reviewsResponse = await api.get('/reviews/my')

const reviewedIds = Array.isArray(reviewsResponse.data)
  ? reviewsResponse.data
      .map((review: any) => review.session?._id)
      .filter(Boolean)
  : []

setReviewedSessionIds(reviewedIds)

const mappedSessions = response.data.map((session) =>
  mapSession(session, currentUserId)
)
        setSessions(mappedSessions)
        setSelectedSessionId(mappedSessions.find((session) => session.status === 'accepted')?.id ?? null)
      } catch (requestError: any) {
        setError(requestError.response?.data?.message || 'Unable to load sessions. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    void fetchSessions()
  }, [])

  const todayISO = toISODate(new Date())
  const selectedSession = sessions.find((s) => s.id === selectedSessionId) ?? null

  const todaysSessions = useMemo(() => sessions.filter((s) => s.date === todayISO), [sessions, todayISO])
  const pendingSessions = useMemo(() => sessions.filter((s) => s.status === 'pending'), [sessions])
  const acceptedSessions = useMemo(
    () => sessions.filter((s) => s.status === 'accepted').sort((a, b) => a.date.localeCompare(b.date)),
    [sessions]
  )

  const completedSessions = useMemo(
  () =>
    sessions
      .filter((s) => s.status === 'completed')
      .sort((a, b) => b.date.localeCompare(a.date)),
  [sessions]
)

  async function handleComplete(id: string) {
  setCompletingId(id)
  setError(null)

  try {
    await api.patch(`/sessions/${id}/complete`)

    setSessions((list) =>
      list.map((session) =>
        session.id === id
          ? { ...session, status: 'completed' }
          : session
      )
    )

    setSelectedSessionId(id)
  } catch (requestError: any) {
    setError(
      requestError.response?.data?.message ||
      'Unable to complete this session. Please try again.'
    )
  } finally {
    setCompletingId(null)
  }
}

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Session Scheduler
        </h1>
        <p className="text-on-surface-variant">
          Plan your learning sessions, manage requests, and keep track of every swap.
        </p>
      </div>

      {loading && (
        <GlassCard className="p-6 text-sm text-on-surface-variant">Loading your sessions...</GlassCard>
      )}
      {error && (
        <GlassCard className="p-6 text-sm text-error">{error}</GlassCard>
      )}

      {/* Today's schedule */}
      <section>
        <SectionHeader title="Today's Schedule" />
        {todaysSessions.length === 0 ? (
          <GlassCard className="p-6 flex items-center gap-3 text-sm text-on-surface-variant">
            <CalendarDays className="w-4 h-4 text-primary flex-shrink-0" />
            Nothing scheduled for today — enjoy the breathing room.
          </GlassCard>
        ) : (
          <div className="flex flex-col gap-3">
            {todaysSessions.map((s) => (
              <SessionListItem
                key={s.id}
                session={s}
                active={s.id === selectedSessionId}
                onClick={() => setSelectedSessionId(s.id)}
              />
            ))}
          </div>
        )}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main column */}
        <div className="lg:col-span-2 flex flex-col gap-10 min-w-0">
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-xl font-semibold text-on-surface">Calendar</h2>
              <CalendarViewToggle value={view} onChange={setView} />
            </div>
            {view === 'month' ? (
              <MonthCalendarGrid
                cursor={cursor}
                onCursorChange={setCursor}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                sessions={sessions}
              />
            ) : (
              <WeekScheduleStrip
                cursor={cursor}
                onCursorChange={setCursor}
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                sessions={sessions}
              />
            )}
          </section>

          <section>
            <SectionHeader title="Pending Requests" />
            <GlassCard className="p-6 text-sm text-on-surface-variant">
              {pendingSessions.length === 0 ? 'No pending session requests right now.' : 'Pending session requests are not supported by the current session API.'}
            </GlassCard>
          </section>

          <section>
            <SectionHeader title="Upcoming Sessions" />
            {acceptedSessions.length === 0 ? (
              <GlassCard className="p-6 text-sm text-on-surface-variant">
                No accepted sessions yet — accept a request to get started.
              </GlassCard>
            ) : (
              <div className="flex flex-col gap-3">
                {acceptedSessions.map((s) => (
                  <SessionListItem
                    key={s.id}
                    session={s}
                    active={s.id === selectedSessionId}
                    onClick={() => setSelectedSessionId(s.id)}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
  <SectionHeader title="Completed Sessions" />

  {completedSessions.length === 0 ? (
    <GlassCard className="p-6 text-sm text-on-surface-variant">
      No completed sessions yet.
    </GlassCard>
  ) : (
    <div className="flex flex-col gap-3">
      {completedSessions.map((s) => (
        <SessionListItem
          key={s.id}
          session={s}
          active={s.id === selectedSessionId}
          onClick={() => setSelectedSessionId(s.id)}
        />
      ))}

    </div>
  )}
</section>

        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-8">
          <section>
            <SectionHeader title="Session Details" />
            <SessionDetailsPanel
  session={selectedSession}
  onComplete={handleComplete}
  completing={completingId === selectedSession?.id}
  hasReview={
    selectedSession
      ? reviewedSessionIds.includes(selectedSession.id)
      : false
  }
/>
          </section>

          <section>
            <SectionHeader title="Propose a Time" />
            <GlassCard className="p-6 flex flex-col gap-4">
              <p className="text-xs text-on-surface-variant">
                Pick a slot to suggest for your next open session request.
              </p>
              <TimeSlotPicker selected={proposedSlot} onSelect={setProposedSlot} />
              <Button variant="magical" size="sm" className="w-full" disabled={!proposedSlot}>
                <Send className="w-4 h-4" />
                {proposedSlot ? `Propose ${proposedSlot}` : 'Select a time'}
              </Button>
            </GlassCard>
          </section>

          <section>
            <SectionHeader title="Availability" />
            <AvailabilityScheduler availability={availability} onChange={setAvailability} />
          </section>
        </aside>
      </div>
    </div>
  )
}
