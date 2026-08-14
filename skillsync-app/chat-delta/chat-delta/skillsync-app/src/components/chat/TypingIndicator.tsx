import { Avatar } from '@/components/ui/Avatar'

export function TypingIndicator({ name }: { name: string }) {
  return (
    <div className="flex items-end gap-2">
      <Avatar name={name} size="sm" />
      <div className="glass-panel rounded-2xl rounded-bl-md px-4 py-3 flex items-center gap-1">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-on-surface-variant/60 animate-bounce"
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        ))}
      </div>
    </div>
  )
}
