import { GlassCard } from '@/components/ui/GlassCard'
import { CATEGORY_ICONS, type Category } from '@/data/exploreMock'

export function CategoryCard({
  category,
  active,
  onClick,
}: {
  category: Category
  active?: boolean
  onClick?: () => void
}) {
  const Icon = CATEGORY_ICONS[category]
  return (
    <GlassCard
      as="button"
      onClick={onClick}
      interactive
      className={`p-5 flex flex-col items-center gap-3 text-center ${active ? 'border-primary/40 bg-primary/8' : ''}`}
    >
      <div className="w-11 h-11 rounded-xl bg-primary-container/20 flex items-center justify-center">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <span className="text-sm font-medium text-on-surface">{category}</span>
    </GlassCard>
  )
}
