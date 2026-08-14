import type { LucideIcon } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

const TINTS: Record<string, string> = {
  primary: 'text-primary bg-primary-container/20',
  secondary: 'text-secondary bg-secondary-container/40',
  tertiary: 'text-tertiary bg-tertiary-container/50',
  error: 'text-error bg-error-container/20',
}

export function StatCard({
  label,
  value,
  icon: Icon,
  tint,
}: {
  label: string
  value: string
  icon: LucideIcon
  tint: 'primary' | 'secondary' | 'tertiary' | 'error'
}) {
  return (
    <GlassCard interactive className="p-5 flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${TINTS[tint]}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div className="min-w-0">
        <p className="font-display text-2xl font-bold text-on-surface leading-none mb-1">{value}</p>
        <p className="text-xs text-on-surface-variant truncate">{label}</p>
      </div>
    </GlassCard>
  )
}
