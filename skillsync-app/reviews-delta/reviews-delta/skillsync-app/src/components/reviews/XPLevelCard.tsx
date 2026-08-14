import { Zap } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { ProgressBar } from '@/components/ui/ProgressBar'
import type { XP_LEVEL } from '@/data/reviewsMock'

export function XPLevelCard({ data }: { data: typeof XP_LEVEL }) {
  return (
    <GlassCard raised className="p-6 flex flex-col gap-4 relative overflow-hidden">
      <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center flex-shrink-0">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-on-surface">Level {data.level}</p>
          <p className="text-xs text-on-surface-variant">{data.levelLabel}</p>
        </div>
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-on-surface-variant">{data.xp.toLocaleString()} XP total</span>
          <span className="text-xs font-mono-label text-primary">{data.xpIntoLevel}/{data.xpForNextLevel}</span>
        </div>
        <ProgressBar value={data.xpIntoLevel} max={data.xpForNextLevel} tint="primary" />
        <p className="text-[11px] text-on-surface-variant/60 mt-2">
          {data.xpForNextLevel - data.xpIntoLevel} XP to Level {data.level + 1}
        </p>
      </div>
    </GlassCard>
  )
}
