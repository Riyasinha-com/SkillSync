import { Sparkles, Crown, HeartHandshake, Zap, Star, type LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Achievement } from '@/data/dashboardMock'

const ICONS: Record<Achievement['icon'], LucideIcon> = {
  sparkles: Sparkles,
  crown: Crown,
  'heart-handshake': HeartHandshake,
  zap: Zap,
  star: Star,
}

export function AchievementBadge({ achievement }: { achievement: Achievement }) {
  const Icon = ICONS[achievement.icon]
  return (
    <div className="flex flex-col items-center gap-3 text-center w-20">
      <div
        className={cn(
          'w-16 h-16 rounded-2xl flex items-center justify-center border transition-all duration-300',
          achievement.unlocked
            ? 'bg-gradient-to-br from-primary-container to-secondary-container border-primary/30 shadow-[0_0_24px_rgba(124,77,255,0.35)]'
            : 'bg-white/[0.03] border-white/8 opacity-40'
        )}
      >
        <Icon className={cn('w-6 h-6', achievement.unlocked ? 'text-on-primary-container' : 'text-on-surface-variant')} />
      </div>
      <span className="text-xs text-on-surface-variant leading-tight">{achievement.label}</span>
    </div>
  )
}
