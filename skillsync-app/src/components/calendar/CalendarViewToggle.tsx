import { cn } from '@/lib/utils'

export type CalendarView = 'month' | 'week'

export function CalendarViewToggle({ value, onChange }: { value: CalendarView; onChange: (v: CalendarView) => void }) {
  return (
    <div className="inline-flex p-1 rounded-full glass-panel gap-1">
      {(['month', 'week'] as const).map((view) => (
        <button
          key={view}
          onClick={() => onChange(view)}
          className={cn(
            'px-4 py-2 rounded-full text-sm font-medium capitalize transition-all duration-200',
            value === view ? 'glow-button text-on-primary' : 'text-on-surface-variant hover:text-on-surface'
          )}
        >
          {view}
        </button>
      ))}
    </div>
  )
}
