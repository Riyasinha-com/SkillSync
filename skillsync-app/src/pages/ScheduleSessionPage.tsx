import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { CalendarPlus } from 'lucide-react'
import api from '@/api/api'
import { Alert } from '@/components/ui/Alert'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export default function ScheduleSessionPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const matchId = searchParams.get('matchId')
  const [date, setDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [meetingLink, setMeetingLink] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!matchId) return
    setError(null)
    setSubmitting(true)
    try {
      await api.post('/sessions', { matchId, scheduledDate: date, startTime, endTime, meetingLink })
      navigate('/matches')
    } catch (requestError: any) {
      setError(requestError.response?.data?.message || 'Unable to schedule this session. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!matchId) return (
    <GlassCard className="max-w-xl p-8">
      <h1 className="font-display text-2xl font-semibold text-on-surface">Choose a match first</h1>
      <p className="mt-2 text-on-surface-variant">Sessions can only be scheduled from an accepted match.</p>
      <Link to="/matches" className="mt-6 inline-block"><Button>Back to Matches</Button></Link>
    </GlassCard>
  )

  return (
    <div className="max-w-2xl">
      <div className="mb-8"><h1 className="font-display text-3xl font-bold text-on-surface">Schedule a session</h1><p className="mt-2 text-on-surface-variant">Set a time for your accepted skill swap.</p></div>
      <GlassCard className="p-6 sm:p-8">
        <form className="flex flex-col gap-5" onSubmit={submit}>
          {error && <Alert variant="error">{error}</Alert>}
          <label className="flex flex-col gap-2 text-sm text-on-surface">Date<input required type="date" value={date} onChange={(event) => setDate(event.target.value)} className="rounded-xl border border-outline-variant bg-white/5 px-4 py-3 text-on-surface" /></label>
          <div className="grid sm:grid-cols-2 gap-5">
            <label className="flex flex-col gap-2 text-sm text-on-surface">Start time<input required type="time" value={startTime} onChange={(event) => setStartTime(event.target.value)} className="rounded-xl border border-outline-variant bg-white/5 px-4 py-3 text-on-surface" /></label>
            <label className="flex flex-col gap-2 text-sm text-on-surface">End time<input required type="time" value={endTime} onChange={(event) => setEndTime(event.target.value)} className="rounded-xl border border-outline-variant bg-white/5 px-4 py-3 text-on-surface" /></label>
          </div>
          <label className="flex flex-col gap-2 text-sm text-on-surface">Meeting link <span className="text-on-surface-variant">(optional)</span><input type="url" value={meetingLink} onChange={(event) => setMeetingLink(event.target.value)} placeholder="https://meet.google.com/..." className="rounded-xl border border-outline-variant bg-white/5 px-4 py-3 text-on-surface placeholder:text-on-surface-variant/60" /></label>
          <div className="flex flex-wrap gap-3 pt-2"><Button type="submit" loading={submitting}><CalendarPlus className="w-4 h-4" />Schedule session</Button><Button type="button" variant="outline" onClick={() => navigate('/matches')}>Cancel</Button></div>
        </form>
      </GlassCard>
    </div>
  )
}
