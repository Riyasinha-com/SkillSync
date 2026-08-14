import { GlassCard } from '@/components/ui/GlassCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { LearningGoal } from '@/data/dashboardMock'

export function LearningGoalCard({ goal }: { goal: LearningGoal }) {
  return (
    <GlassCard interactive className="p-5">
      <div className="flex items-center justify-between mb-3">
        <h4 className="font-display font-semibold text-on-surface">{goal.name}</h4>
        <span className="text-xs font-mono-label text-secondary">{goal.progress}%</span>
      </div>
      <ProgressBar value={goal.progress} tint="secondary" />
    </GlassCard>
  )
}
