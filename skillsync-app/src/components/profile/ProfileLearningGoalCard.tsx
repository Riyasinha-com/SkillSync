import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { CATEGORY_ICONS } from '@/data/exploreMock'
import type { ProfileLearningGoal, Priority } from '@/data/profileMock'

const PRIORITY_VARIANT: Record<Priority, 'primary' | 'secondary' | 'neutral'> = {
  High: 'primary',
  Medium: 'secondary',
  Low: 'neutral',
}

export function ProfileLearningGoalCard({ goal }: { goal: ProfileLearningGoal }) {
  const Icon = CATEGORY_ICONS[goal.category]

  return (
    <GlassCard interactive className="p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-secondary-container/40 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-secondary" />
          </div>
          <h4 className="font-display font-semibold text-on-surface">{goal.name}</h4>
        </div>
        <Badge variant={PRIORITY_VARIANT[goal.priority]} size="sm" className="normal-case font-body">
          {goal.priority} priority
        </Badge>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-on-surface-variant">Progress</span>
          <span className="text-xs font-mono-label text-secondary">{goal.progress}%</span>
        </div>
        <ProgressBar value={goal.progress} tint="secondary" />
      </div>

      <p className="text-xs text-on-surface-variant">
        Preferred method: <span className="text-on-surface">{goal.method}</span>
      </p>
    </GlassCard>
  )
}
