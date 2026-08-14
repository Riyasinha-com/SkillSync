import { Bookmark, Clock, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { ResourceTypeBadge } from '@/components/resources/ResourceTypeBadge'
import { CATEGORY_ICONS } from '@/components/resources/categoryIcons'
import { cn } from '@/lib/utils'
import type { Resource } from '@/data/resourcesMock'

const DIFFICULTY_VARIANT = { Beginner: 'tertiary', Intermediate: 'secondary', Advanced: 'primary' } as const

export function FeaturedResourceCard({
  resource,
  bookmarked,
  onToggleBookmark,
}: {
  resource: Resource
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
}) {
  const CategoryIcon = CATEGORY_ICONS[resource.category]

  return (
    <GlassCard raised className="relative overflow-hidden p-8 md:p-10">
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-secondary-container/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
        <div className="w-20 h-20 md:w-24 md:h-24 rounded-3xl bg-gradient-to-br from-primary-container to-secondary-container flex items-center justify-center flex-shrink-0 shadow-[0_0_40px_rgba(124,77,255,0.3)]">
          <CategoryIcon className="w-9 h-9 md:w-10 md:h-10 text-on-primary-container" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge variant="primary" size="sm" className="normal-case font-body">
              Featured Learning Path
            </Badge>
            <ResourceTypeBadge type={resource.type} />
            <Badge variant={DIFFICULTY_VARIANT[resource.difficulty]} size="sm" className="normal-case font-body">
              {resource.difficulty}
            </Badge>
          </div>

          <h2 className="font-display text-2xl md:text-3xl font-bold text-on-surface mb-3 leading-tight">
            {resource.title}
          </h2>
          <p className="text-on-surface-variant leading-relaxed max-w-2xl mb-5">{resource.description}</p>

          <div className="flex flex-wrap items-center gap-5 text-sm text-on-surface-variant mb-6">
            <span>
              By <span className="text-on-surface">{resource.author}</span> · {resource.source}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {resource.duration}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="magical" size="md" className="group">
              Start Learning
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              variant="glass"
              size="md"
              onClick={() => onToggleBookmark(resource.id)}
              className={cn(bookmarked && 'text-tertiary border-tertiary/30')}
            >
              <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-tertiary')} />
              {bookmarked ? 'Saved' : 'Save for later'}
            </Button>
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
