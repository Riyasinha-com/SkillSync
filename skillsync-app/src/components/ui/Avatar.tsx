import { cn } from '@/lib/utils'

export interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline'
  className?: string
}

const SIZE_MAP = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-11 h-11 text-sm',
  lg: 'w-16 h-16 text-lg',
}

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export function Avatar({ name, src, size = 'md', status, className }: AvatarProps) {
  return (
    <div className={cn('relative flex-shrink-0 cursor-pointer', className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          className={cn('rounded-full object-cover border border-white/10', SIZE_MAP[size])}
        />
      ) : (
        <div
          className={cn(
            'rounded-full flex items-center justify-center font-semibold text-on-primary border border-white/10',
            SIZE_MAP[size]
          )}
          style={{
            background: 'linear-gradient(135deg, var(--color-primary-container), var(--color-secondary-container))',
          }}
        >
          {initials(name)}
        </div>
      )}
      {status && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-surface',
            status === 'online' ? 'bg-tertiary' : 'bg-outline'
          )}
        />
      )}
    </div>
  )
}
