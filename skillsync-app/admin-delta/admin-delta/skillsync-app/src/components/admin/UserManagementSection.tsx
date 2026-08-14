import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import { UserRow } from '@/components/admin/UserRow'
import type { AdminUser, UserStatus } from '@/data/adminMock'

type StatusFilter = 'all' | UserStatus

export function UserManagementSection({
  users,
  onStatusChange,
  onDelete,
}: {
  users: AdminUser[]
  onStatusChange: (id: string, status: UserStatus) => void
  onDelete: (id: string) => void
}) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      if (statusFilter !== 'all' && u.status !== statusFilter) return false
      if (q && !u.name.toLowerCase().includes(q) && !u.email.toLowerCase().includes(q)) return false
      return true
    })
  }, [users, search, statusFilter])

  return (
    <div className="flex flex-col gap-5">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users by name or email…"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-11 pr-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
        />
      </div>

      <div className="flex flex-wrap gap-2">
        {(['all', 'active', 'suspended', 'banned'] as const).map((status) => (
          <FilterChip key={status} active={statusFilter === status} onClick={() => setStatusFilter(status)}>
            {status === 'all' ? 'All Users' : status[0].toUpperCase() + status.slice(1)}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
          No users match your search or filters.
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((user) => (
            <UserRow key={user.id} user={user} onStatusChange={onStatusChange} onDelete={onDelete} />
          ))}
        </div>
      )}
    </div>
  )
}
