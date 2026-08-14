import { Badge } from '@/components/ui/Badge'
import type { AdminSession, AdminSessionStatus } from '@/data/adminMock'

const STATUS_VARIANT: Record<AdminSessionStatus, 'primary' | 'secondary' | 'tertiary' | 'neutral'> = {
  ongoing: 'primary',
  upcoming: 'secondary',
  completed: 'tertiary',
  cancelled: 'neutral',
}

export function AdminSessionRow({ session }: { session: AdminSession }) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-white/8">
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-on-surface truncate">{session.skill}</p>
        <p className="text-xs text-on-surface-variant truncate">
          {session.teacherName} teaching {session.learnerName} · {session.date}, {session.time}
        </p>
      </div>
      <Badge variant={STATUS_VARIANT[session.status]} size="sm" className="normal-case font-body flex-shrink-0">
        {session.status}
      </Badge>
    </div>
  )
}
