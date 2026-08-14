import RequestSwapModal from "@/components/explore/RequestSwapModal"
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import api from '@/api/api'
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
  POPULAR_CATEGORIES,
  TRENDING_SKILLS,
  type Category,
} from '@/data/exploreMock'

interface ExploreSkill {
  _id: string
  title: string
  category: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  yearsOfExperience: number
  description: string
    owner: {
    _id: string
    name: string
    city?: string
    profilePic?: string
  } | null
}

interface ExploreUser {
  _id: string
  name: string
  bio: string
  city: string
  timezone: string
  profilePic: string
  availability: {
    day: string
    slots: string[]
  }[]
}

interface MatchSuggestion {
  user: {
    _id: string
    name: string
  }
  youTeach: {
    _id: string
    title: string
  }
  theyTeach: {
    _id: string
    title: string
  }
  theyWant: {
    _id: string
    title: string
  }
}

const EMPTY_FILTERS: ExploreFilters = {
  categories: [],
  levels: [],
  availability: [],
  timezone: '',
  city: '',
}

export default function ExploreSkillsPage() {
  const [searchParams] = useSearchParams()

const initialTab =
  searchParams.get("tab") === "people"
    ? "people"
    : searchParams.get("tab") === "categories"
    ? "categories"
    : "skills"

const [tab, setTab] = useState<ExploreTab>(
  initialTab as ExploreTab
)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState<ExploreFilters>(EMPTY_FILTERS)
  const [skills, setSkills] = useState<ExploreSkill[]>([])
  const [users, setUsers] = useState<ExploreUser[]>([])
  const [suggestions, setSuggestions] = useState<MatchSuggestion[]>([])
  const [selectedTeacher, setSelectedTeacher] =
  useState<ExploreUser | null>(null)

const [showRequestModal, setShowRequestModal] =
  useState(false)
  

  const fetchSuggestions = async () => {
    const { data } = await api.get<MatchSuggestion[]>('/matches/suggestions')
    setSuggestions(data)
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [skillsResponse, usersResponse] = await Promise.all([
          api.get<ExploreSkill[]>('/skills/explore'),
          api.get<ExploreUser[]>('/profile/explore'),
        ])

        setSkills(skillsResponse.data)
        setUsers(usersResponse.data)
        await fetchSuggestions()
      } catch (error) {
        console.error('Unable to load explore data:', error)
      }
    }

    void fetchData()
  }, [])

  const resetFilters = () => {
    setSearch('')
    setFilters(EMPTY_FILTERS)
  }

  const toggleCategoryOnly = (category: Category) => {
    setFilters((current) => ({
      ...current,
      categories:
        current.categories.length === 1 && current.categories[0] === category
          ? []
          : [category],
    }))
  }

  const filteredSkills = useMemo(() => {
    const query = search.trim().toLowerCase()

    return skills.filter((skill) => {
      const matchesSearch =
        !query ||
        skill.title.toLowerCase().includes(query) ||
        skill.category.toLowerCase().includes(query) ||
        skill.owner?.name?.toLowerCase().includes(query)

      const matchesCategory =
        filters.categories.length === 0 ||
        filters.categories.includes(skill.category as Category)

      const matchesLevel =
        filters.levels.length === 0 || filters.levels.includes(skill.level)

      return matchesSearch && matchesCategory && matchesLevel
    })
  }, [filters.categories, filters.levels, search, skills])

  const filteredTeachers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.city.toLowerCase().includes(query) ||
        user.bio.toLowerCase().includes(query)

      const matchesCity =
        !filters.city ||
        user.city.toLowerCase().includes(filters.city.toLowerCase())

      const matchesTimezone =
        !filters.timezone || user.timezone === filters.timezone

      const matchesAvailability =
        filters.availability.length === 0 ||
        user.availability.some((entry) =>
          (filters.availability as readonly string[]).includes(entry.day),
        )

      return (
        matchesSearch &&
        matchesCity &&
        matchesTimezone &&
        matchesAvailability
      )
    })
  }, [filters.availability, filters.city, filters.timezone, search, users])

  const isFiltered =
    search.trim().length > 0 ||
    filters.categories.length > 0 ||
    filters.levels.length > 0 ||
    filters.availability.length > 0 ||
    Boolean(filters.timezone) ||
    Boolean(filters.city)

    

    const sendRequest = async (match: MatchSuggestion) => {
    try {
      await api.post('/matches', {
        senderSkillId: match.youTeach._id,
        receiverSkillId: match.theyWant._id,
        message: "I'd like to swap skills with you!",
      })

      await fetchSuggestions()
      alert('Match request sent!')
    } catch (error: unknown) {
      const message =
        typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        typeof error.response === 'object' &&
        error.response !== null &&
        'data' in error.response &&
        typeof error.response.data === 'object' &&
        error.response.data !== null &&
        'message' in error.response.data &&
        typeof error.response.data.message === 'string'
          ? error.response.data.message
          : 'Something went wrong'

      alert(message)
    }
  }

  return (
    <div className="flex flex-col gap-10">
      <div>
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          <h1 className="font-display text-3xl font-bold text-on-surface md:text-4xl">
            Explore Skills
          </h1>
        </div>
        <p className="mb-6 max-w-xl text-on-surface-variant">
          Discover talented people, explore skills, and find your next learning
          partner.
        </p>
        <ExploreTabs value={tab} onChange={setTab} />
      </div>

      <ExploreSearchBar value={search} onChange={setSearch} />
      <FiltersPanel filters={filters} onChange={setFilters} />

      {tab === 'skills' && (
        <>
          <section>
            <SectionHeader title="Featured Skills" />
            {filteredSkills.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredSkills.map((skill) => (
                  <SkillCard
                    key={skill._id}
                    skill={{
                      id: skill._id,
                      name: skill.title,
                      category: skill.category,
                      level: skill.level,
                      teacher: skill.owner?.name ?? 'Unknown teacher',
                      experience: `${skill.yearsOfExperience} yrs`,
                    }}
                  />
                ))}
              </div>
            )}
          </section>

          {!isFiltered && (
            <>
              <section>
                <SectionHeader title="Popular Categories" />
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                  {POPULAR_CATEGORIES.map((category) => (
                    <CategoryCard
                      key={category}
                      category={category}
                      active={filters.categories.includes(category)}
                      onClick={() => toggleCategoryOnly(category)}
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
            {suggestions.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {suggestions.map((match) => (
                  <RecommendedMatchCard
                    key={match.user._id}
                    match={{
                      id: match.user._id,
                      name: match.user.name,
                      matchScore: 100,
                      sharedSkills: [
                        match.theyTeach.title,
                        match.theyWant.title,
                      ],
                      reason: `${match.user.name} can teach ${match.theyTeach.title} and wants to learn ${match.theyWant.title}.`,
                    }}
                    onRequest={() => void sendRequest(match)}
                  />
                ))}
              </div>
            )}
          </section>

          <section>
            <SectionHeader title="Teachers" />
            {filteredTeachers.length === 0 ? (
              <EmptyState onReset={resetFilters} />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {filteredTeachers.map((teacher) => (
                  <TeacherCard
  key={teacher._id}
  teacher={teacher}
  onRequestSwap={(teacher) => {
    setSelectedTeacher(teacher)
    setShowRequestModal(true)
  }}
/>
                ))}
              </div>
            )}
          </section>
        </>
      )}

      {tab === 'categories' && (
        <section>
          <SectionHeader title="All Categories" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {POPULAR_CATEGORIES.map((category) => (
              <CategoryCard
                key={category}
                category={category}
                active={filters.categories.includes(category)}
                onClick={() => toggleCategoryOnly(category)}
              />
            ))}
          </div>
        </section>
      )}

      

<RequestSwapModal
  open={showRequestModal}
  teacher={selectedTeacher}
  onClose={() => {
    setShowRequestModal(false)
    setSelectedTeacher(null)
  }}
  onSuccess={async () => {
    await fetchSuggestions()
  }}
/>

    </div>
  )
}
