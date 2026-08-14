import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full font-mono-label text-xs font-medium uppercase',
  {
    variants: {
      variant: {
        primary: 'bg-primary/10 text-primary border border-primary/20',
        secondary: 'bg-secondary-container/40 text-secondary border border-secondary/20',
        tertiary: 'bg-tertiary-container/50 text-tertiary border border-tertiary/25',
        neutral: 'bg-white/5 text-on-surface-variant border border-white/10',
      },
      size: {
        sm: 'px-2.5 py-1',
        md: 'px-4 py-1.5',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, size, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, size }), className)} {...props} />
}
