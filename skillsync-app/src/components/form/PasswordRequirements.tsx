import { Check, X } from 'lucide-react'
import { PASSWORD_RULES } from '@/lib/validation'
import { cn } from '@/lib/utils'

export function PasswordRequirements({ value }: { value: string }) {
  return (
    <ul className="flex flex-col gap-1.5 mt-1">
      {PASSWORD_RULES.map((rule) => {
        const met = value.length > 0 && rule.test(value)
        return (
          <li
            key={rule.id}
            className={cn(
              'flex items-center gap-2 text-xs transition-colors',
              met ? 'text-tertiary' : 'text-on-surface-variant/70'
            )}
          >
            {met ? <Check className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
            {rule.label}
          </li>
        )
      })}
    </ul>
  )
}
