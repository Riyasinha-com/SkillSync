import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function FilterChip({
  active,
  onClick,
  children,
  icon,
}: {
  active: boolean
  onClick: () => void
  children: ReactNode
  icon?: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 border',
        active
          ? 'bg-primary/15 border-primary/40 text-primary shadow-[0_0_16px_rgba(124,77,255,0.25)]'
          : 'bg-white/[0.03] border-white/10 text-on-surface-variant hover:text-on-surface hover:border-white/20'
      )}
    >
      {icon}
      {children}
    </button>
  )
}
