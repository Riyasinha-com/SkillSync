import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'
import { toISODate } from '@/lib/date'
import type { ScheduledSession } from '@/types/calendar'

const WEEKDAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

const STATUS_DOT: Record<ScheduledSession['status'], string> = {
  accepted: 'bg-primary',
  pending: 'bg-secondary',
  completed: 'bg-tertiary',
  cancelled: 'bg-on-surface-variant/40',
}

export function MonthCalendarGrid({
  cursor,
  onCursorChange,
  selectedDate,
  onSelectDate,
  sessions,
}: {
  cursor: Date
  onCursorChange: (d: Date) => void
  selectedDate: string
  onSelectDate: (isoDate: string) => void
  sessions: ScheduledSession[]
}) {
  const year = cursor.getFullYear()
  const month = cursor.getMonth()
  const firstOfMonth = new Date(year, month, 1)
  const startOffset = firstOfMonth.getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const todayISO = toISODate(new Date())

  const cells: (Date | null)[] = [
    ...Array.from({ length: startOffset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ]

  const sessionsByDate = sessions.reduce<Record<string, ScheduledSession[]>>((acc, s) => {
    ;(acc[s.date] ??= []).push(s)
    return acc
  }, {})

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-on-surface">
          {cursor.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onCursorChange(new Date(year, month - 1, 1))}
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onCursorChange(new Date())}
            className="px-3 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-xs font-medium text-on-surface-variant hover:text-on-surface"
          >
            Today
          </button>
          <button
            onClick={() => onCursorChange(new Date(year, month + 1, 1))}
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            aria-label="Next month"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {WEEKDAY_LABELS.map((d) => (
          <div key={d} className="text-center text-[11px] font-mono-label text-on-surface-variant/50 py-1">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {cells.map((date, i) => {
          if (!date) return <div key={`empty-${i}`} />
          const iso = toISODate(date)
          const daySessions = sessionsByDate[iso] ?? []
          const isToday = iso === todayISO
          const isSelected = iso === selectedDate

          return (
            <button
              key={iso}
              onClick={() => onSelectDate(iso)}
              className={cn(
                'aspect-square rounded-xl flex flex-col items-center justify-center gap-1 text-sm transition-all duration-200 relative',
                isSelected
                  ? 'bg-primary/15 border border-primary/40 text-primary font-semibold'
                  : isToday
                    ? 'border border-primary/25 text-on-surface hover:bg-white/5'
                    : 'text-on-surface-variant hover:bg-white/5 hover:text-on-surface'
              )}
            >
              {date.getDate()}
              {daySessions.length > 0 && (
                <span className="flex gap-0.5">
                  {daySessions.slice(0, 3).map((s) => (
                    <span key={s.id} className={cn('w-1 h-1 rounded-full', STATUS_DOT[s.status])} />
                  ))}
                </span>
              )}
            </button>
          )
        })}
      </div>
    </GlassCard>
  )
}
