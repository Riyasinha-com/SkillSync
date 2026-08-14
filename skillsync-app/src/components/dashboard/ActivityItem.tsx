import { Avatar } from '@/components/ui/Avatar'
import type { ActivityEntry } from '@/data/dashboardMock'

export function ActivityItem({ entry }: { entry: ActivityEntry }) {
  return (
    <div className="flex items-center gap-3 py-3 border-b border-white/6 last:border-0">
      <Avatar name={entry.name} size="sm" />
      <p className="text-sm text-on-surface-variant min-w-0">
        <span className="text-on-surface font-medium">{entry.name}</span> {entry.action}
      </p>
      <span className="text-[11px] text-on-surface-variant/60 ml-auto flex-shrink-0">{entry.timeAgo}</span>
    </div>
  )
}
