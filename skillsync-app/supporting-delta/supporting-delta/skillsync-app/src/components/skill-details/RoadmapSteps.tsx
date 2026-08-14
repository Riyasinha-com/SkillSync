import { GlassCard } from '@/components/ui/GlassCard'
import type { RoadmapStage } from '@/data/skillDetailsMock'

export function RoadmapSteps({ stages }: { stages: RoadmapStage[] }) {
  return (
    <GlassCard className="p-6">
      <ol className="flex flex-col">
        {stages.map((stage, i) => (
          <li key={stage.id} className="flex gap-4">
            <div className="flex flex-col items-center">
              <span className="w-7 h-7 rounded-full bg-primary-container/25 border border-primary/30 flex items-center justify-center text-xs font-mono-label text-primary flex-shrink-0">
                {i + 1}
              </span>
              {i < stages.length - 1 && <span className="w-px flex-1 bg-white/10 my-1" />}
            </div>
            <div className="pb-6">
              <p className="text-sm font-medium text-on-surface">{stage.title}</p>
              <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{stage.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </GlassCard>
  )
}
