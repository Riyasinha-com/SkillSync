import { Search, Sparkles, ArrowRight } from 'lucide-react'
import type { Resource } from '@/data/resourcesMock'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good Morning'
  if (hour < 18) return 'Good Afternoon'
  return 'Good Evening'
}

export function ResourcesHero({
  search,
  onSearchChange,
  quote,
  featured,
}: {
  search: string
  onSearchChange: (v: string) => void
  quote: string
  featured: Resource
}) {
  return (
    <div>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
        {greeting()}, Alex
      </h1>
      <p className="text-on-surface-variant italic mb-6 max-w-xl">"{quote}"</p>

      <div className="relative mb-4">
        <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/60" />
        <input
          type="search"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search articles, courses, videos, books…"
          className="w-full glass-panel-raised rounded-2xl pl-14 pr-5 py-4 text-base text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>

      <a
        href="#featured-resource"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors group"
      >
        <Sparkles className="w-4 h-4 text-primary" />
        Featured path this week:
        <span className="text-on-surface font-medium">{featured.title}</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  )
}
