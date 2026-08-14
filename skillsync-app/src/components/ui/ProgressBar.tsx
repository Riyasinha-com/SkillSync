import { cn } from '@/lib/utils'

export interface ProgressBarProps {
  value: number
  max?: number
  tint?: 'primary' | 'tertiary' | 'secondary'
  className?: string
}

const TINTS = {
  primary: 'bg-primary',
  tertiary: 'bg-tertiary',
  secondary: 'bg-secondary',
}

export function ProgressBar({ value, max = 100, tint = 'primary', className }: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100))
  return (
    <div
      className={cn('h-1.5 w-full rounded-full bg-white/8 overflow-hidden', className)}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      <div
        className={cn('h-full rounded-full transition-all duration-700 ease-out', TINTS[tint])}
        style={{ width: `${pct}%` }}
      />
    </div>
  )
}
