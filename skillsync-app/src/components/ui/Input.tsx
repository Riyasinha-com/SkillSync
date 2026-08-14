import * as React from 'react'
import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  icon?: React.ReactNode
  /** Rendered inside the field on the right — e.g. a show/hide password toggle */
  trailing?: React.ReactNode
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, trailing, id, ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex flex-col gap-2 text-left">
        {label && (
          <label htmlFor={inputId} className="text-sm font-medium text-on-surface-variant">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <span className="absolute left-4 text-on-surface-variant/70 pointer-events-none">
              {icon}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            className={cn(
              'w-full rounded-xl bg-white/[0.04] border border-white/10 text-on-surface placeholder:text-on-surface-variant/50',
              'px-4 py-3 text-sm transition-all duration-200',
              'focus:outline-none focus:border-primary/60 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15',
              icon && 'pl-11',
              trailing && 'pr-11',
              error && 'border-error/60 focus:border-error/60 focus:ring-error/15',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              className
            )}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />
          {trailing && <span className="absolute right-4">{trailing}</span>}
        </div>
        {error && (
          <p id={`${inputId}-error`} className="text-xs text-error">
            {error}
          </p>
        )}
      </div>
    )
  }
)
Input.displayName = 'Input'
