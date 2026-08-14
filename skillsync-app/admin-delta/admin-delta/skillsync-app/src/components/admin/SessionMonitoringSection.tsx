import { useMemo, useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import { AdminSessionRow } from '@/components/admin/AdminSessionRow'
import type { AdminSession, AdminSessionStatus } from '@/data/adminMock'

type StatusFilter = 'all' | AdminSessionStatus

const STATUSES: AdminSessionStatus[] = ['ongoing', 'upcoming', 'completed', 'cancelled']

export function SessionMonitoringSection({ sessions }: { sessions: AdminSession[] }) {
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filtered = useMemo(
    () => (statusFilter === 'all' ? sessions : sessions.filter((s) => s.status === statusFilter)),
    [sessions, statusFilter]
  )

  const counts = useMemo(() => {
    const c: Record<AdminSessionStatus, number> = { ongoing: 0, upcoming: 0, completed: 0, cancelled: 0 }
    for (const s of sessions) c[s.status]++
    return c
  }, [sessions])

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={statusFilter === 'all'} onClick={() => setStatusFilter('all')}>
          All ({sessions.length})
        </FilterChip>
        {STATUSES.map((status) => (
          <FilterChip key={status} active={statusFilter === status} onClick={() => setStatusFilter(status)}>
            {status[0].toUpperCase() + status.slice(1)} ({counts[status]})
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
          No sessions match this filter.
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((s) => (
            <AdminSessionRow key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  )
}
