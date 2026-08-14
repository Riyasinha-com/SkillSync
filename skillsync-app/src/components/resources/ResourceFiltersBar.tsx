import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import type { ResourceCategory, Difficulty } from '@/data/resourcesMock'

const CATEGORIES: ResourceCategory[] = [
  'Programming', 'AI', 'Machine Learning', 'Data Science', 'Web Development', 'Frontend',
  'Backend', 'Cloud', 'Cybersecurity', 'DevOps', 'Design', 'UI/UX', 'Communication', 'Career',
  'Interview Prep', 'Productivity', 'Mathematics', 'Open Source', 'Other',
]

const DIFFICULTIES: Difficulty[] = ['Beginner', 'Intermediate', 'Advanced']

export type SortMode = 'Newest' | 'Popular'
export type PricingFilter = 'Free' | 'Premium'

export interface ResourceFilters {
  categories: ResourceCategory[]
  difficulties: Difficulty[]
  pricing: PricingFilter[]
  sort: SortMode
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function ResourceFiltersBar({
  filters,
  onChange,
}: {
  filters: ResourceFilters
  onChange: (filters: ResourceFilters) => void
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-6">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Sort by</h3>
        <div className="flex flex-wrap gap-2">
          {(['Newest', 'Popular'] as const).map((mode) => (
            <FilterChip key={mode} active={filters.sort === mode} onClick={() => onChange({ ...filters, sort: mode })}>
              {mode}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Difficulty</h3>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((level) => (
              <FilterChip
                key={level}
                active={filters.difficulties.includes(level)}
                onClick={() => onChange({ ...filters, difficulties: toggle(filters.difficulties, level) })}
              >
                {level}
              </FilterChip>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Pricing</h3>
          <div className="flex flex-wrap gap-2">
            {(['Free', 'Premium'] as const).map((p) => (
              <FilterChip
                key={p}
                active={filters.pricing.includes(p)}
                onClick={() => onChange({ ...filters, pricing: toggle(filters.pricing, p) })}
              >
                {p}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Category</h3>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <FilterChip
              key={cat}
              active={filters.categories.includes(cat)}
              onClick={() => onChange({ ...filters, categories: toggle(filters.categories, cat) })}
            >
              {cat}
            </FilterChip>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
