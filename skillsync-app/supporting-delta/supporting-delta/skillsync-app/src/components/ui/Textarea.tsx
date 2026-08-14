import * as React from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    const areaId = id ?? props.name
    return (
      <div className="flex flex-col gap-2 text-left">
        {label && (
          <label htmlFor={areaId} className="text-sm font-medium text-on-surface-variant">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            'w-full rounded-xl bg-white/[0.04] border border-white/10 text-on-surface placeholder:text-on-surface-variant/50',
            'px-4 py-3 text-sm transition-all duration-200 resize-none',
            'focus:outline-none focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15',
            error && 'border-error/60 focus:border-error/60 focus:ring-error/15',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            className
          )}
          aria-invalid={!!error}
          {...props}
        />
        {error && <p className="text-xs text-error">{error}</p>}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'
