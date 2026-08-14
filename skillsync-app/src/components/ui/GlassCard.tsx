import * as React from 'react'
import { cn } from '@/lib/utils'

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Elevated variant used for modals / popovers / featured content */
  raised?: boolean
  /** Applies the lift + border glow hover interaction */
  interactive?: boolean
  as?: React.ElementType
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, raised, interactive, as: Comp = 'div', ...props }, ref) => {
    return (
      <Comp
        ref={ref}
        className={cn(
          'rounded-2xl',
          raised ? 'glass-panel-raised' : 'glass-panel',
          interactive && 'glass-hover',
          className
        )}
        {...props}
      />
    )
  }
)
GlassCard.displayName = 'GlassCard'
