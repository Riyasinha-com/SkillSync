import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { PlatformBadge } from '@/components/calendar/PlatformBadge'
import { cn } from '@/lib/utils'
import type { ScheduledSession } from '@/data/calendarMock'

const STATUS_VARIANT: Record<ScheduledSession['status'], 'primary' | 'secondary' | 'tertiary' | 'neutral'> = {
  accepted: 'primary',
  pending: 'secondary',
  completed: 'tertiary',
  cancelled: 'neutral',
}

export function SessionListItem({
  session,
  active,
  onClick,
}: {
  session: ScheduledSession
  active?: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 border',
        active ? 'bg-primary/10 border-primary/35' : 'border-white/8 hover:bg-white/5'
      )}
    >
      <Avatar name={session.partnerName} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-on-surface truncate">{session.skill}</p>
        <p className="text-xs text-on-surface-variant truncate">
          with {session.partnerName} · {session.dateLabel}, {session.time}
        </p>
      </div>
      <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
        <Badge variant={STATUS_VARIANT[session.status]} size="sm" className="normal-case font-body">
          {session.status}
        </Badge>
        <PlatformBadge platform={session.platform} />
      </div>
    </button>
  )
}
