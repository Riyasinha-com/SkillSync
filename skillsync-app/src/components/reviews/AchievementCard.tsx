import {
  Sparkles, Flame, Star, Zap, HeartHandshake, ShieldCheck, Trophy, GraduationCap, Crown,
  type LucideIcon,
} from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'
import type { AchievementItem } from '@/data/reviewsMock'

const ICONS: Record<AchievementItem['icon'], LucideIcon> = {
  sparkles: Sparkles,
  flame: Flame,
  star: Star,
  zap: Zap,
  'heart-handshake': HeartHandshake,
  'shield-check': ShieldCheck,
  trophy: Trophy,
  'graduation-cap': GraduationCap,
  crown: Crown,
}

export function AchievementCard({ achievement }: { achievement: AchievementItem }) {
  const Icon = ICONS[achievement.icon]
  return (
    <GlassCard interactive className="p-5 flex items-start gap-4">
      <div
        className={cn(
          'w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 border transition-all duration-300',
          achievement.unlocked
            ? 'bg-gradient-to-br from-primary-container to-secondary-container border-primary/30 shadow-[0_0_20px_rgba(124,77,255,0.3)]'
            : 'bg-white/[0.03] border-white/8 opacity-50'
        )}
      >
        <Icon className={cn('w-5 h-5', achievement.unlocked ? 'text-on-primary-container' : 'text-on-surface-variant')} />
      </div>
      <div className="min-w-0">
        <h4 className={cn('font-display font-semibold', achievement.unlocked ? 'text-on-surface' : 'text-on-surface-variant')}>
          {achievement.label}
        </h4>
        <p className="text-xs text-on-surface-variant leading-relaxed mt-1">{achievement.description}</p>
        <p className="text-[11px] text-on-surface-variant/50 mt-2">
          {achievement.unlocked ? `Unlocked ${achievement.unlockedDate}` : 'Locked'}
        </p>
      </div>
    </GlassCard>
  )
}
