import { cn } from '@/lib/utils'
import type { MatchStatus } from '@/data/matchesMock'

const TABS: { id: MatchStatus; label: string }[] = [
  { id: 'pending', label: 'Pending' },
  { id: 'accepted', label: 'Accepted' },
  { id: 'completed', label: 'Completed' },
]

export function MatchTabs({
  value,
  onChange,
  counts,
}: {
  value: MatchStatus
  onChange: (tab: MatchStatus) => void
  counts: Record<MatchStatus, number>
}) {
  return (
    <div className="inline-flex p-1 rounded-full glass-panel gap-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
            value === tab.id
              ? 'glow-button text-on-primary'
              : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {tab.label}
          <span
            className={cn(
              'text-xs px-1.5 py-0.5 rounded-full',
              value === tab.id ? 'bg-white/20' : 'bg-white/8'
            )}
          >
            {counts[tab.id]}
          </span>
        </button>
      ))}
    </div>
  )
}
