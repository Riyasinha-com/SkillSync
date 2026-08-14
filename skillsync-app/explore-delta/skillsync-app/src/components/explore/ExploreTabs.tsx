import { cn } from '@/lib/utils'

export type ExploreTab = 'skills' | 'people' | 'categories'

const TABS: { id: ExploreTab; label: string }[] = [
  { id: 'skills', label: 'All Skills' },
  { id: 'people', label: 'People' },
  { id: 'categories', label: 'Categories' },
]

export function ExploreTabs({ value, onChange }: { value: ExploreTab; onChange: (tab: ExploreTab) => void }) {
  return (
    <div className="inline-flex p-1 rounded-full glass-panel gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            value === tab.id
              ? 'glow-button text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
