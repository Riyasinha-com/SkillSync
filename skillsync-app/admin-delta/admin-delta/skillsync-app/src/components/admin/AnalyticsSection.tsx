import { GlassCard } from '@/components/ui/GlassCard'
import { CircularProgress } from '@/components/ui/CircularProgress'
import { SimpleBarChart } from '@/components/admin/SimpleBarChart'
import {
  USER_GROWTH, SESSIONS_CHART, TOP_SKILLS, MOST_ACTIVE_TEACHERS, MOST_ACTIVE_LEARNERS, PLATFORM_ENGAGEMENT,
  type RankedEntry,
} from '@/data/adminMock'

function RankedList({ title, entries }: { title: string; entries: RankedEntry[] }) {
  const max = Math.max(...entries.map((e) => e.value))
  return (
    <GlassCard className="p-6">
      <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-4">{title}</h3>
      <div className="flex flex-col gap-3">
        {entries.map((entry, i) => (
          <div key={entry.name} className="flex items-center gap-3">
            <span className="text-xs font-mono-label text-on-surface-variant/50 w-4 flex-shrink-0">{i + 1}</span>
            <span className="text-sm text-on-surface flex-1 truncate">{entry.name}</span>
            <div className="h-1.5 w-16 rounded-full bg-white/8 overflow-hidden flex-shrink-0">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(entry.value / max) * 100}%` }} />
            </div>
            <span className="text-xs text-on-surface-variant/70 w-8 text-right flex-shrink-0">{entry.value}</span>
          </div>
        ))}
      </div>
    </GlassCard>
  )
}

export function AnalyticsSection() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid md:grid-cols-2 gap-6">
        <GlassCard className="p-6">
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-4">User Growth</h3>
          <SimpleBarChart data={USER_GROWTH} tint="primary" />
        </GlassCard>
        <GlassCard className="p-6">
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-4">Sessions Completed</h3>
          <SimpleBarChart data={SESSIONS_CHART} tint="tertiary" />
        </GlassCard>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <RankedList title="Top Skills" entries={TOP_SKILLS} />
        <RankedList title="Most Active Teachers" entries={MOST_ACTIVE_TEACHERS} />
        <RankedList title="Most Active Learners" entries={MOST_ACTIVE_LEARNERS} />
      </div>

      <GlassCard className="p-6">
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-5">Platform Engagement</h3>
        <div className="flex flex-wrap justify-around gap-8">
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={PLATFORM_ENGAGEMENT.weeklyActiveRate} size={96} strokeWidth={8} tint="primary" label={`${PLATFORM_ENGAGEMENT.weeklyActiveRate}%`} />
            <span className="text-xs text-on-surface-variant text-center">Weekly Active Users</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <CircularProgress value={PLATFORM_ENGAGEMENT.sessionCompletionRate} size={96} strokeWidth={8} tint="tertiary" label={`${PLATFORM_ENGAGEMENT.sessionCompletionRate}%`} />
            <span className="text-xs text-on-surface-variant text-center">Session Completion Rate</span>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}
