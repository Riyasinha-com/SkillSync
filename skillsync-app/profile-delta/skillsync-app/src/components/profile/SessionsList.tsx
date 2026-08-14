import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { RecentSession, SessionStatus } from '@/data/profileMock'

const STATUS_VARIANT: Record<SessionStatus, 'tertiary' | 'primary' | 'neutral'> = {
  Completed: 'tertiary',
  Upcoming: 'primary',
  Cancelled: 'neutral',
}

export function SessionsList({ sessions }: { sessions: RecentSession[] }) {
  return (
    <GlassCard className="divide-y divide-white/6 overflow-hidden">
      {sessions.map((s) => (
        <div key={s.id} className="flex flex-wrap items-center gap-4 p-5 first:rounded-t-2xl last:rounded-b-2xl">
          <Avatar name={s.partnerName} size="sm" />
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-on-surface truncate">
              {s.skill}
              <span className="text-on-surface-variant font-normal"> · {s.role === 'Teacher' ? 'You taught' : 'You learned from'} {s.partnerName}</span>
            </p>
            <p className="text-xs text-on-surface-variant/70 mt-0.5">{s.date}</p>
          </div>
          <Badge variant={STATUS_VARIANT[s.status]} size="sm" className="normal-case font-body">
            {s.status}
          </Badge>
          <Button variant="ghost" size="sm">
            View Details
          </Button>
        </div>
      ))}
    </GlassCard>
  )
}
