import { useState } from 'react'
import { Lock, Eye, EyeOff } from 'lucide-react'
import { Input, type InputProps } from '@/components/ui/Input'

export function PasswordInput(props: Omit<InputProps, 'type' | 'icon' | 'trailing'>) {
  const [visible, setVisible] = useState(false)
  return (
    <Input
      {...props}
      type={visible ? 'text' : 'password'}
      icon={<Lock className="w-4 h-4" />}
      trailing={
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="text-on-surface-variant/70 hover:text-on-surface transition-colors"
          aria-label={visible ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        </button>
      }
    />
  )
}
