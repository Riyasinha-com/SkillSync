import { ChevronLeft, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'
import { toISODate } from '@/lib/date'
import type { ScheduledSession } from '@/types/calendar'

function startOfWeek(d: Date) {
  const date = new Date(d)
  date.setDate(date.getDate() - date.getDay())
  return date
}

export function WeekScheduleStrip({
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
  const weekStart = startOfWeek(cursor)
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(weekStart)
    d.setDate(weekStart.getDate() + i)
    return d
  })
  const todayISO = toISODate(new Date())

  const sessionsByDate = sessions.reduce<Record<string, ScheduledSession[]>>((acc, s) => {
    ;(acc[s.date] ??= []).push(s)
    return acc
  }, {})

  return (
    <GlassCard className="p-5 md:p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-semibold text-on-surface">
          Week of {weekStart.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
        </h3>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onCursorChange(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() - 7))}
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            aria-label="Previous week"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => onCursorChange(new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 7))}
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            aria-label="Next week"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => {
          const iso = toISODate(day)
          const daySessions = sessionsByDate[iso] ?? []
          const isToday = iso === todayISO
          const isSelected = iso === selectedDate

          return (
            <button
              key={iso}
              onClick={() => onSelectDate(iso)}
              className={cn(
                'flex flex-col gap-2 rounded-xl p-3 text-left transition-all duration-200 min-h-[120px] border',
                isSelected ? 'bg-primary/10 border-primary/35' : 'border-white/8 hover:bg-white/5'
              )}
            >
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-mono-label text-on-surface-variant/60">
                  {day.toLocaleDateString(undefined, { weekday: 'short' })}
                </span>
                <span className={cn('text-sm font-semibold', isToday ? 'text-primary' : 'text-on-surface')}>
                  {day.getDate()}
                </span>
              </div>
              <div className="flex flex-col gap-1">
                {daySessions.slice(0, 2).map((s) => (
                  <Badge key={s.id} variant="primary" size="sm" className="normal-case font-body justify-center truncate">
                    {s.time}
                  </Badge>
                ))}
                {daySessions.length > 2 && (
                  <span className="text-[10px] text-on-surface-variant/60 text-center">
                    +{daySessions.length - 2} more
                  </span>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </GlassCard>
  )
}
