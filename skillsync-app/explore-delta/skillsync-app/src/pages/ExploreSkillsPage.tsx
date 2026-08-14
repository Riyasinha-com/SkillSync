import { useMemo, useState } from 'react'
import { Sparkles } from 'lucide-react'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import { ExploreSearchBar } from '@/components/explore/ExploreSearchBar'
import { ExploreTabs, type ExploreTab } from '@/components/explore/ExploreTabs'
import { FiltersPanel, type ExploreFilters } from '@/components/explore/FiltersPanel'
import { SkillCard } from '@/components/explore/SkillCard'
import { TeacherCard } from '@/components/explore/TeacherCard'
import { CategoryCard } from '@/components/explore/CategoryCard'
import { TrendingSkillsRow } from '@/components/explore/TrendingSkillsRow'
import { RecommendedMatchCard } from '@/components/explore/RecommendedMatchCard'
import { EmptyState } from '@/components/explore/EmptyState'
import {
  FEATURED_SKILLS, TEACHERS, POPULAR_CATEGORIES, TRENDING_SKILLS, RECOMMENDED_MATCHES,
  type Category,
} from '@/data/exploreMock'

const EMPTY_FILTERS: ExploreFilters = { categories: [], levels: [], availability: [], timezone: '', city: '' }

export default function ExploreSkillsPage() {
  const [tab, setTab] = useState<ExploreTab>('skills')
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<ExploreFilters>(EMPTY_FILTERS)

  function toggleCategoryOnly(category: Category) {
    setFilters((f) => ({
      ...f,
      categories: f.categories.length === 1 && f.categories[0] === category ? [] : [category],
    }))
  }

  const filteredSkills = useMemo(() => {
    const q = search.trim().toLowerCase()
    return FEATURED_SKILLS.filter((skill) => {
      if (q && !skill.name.toLowerCase().includes(q) && !skill.category.toLowerCase().includes(q)) return false
      if (filters.categories.length && !filters.categories.includes(skill.category)) return false
      return true
    })
  }, [search, filters.categories])

  const filteredTeachers = useMemo(() => {
    const q = search.trim().toLowerCase()
    return TEACHERS.filter((teacher) => {
      const matchesSearch =
        !q ||
        teacher.name.toLowerCase().includes(q) ||
        teacher.teaches.some((s) => s.name.toLowerCase().includes(q)) ||
        teacher.wants.some((s) => s.toLowerCase().includes(q))
      if (!matchesSearch) return false

      if (filters.levels.length && !teacher.teaches.some((s) => filters.levels.includes(s.level))) return false
      if (filters.availability.length && !filters.availability.some((a) => teacher.availability.includes(a))) return false
      if (filters.timezone && teacher.timezone !== filters.timezone) return false
      if (filters.city && !teacher.location.toLowerCase().includes(filters.city.trim().toLowerCase())) return false

      return true
    })
  }, [search, filters])

  const isFiltered =
    search.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.levels.length > 0 ||
    filters.availability.length > 0 ||
    !!filters.timezone ||
    !!filters.city

  const noSkillResults = filteredSkills.length === 0
  const noTeacherResults = filteredTeachers.length === 0

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface">Explore Skills</h1>
        </div>
        <p className="text-on-surface-variant mb-6 max-w-xl">
          Discover talented people, explore skills, and find your next learning partner.
        </p>
        <ExploreTabs value={tab} onChange={setTab} />
      </div>

      {/* Search */}
      <ExploreSearchBar value={search} onChange={setSearch} />

      {/* Filters */}
      <FiltersPanel filters={filters} onChange={setFilters} />

      {tab === 'skills' && (
        <>
          <section>
            <SectionHeader title="Featured Skills" />
            {noSkillResults ? (
              <EmptyState onReset={() => { setSearch(''); setFilters(EMPTY_FILTERS) }} />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredSkills.map((skill) => (
                  <SkillCard key={skill.id} skill={skill} />
                ))}
              </div>
            )}
          </section>

          {!isFiltered && (
            <>
              <section>
                <SectionHeader title="Popular Categories" />
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                  {POPULAR_CATEGORIES.map((cat) => (
                    <CategoryCard
                      key={cat}
                      category={cat}
                      active={filters.categories.includes(cat)}
                      onClick={() => toggleCategoryOnly(cat)}
                    />
                  ))}
                </div>
              </section>

              <section>
                <SectionHeader title="Trending Skills" />
                <TrendingSkillsRow skills={TRENDING_SKILLS} />
              </section>
            </>
          )}
        </>
      )}

      {tab === 'people' && (
        <>
          <section>
            <SectionHeader title="Recommended Matches" />
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {RECOMMENDED_MATCHES.map((match) => (
                <RecommendedMatchCard key={match.id} match={match} />
              ))}
            </div>
          </section>

          <section>
            <SectionHeader title="Teachers" />
            {noTeacherResults ? (
              <EmptyState onReset={() => { setSearch(''); setFilters(EMPTY_FILTERS) }} />
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard key={teacher.id} teacher={teacher} />
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {tab === 'categories' && (
        <section>
          <SectionHeader title="All Categories" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {POPULAR_CATEGORIES.map((cat) => (
              <CategoryCard
                key={cat}
                category={cat}
                active={filters.categories.includes(cat)}
                onClick={() => toggleCategoryOnly(cat)}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
