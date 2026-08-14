import { Lightbulb, TrendingUp, Compass } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'

export function DailyTipCard({ tip }: { tip: string }) {
  return (
    <GlassCard raised className="p-6">
      <div className="w-10 h-10 rounded-xl bg-tertiary-container/50 flex items-center justify-center mb-4">
        <Lightbulb className="w-5 h-5 text-tertiary" />
      </div>
      <h3 className="font-display font-semibold text-on-surface mb-2">Daily learning tip</h3>
      <p className="text-sm text-on-surface-variant leading-relaxed">{tip}</p>
    </GlassCard>
  )
}

export function SkillPillsCard({
  title,
  skills,
  variant,
}: {
  title: string
  skills: string[]
  variant: 'recommended' | 'trending'
}) {
  const Icon = variant === 'recommended' ? Compass : TrendingUp
  return (
    <GlassCard className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-on-surface text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill} variant="neutral" size="sm" className="normal-case font-body cursor-pointer hover:border-primary/30 hover:text-primary transition-colors">
            {skill}
          </Badge>
        ))}
      </div>
    </GlassCard>
  )
}
