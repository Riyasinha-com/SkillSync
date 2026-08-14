import { cn } from '@/lib/utils'

export interface CircularProgressProps {
  value: number
  max?: number
  size?: number
  strokeWidth?: number
  tint?: 'primary' | 'tertiary' | 'secondary'
  label?: string
  sublabel?: string
  className?: string
}

const TINT_COLORS: Record<string, string> = {
  primary: 'var(--color-primary)',
  tertiary: 'var(--color-tertiary)',
  secondary: 'var(--color-secondary)',
}

export function CircularProgress({
  value,
  max = 100,
  size = 96,
  strokeWidth = 8,
  tint = 'primary',
  label,
  sublabel,
  className,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const pct = Math.max(0, Math.min(1, value / max))
  const offset = circumference * (1 - pct)

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={TINT_COLORS[tint]}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {label && <span className="font-display font-bold text-on-surface" style={{ fontSize: size * 0.22 }}>{label}</span>}
        {sublabel && <span className="text-on-surface-variant" style={{ fontSize: size * 0.1 }}>{sublabel}</span>}
      </div>
    </div>
  )
}
