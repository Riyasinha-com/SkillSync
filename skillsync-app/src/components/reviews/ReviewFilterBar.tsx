import { Search } from 'lucide-react'
import { FilterChip } from '@/components/explore/FilterChip'
import type { ReviewRole } from '@/data/reviewsMock'

export type RoleFilter = 'all' | ReviewRole
export type StarFilter = 'all' | 1 | 2 | 3 | 4 | 5

export function ReviewFilterBar({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  starFilter,
  onStarFilterChange,
}: {
  search: string
  onSearchChange: (v: string) => void
  roleFilter: RoleFilter
  onRoleFilterChange: (v: RoleFilter) => void
  starFilter: StarFilter
  onStarFilterChange: (v: StarFilter) => void
}) {
  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search reviews by name, skill or comment…"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-11 pr-4 py-3 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <FilterChip active={roleFilter === 'all'} onClick={() => onRoleFilterChange('all')}>
          All Reviews
        </FilterChip>
        <FilterChip active={roleFilter === 'teacher'} onClick={() => onRoleFilterChange('teacher')}>
          As Teacher
        </FilterChip>
        <FilterChip active={roleFilter === 'learner'} onClick={() => onRoleFilterChange('learner')}>
          As Learner
        </FilterChip>
        <div className="w-px h-5 bg-white/10 mx-1 hidden sm:block" />
        <FilterChip active={starFilter === 'all'} onClick={() => onStarFilterChange('all')}>
          Any rating
        </FilterChip>
        {([5, 4, 3, 2, 1] as const).map((star) => (
          <FilterChip key={star} active={starFilter === star} onClick={() => onStarFilterChange(star)}>
            {star}★
          </FilterChip>
        ))}
      </div>
    </div>
  )
}
