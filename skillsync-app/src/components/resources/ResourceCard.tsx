import { Bookmark, Clock, ExternalLink, Sparkles, Flame, Award, Users2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ResourceTypeBadge } from '@/components/resources/ResourceTypeBadge'
import { CATEGORY_ICONS } from '@/components/resources/categoryIcons'
import { cn } from '@/lib/utils'
import type { Resource } from '@/data/resourcesMock'

const DIFFICULTY_VARIANT = { Beginner: 'tertiary', Intermediate: 'secondary', Advanced: 'primary' } as const

export function ResourceCard({
  resource,
  bookmarked,
  onToggleBookmark,
  progress,
  className,
}: {
  resource: Resource
  bookmarked: boolean
  onToggleBookmark: (id: string) => void
  /** 0–100, renders a progress bar when provided (Continue Learning) */
  progress?: number
  className?: string
}) {
  const CategoryIcon = CATEGORY_ICONS[resource.category]

  return (
    <GlassCard interactive className={cn('flex flex-col gap-4 p-5', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center flex-shrink-0">
          <CategoryIcon className="w-5 h-5 text-primary" />
        </div>
        <button
          onClick={() => onToggleBookmark(resource.id)}
          aria-label={bookmarked ? 'Remove bookmark' : 'Save bookmark'}
          aria-pressed={bookmarked}
          className={cn(
            'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors',
            bookmarked ? 'text-tertiary bg-tertiary-container/40' : 'text-on-surface-variant/60 hover:text-tertiary hover:bg-white/5'
          )}
        >
          <Bookmark className={cn('w-4 h-4', bookmarked && 'fill-tertiary')} />
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        <ResourceTypeBadge type={resource.type} />
        <Badge variant={DIFFICULTY_VARIANT[resource.difficulty]} size="sm" className="normal-case font-body">
          {resource.difficulty}
        </Badge>
        {!resource.free && (
          <Badge variant="neutral" size="sm" className="normal-case font-body">
            Premium
          </Badge>
        )}
      </div>

      <div>
        <h3 className="font-display font-semibold text-on-surface leading-snug mb-1.5">{resource.title}</h3>
        <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-2">{resource.description}</p>
      </div>

      <p className="text-xs text-on-surface-variant/70">
        {resource.author} · <span className="text-on-surface-variant">{resource.source}</span>
      </p>

      <div className="flex flex-wrap gap-1.5">
        {resource.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="text-[11px] px-2 py-0.5 rounded-full bg-white/[0.04] border border-white/8 text-on-surface-variant/70">
            #{tag}
          </span>
        ))}
      </div>

      {(resource.editorsChoice || resource.aiPick || resource.communityRecommended || resource.trending) && (
        <div className="flex flex-wrap gap-1.5">
          {resource.editorsChoice && (
            <span className="flex items-center gap-1 text-[11px] text-tertiary"><Award className="w-3 h-3" /> Editor's Choice</span>
          )}
          {resource.aiPick && (
            <span className="flex items-center gap-1 text-[11px] text-primary"><Sparkles className="w-3 h-3" /> AI Pick</span>
          )}
          {resource.communityRecommended && (
            <span className="flex items-center gap-1 text-[11px] text-secondary"><Users2 className="w-3 h-3" /> Community</span>
          )}
          {resource.trending && (
            <span className="flex items-center gap-1 text-[11px] text-tertiary"><Flame className="w-3 h-3" /> Trending</span>
          )}
        </div>
      )}

      {progress !== undefined && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] text-on-surface-variant">In progress</span>
            <span className="text-[11px] font-mono-label text-primary">{progress}%</span>
          </div>
          <ProgressBar value={progress} tint="primary" />
        </div>
      )}

      <div className="flex items-center justify-between mt-auto pt-1">
        <span className="flex items-center gap-1.5 text-xs text-on-surface-variant/70">
          <Clock className="w-3.5 h-3.5" />
          {resource.duration}
        </span>
        <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200">
          Open
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </GlassCard>
  )
}
