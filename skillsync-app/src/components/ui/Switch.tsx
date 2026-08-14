import { cn } from '@/lib/utils'

export interface SwitchProps {
  checked: boolean
  onChange: (checked: boolean) => void
  label?: string
  description?: string
  disabled?: boolean
}

export function Switch({ checked, onChange, label, description, disabled }: SwitchProps) {
  return (
    <label className={cn('flex items-center justify-between gap-4 cursor-pointer', disabled && 'opacity-50 cursor-not-allowed')}>
      {(label || description) && (
        <span className="min-w-0">
          {label && <span className="block text-sm text-on-surface">{label}</span>}
          {description && <span className="block text-xs text-on-surface-variant mt-0.5">{description}</span>}
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative flex-shrink-0 w-11 h-6 rounded-full transition-colors duration-200 border',
          checked ? 'bg-primary-container border-primary/40' : 'bg-white/10 border-white/15'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-white transition-transform duration-200 shadow-sm',
            checked && 'translate-x-5'
          )}
        />
      </button>
    </label>
  )
}
