import { GlassCard } from '@/components/ui/GlassCard'
import type { TimelineEvent } from '@/data/reviewsMock'

export function AchievementTimeline({ events }: { events: TimelineEvent[] }) {
  return (
    <GlassCard className="p-6">
      <ol className="flex flex-col">
        {events.map((event, i) => (
          <li key={event.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-2.5 h-2.5 rounded-full bg-primary flex-shrink-0 mt-1.5 shadow-[0_0_8px_rgba(124,77,255,0.6)]" />
              {i < events.length - 1 && <span className="w-px flex-1 bg-white/10 my-1" />}
            </div>
            <div className="pb-6">
              <p className="text-sm text-on-surface font-medium">{event.label}</p>
              <p className="text-xs text-on-surface-variant/70 mt-0.5">{event.date}</p>
            </div>
          </li>
        ))}
      </ol>
    </GlassCard>
  )
}
