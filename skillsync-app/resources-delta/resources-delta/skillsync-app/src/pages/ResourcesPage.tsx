import { useMemo, useState } from 'react'
import { Flame, TrendingUp, Bookmark, CheckCircle2 } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { GlassCard } from '@/components/ui/GlassCard'
import { ResourcesHero } from '@/components/resources/ResourcesHero'
import { FeaturedResourceCard } from '@/components/resources/FeaturedResourceCard'
import { ResourceCard } from '@/components/resources/ResourceCard'
import { ResourceScrollRow } from '@/components/resources/ResourceScrollRow'
import { ResourceFiltersBar, type ResourceFilters } from '@/components/resources/ResourceFiltersBar'
import {
  RESOURCES, CONTINUE_LEARNING, RECENTLY_VIEWED_IDS, FEATURED_RESOURCE_ID,
  LEARNING_QUOTES, DAILY_STREAK, WEEKLY_PROGRESS,
} from '@/data/resourcesMock'

const DEFAULT_FILTERS: ResourceFilters = { categories: [], difficulties: [], pricing: [], sort: 'Popular' }
const QUOTE = LEARNING_QUOTES[0]

export default function ResourcesPage() {
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<ResourceFilters>(DEFAULT_FILTERS)
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(['r4', 'r17']))

  function toggleBookmark(id: string) {
    setBookmarks((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const featured = RESOURCES.find((r) => r.id === FEATURED_RESOURCE_ID)!
  const byId = useMemo(() => new Map(RESOURCES.map((r) => [r.id, r])), [])

  const recommended = useMemo(
    () => RESOURCES.filter((r) => r.communityRecommended || r.aiPick).slice(0, 8),
    []
  )
  const recentlyViewed = useMemo(
    () => RECENTLY_VIEWED_IDS.map((id) => byId.get(id)).filter((r): r is NonNullable<typeof r> => !!r),
    [byId]
  )
  const popularThisWeek = useMemo(
    () => [...RESOURCES].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 8),
    []
  )
  const newThisWeek = useMemo(
    () => [...RESOURCES].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo).slice(0, 8),
    []
  )

  const library = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = RESOURCES.filter((r) => {
      if (q && !r.title.toLowerCase().includes(q) && !r.description.toLowerCase().includes(q) && !r.tags.some((t) => t.includes(q))) {
        return false
      }
      if (filters.categories.length && !filters.categories.includes(r.category)) return false
      if (filters.difficulties.length && !filters.difficulties.includes(r.difficulty)) return false
      if (filters.pricing.length) {
        const matchesPricing = filters.pricing.includes('Free') && r.free || filters.pricing.includes('Premium') && !r.free
        if (!matchesPricing) return false
      }
      return true
    })
    list = filters.sort === 'Newest'
      ? [...list].sort((a, b) => a.addedDaysAgo - b.addedDaysAgo)
      : [...list].sort((a, b) => b.popularityScore - a.popularityScore)
    return list
  }, [search, filters])

  return (
    <div className="flex flex-col gap-10">
      <ResourcesHero search={search} onSearchChange={setSearch} quote={QUOTE} featured={featured} />

      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Learning Streak" value={`${DAILY_STREAK.days} days`} icon={Flame} tint="tertiary" />
        <StatCard label="This Week" value={`${WEEKLY_PROGRESS.hoursThisWeek}/${WEEKLY_PROGRESS.goalHours}h`} icon={TrendingUp} tint="primary" />
        <StatCard label="Bookmarks Saved" value={String(bookmarks.size)} icon={Bookmark} tint="secondary" />
        <StatCard label="Resources Completed" value="47" icon={CheckCircle2} tint="tertiary" />
      </section>

      <section id="featured-resource" className="scroll-mt-24">
        <FeaturedResourceCard resource={featured} bookmarked={bookmarks.has(featured.id)} onToggleBookmark={toggleBookmark} />
      </section>

      <section>
        <SectionHeader title="Recommended for You" />
        <ResourceScrollRow>
          {recommended.map((r) => (
            <ResourceCard key={r.id} resource={r} bookmarked={bookmarks.has(r.id)} onToggleBookmark={toggleBookmark} className="w-80 flex-shrink-0" />
          ))}
        </ResourceScrollRow>
      </section>

      <section>
        <SectionHeader title="Continue Learning" />
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {CONTINUE_LEARNING.map((entry) => {
            const resource = byId.get(entry.resourceId)
            if (!resource) return null
            return (
              <ResourceCard
                key={resource.id}
                resource={resource}
                bookmarked={bookmarks.has(resource.id)}
                onToggleBookmark={toggleBookmark}
                progress={entry.progress}
              />
            )
          })}
        </div>
      </section>

      <section>
        <SectionHeader title="Recently Viewed" />
        <ResourceScrollRow>
          {recentlyViewed.map((r) => (
            <ResourceCard key={r.id} resource={r} bookmarked={bookmarks.has(r.id)} onToggleBookmark={toggleBookmark} className="w-80 flex-shrink-0" />
          ))}
        </ResourceScrollRow>
      </section>

      <section>
        <SectionHeader title="Popular This Week" />
        <ResourceScrollRow>
          {popularThisWeek.map((r) => (
            <ResourceCard key={r.id} resource={r} bookmarked={bookmarks.has(r.id)} onToggleBookmark={toggleBookmark} className="w-80 flex-shrink-0" />
          ))}
        </ResourceScrollRow>
      </section>

      <section>
        <SectionHeader title="New This Week" />
        <ResourceScrollRow>
          {newThisWeek.map((r) => (
            <ResourceCard key={r.id} resource={r} bookmarked={bookmarks.has(r.id)} onToggleBookmark={toggleBookmark} className="w-80 flex-shrink-0" />
          ))}
        </ResourceScrollRow>
      </section>

      <section>
        <SectionHeader title="Resource Library" />
        <div className="flex flex-col gap-6">
          <ResourceFiltersBar filters={filters} onChange={setFilters} />
          {library.length === 0 ? (
            <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
              No resources match your search or filters.
            </GlassCard>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {library.map((r) => (
                <ResourceCard key={r.id} resource={r} bookmarked={bookmarks.has(r.id)} onToggleBookmark={toggleBookmark} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
