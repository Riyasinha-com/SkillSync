import * as React from 'react'
import { AlertCircle, CheckCircle2, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

const VARIANT_STYLES = {
  error: {
    wrap: 'bg-error-container/15 border-error/30 text-error',
    icon: AlertCircle,
  },
  success: {
    wrap: 'bg-tertiary-container/40 border-tertiary/30 text-tertiary',
    icon: CheckCircle2,
  },
  info: {
    wrap: 'bg-primary/10 border-primary/25 text-primary',
    icon: Info,
  },
} as const

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant: keyof typeof VARIANT_STYLES
}

export function Alert({ variant, className, children, ...props }: AlertProps) {
  const { wrap, icon: Icon } = VARIANT_STYLES[variant]
  return (
    <div
      role={variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed',
        wrap,
        className
      )}
      {...props}
    >
      <Icon className="w-4 h-4 mt-0.5 flex-shrink-0" />
      <div className="text-on-surface">{children}</div>
    </div>
  )
}
