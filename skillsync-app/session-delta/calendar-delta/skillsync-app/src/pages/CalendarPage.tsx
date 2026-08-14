import { useMemo, useState } from 'react'
import { CalendarDays, Send } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { CalendarViewToggle, type CalendarView } from '@/components/calendar/CalendarViewToggle'
import { MonthCalendarGrid } from '@/components/calendar/MonthCalendarGrid'
import { WeekScheduleStrip } from '@/components/calendar/WeekScheduleStrip'
import { SessionRequestCard } from '@/components/calendar/SessionRequestCard'
import { SessionListItem } from '@/components/calendar/SessionListItem'
import { SessionDetailsPanel } from '@/components/calendar/SessionDetailsPanel'
import { TimeSlotPicker } from '@/components/calendar/TimeSlotPicker'
import { AvailabilityScheduler } from '@/components/profile/AvailabilityScheduler'
import { toISODate } from '@/lib/date'
import { SCHEDULED_SESSIONS, type ScheduledSession } from '@/data/calendarMock'
import { DEFAULT_AVAILABILITY, type AvailabilityState } from '@/data/profileMock'

export default function CalendarPage() {
  const [sessions, setSessions] = useState<ScheduledSession[]>(SCHEDULED_SESSIONS)
  const [view, setView] = useState<CalendarView>('month')
  const [cursor, setCursor] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(() => toISODate(new Date()))
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    () => sessions.find((s) => s.status === 'accepted' && s.startsAt)?.id ?? null
  )
  const [availability, setAvailability] = useState<AvailabilityState>(DEFAULT_AVAILABILITY)
  const [proposedSlot, setProposedSlot] = useState<string | null>(null)

  const todayISO = toISODate(new Date())
  const selectedSession = sessions.find((s) => s.id === selectedSessionId) ?? null

  const todaysSessions = useMemo(() => sessions.filter((s) => s.date === todayISO), [sessions, todayISO])
  const pendingSessions = useMemo(() => sessions.filter((s) => s.status === 'pending'), [sessions])
  const acceptedSessions = useMemo(
    () => sessions.filter((s) => s.status === 'accepted').sort((a, b) => a.date.localeCompare(b.date)),
    [sessions]
  )

  function handleAccept(id: string) {
    setSessions((list) => list.map((s) => (s.id === id ? { ...s, status: 'accepted' } : s)))
    setSelectedSessionId(id)
  }
  function handleDecline(id: string) {
    setSessions((list) => list.filter((s) => s.id !== id))
    if (selectedSessionId === id) setSelectedSessionId(null)
  }
  function handleCancel(id: string) {
    setSessions((list) => list.map((s) => (s.id === id ? { ...s, status: 'cancelled' } : s)))
  }
  function handleReschedule(id: string) {
    setSessions((list) => list.map((s) => (s.id === id ? { ...s, status: 'pending' } : s)))
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
            {pendingSessions.length === 0 ? (
              <GlassCard className="p-6 text-sm text-on-surface-variant">
                No pending session requests right now.
              </GlassCard>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {pendingSessions.map((s) => (
                  <SessionRequestCard key={s.id} session={s} onAccept={handleAccept} onDecline={handleDecline} />
                ))}
              </div>
            )}
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
        </div>

        {/* Right column */}
        <aside className="flex flex-col gap-8">
          <section>
            <SectionHeader title="Session Details" />
            <SessionDetailsPanel session={selectedSession} onCancel={handleCancel} onReschedule={handleReschedule} />
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
