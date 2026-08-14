import { Check, X } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { PlatformBadge } from '@/components/calendar/PlatformBadge'
import type { ScheduledSession } from '@/data/calendarMock'

export function SessionRequestCard({
  session,
  onAccept,
  onDecline,
}: {
  session: ScheduledSession
  onAccept: (id: string) => void
  onDecline: (id: string) => void
}) {
  return (
    <GlassCard interactive className="p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Avatar name={session.partnerName} size="md" />
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-semibold text-on-surface truncate">{session.partnerName}</h4>
          <Badge variant={session.role === 'Teacher' ? 'secondary' : 'primary'} size="sm" className="mt-1 normal-case font-body">
            {session.role === 'Teacher' ? 'Wants you to teach' : 'Offering to teach'} {session.skill}
          </Badge>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 text-xs text-on-surface-variant">
        <span>{session.dateLabel} · {session.time}</span>
        <PlatformBadge platform={session.platform} />
      </div>

      <p className="text-[11px] text-on-surface-variant/60">Requested {session.requestedDate}</p>

      <div className="flex gap-2">
        <Button variant="magical" size="sm" className="flex-1" onClick={() => onAccept(session.id)}>
          <Check className="w-4 h-4" />
          Accept
        </Button>
        <Button variant="outline" size="sm" className="flex-1" onClick={() => onDecline(session.id)}>
          <X className="w-4 h-4" />
          Decline
        </Button>
      </div>
    </GlassCard>
  )
}
