import { MapPin, Clock } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import {
  CATEGORIES, EXPERIENCE_LEVELS, AVAILABILITY_OPTIONS, TIMEZONES,
  type Category, type ExperienceLevel, type Availability,
} from '@/data/exploreMock'

export interface ExploreFilters {
  categories: Category[]
  levels: ExperienceLevel[]
  availability: Availability[]
  timezone: string
  city: string
}

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function FiltersPanel({
  filters,
  onChange,
}: {
  filters: ExploreFilters
  onChange: (filters: ExploreFilters) => void
}) {
  const hasActiveFilters =
    filters.categories.length > 0 ||
    filters.levels.length > 0 ||
    filters.availability.length > 0 ||
    !!filters.timezone ||
    !!filters.city

  return (
    <GlassCard className="p-6 flex flex-col gap-6">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Categories</h3>
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

      <div className="grid sm:grid-cols-2 gap-6">
        <div>
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Experience Level</h3>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map((lvl) => (
              <FilterChip
                key={lvl}
                active={filters.levels.includes(lvl)}
                onClick={() => onChange({ ...filters, levels: toggle(filters.levels, lvl) })}
              >
                {lvl}
              </FilterChip>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Availability</h3>
          <div className="flex flex-wrap gap-2">
            {AVAILABILITY_OPTIONS.map((opt) => (
              <FilterChip
                key={opt}
                active={filters.availability.includes(opt)}
                onClick={() => onChange({ ...filters, availability: toggle(filters.availability, opt) })}
              >
                {opt}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/8">
        <label className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
          <Clock className="w-4 h-4 text-on-surface-variant/60 flex-shrink-0" />
          <select
            value={filters.timezone}
            onChange={(e) => onChange({ ...filters, timezone: e.target.value })}
            className="w-full bg-transparent text-sm text-on-surface focus:outline-none [&>option]:bg-surface-container"
          >
            <option value="">Any timezone</option>
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-3 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 transition-all">
          <MapPin className="w-4 h-4 text-on-surface-variant/60 flex-shrink-0" />
          <input
            type="text"
            value={filters.city}
            onChange={(e) => onChange({ ...filters, city: e.target.value })}
            placeholder="City"
            className="w-full bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none"
          />
        </label>
      </div>

      {hasActiveFilters && (
        <button
          onClick={() => onChange({ categories: [], levels: [], availability: [], timezone: '', city: '' })}
          className="self-start text-xs text-primary hover:underline"
        >
          Clear all filters
        </button>
      )}
    </GlassCard>
  )
}
