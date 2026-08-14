import * as React from 'react'
import { Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: React.ReactNode
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id ?? props.name
    return (
      <label
        htmlFor={checkboxId}
        className={cn(
          'flex items-start gap-3 cursor-pointer group',
          props.disabled && 'opacity-50 cursor-not-allowed'
        )}
      >
        <span className="relative flex-shrink-0 mt-0.5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            className={cn('peer sr-only', className)}
            {...props}
          />
          <span
            className={cn(
              'flex items-center justify-center w-5 h-5 rounded-md border border-white/20 bg-white/[0.04]',
              'transition-all duration-200',
              'peer-checked:bg-primary-container peer-checked:border-primary-container',
              'peer-focus-visible:ring-2 peer-focus-visible:ring-primary/40'
            )}
          >
            <Check className="w-3.5 h-3.5 text-on-primary opacity-0 peer-checked:opacity-100 scale-90" />
          </span>
        </span>
        {label && <span className="text-sm text-on-surface-variant leading-snug">{label}</span>}
      </label>
    )
  }
)
Checkbox.displayName = 'Checkbox'
