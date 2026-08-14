import { cn } from '@/lib/utils'

export type AdminTab = 'overview' | 'users' | 'verification' | 'reports' | 'sessions' | 'reviews' | 'analytics'

const TABS: { id: AdminTab; label: string }[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'users', label: 'Users' },
  { id: 'verification', label: 'Verification' },
  { id: 'reports', label: 'Reports' },
  { id: 'sessions', label: 'Sessions' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'analytics', label: 'Analytics' },
]

export function AdminTabs({ value, onChange }: { value: AdminTab; onChange: (tab: AdminTab) => void }) {
  return (
    <div className="flex flex-wrap p-1 rounded-full glass-panel gap-1 w-fit max-w-full overflow-x-auto">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 whitespace-nowrap',
            value === tab.id ? 'glow-button text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
