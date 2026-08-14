import { useMemo, useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import { ReportCard } from '@/components/admin/ReportCard'
import type { Report, ReportType } from '@/data/adminMock'

type TypeFilter = 'all' | ReportType

const TYPES: ReportType[] = ['Abuse', 'Spam', 'Fake Profile', 'Review Dispute']

export function ReportsSection({ reports, onResolve }: { reports: Report[]; onResolve: (id: string) => void }) {
  const [typeFilter, setTypeFilter] = useState<TypeFilter>('all')

  const filtered = useMemo(
    () => (typeFilter === 'all' ? reports : reports.filter((r) => r.type === typeFilter)),
    [reports, typeFilter]
  )

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-wrap gap-2">
        <FilterChip active={typeFilter === 'all'} onClick={() => setTypeFilter('all')}>
          All Reports
        </FilterChip>
        {TYPES.map((type) => (
          <FilterChip key={type} active={typeFilter === type} onClick={() => setTypeFilter(type)}>
            {type}
          </FilterChip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
          No reports of this type.
        </GlassCard>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {filtered.map((r) => (
            <ReportCard key={r.id} report={r} onResolve={onResolve} />
          ))}
        </div>
      )}
    </div>
  )
}
