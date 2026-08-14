import { useEffect, useState } from 'react'
import { CalendarDays, Clock, Video, Users2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PlatformBadge } from '@/components/calendar/PlatformBadge'
import type { ScheduledSession } from '@/data/calendarMock'

function useCountdown(target?: string) {
  const [label, setLabel] = useState<string | null>(null)

  useEffect(() => {
    if (!target) {
      setLabel(null)
      return
    }
    function tick() {
      const remaining = new Date(target!).getTime() - Date.now()
      if (remaining <= 0) {
        setLabel('Starting now')
        return
      }
      const hours = Math.floor(remaining / (1000 * 60 * 60))
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
      setLabel(hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`)
    }
    tick()
    const id = setInterval(tick, 1000 * 30)
    return () => clearInterval(id)
  }, [target])

  return label
}

export function SessionDetailsPanel({
  session,
  onCancel,
  onReschedule,
}: {
  session: ScheduledSession | null
  onCancel: (id: string) => void
  onReschedule: (id: string) => void
}) {
  const countdown = useCountdown(session?.startsAt)

  if (!session) {
    return (
      <GlassCard className="p-8 flex flex-col items-center text-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.04] flex items-center justify-center">
          <Users2 className="w-5 h-5 text-on-surface-variant/60" />
        </div>
        <p className="text-sm text-on-surface-variant">
          Select a session to see its details.
        </p>
      </GlassCard>
    )
  }

  const canJoin = session.status === 'accepted' && !!session.meetLink
  const canManage = session.status === 'accepted' || session.status === 'pending'

  return (
    <GlassCard raised className="p-6 flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <Avatar name={session.partnerName} size="md" />
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-on-surface truncate">{session.partnerName}</h3>
          <p className="text-xs text-on-surface-variant">
            {session.role === 'Teacher' ? 'You\u2019re learning from them' : 'You\u2019re teaching them'}
          </p>
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skill</p>
        <Badge variant="primary" size="sm">
          {session.skill}
        </Badge>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <CalendarDays className="w-4 h-4 text-primary" />
          {session.dateLabel}
        </div>
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <Clock className="w-4 h-4 text-primary" />
          {session.time} · {session.durationMins} min
        </div>
        <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
          <Video className="w-4 h-4 text-primary" />
          <PlatformBadge platform={session.platform} />
        </div>
      </div>

      {countdown && (
        <div className="text-center py-3 rounded-xl bg-primary/10 border border-primary/20">
          <span className="text-xs font-mono-label text-primary">STARTS IN {countdown.toUpperCase()}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <Button variant="magical" size="md" className="w-full" disabled={!canJoin}>
          <Video className="w-4 h-4" />
          Join Meeting
        </Button>
        {canManage && (
          <div className="flex gap-2">
            <Button variant="glass" size="sm" className="flex-1" onClick={() => onReschedule(session.id)}>
              Reschedule
            </Button>
            <Button variant="outline" size="sm" className="flex-1" onClick={() => onCancel(session.id)}>
              Cancel
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  )
}
