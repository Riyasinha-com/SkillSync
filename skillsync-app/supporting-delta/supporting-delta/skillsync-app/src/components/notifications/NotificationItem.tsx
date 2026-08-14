import { Users2, MessageCircle, CalendarClock, Star, Trophy, Bell, Trash2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'
import type { NotificationEntry, NotificationType } from '@/data/notificationsMock'

const TYPE_ICON: Record<NotificationType, typeof Bell> = {
  match: Users2,
  message: MessageCircle,
  session: CalendarClock,
  review: Star,
  achievement: Trophy,
  system: Bell,
}

const TYPE_TINT: Record<NotificationType, string> = {
  match: 'text-primary bg-primary-container/20',
  message: 'text-secondary bg-secondary-container/40',
  session: 'text-tertiary bg-tertiary-container/50',
  review: 'text-tertiary bg-tertiary-container/50',
  achievement: 'text-primary bg-primary-container/20',
  system: 'text-on-surface-variant bg-white/[0.04]',
}

export function NotificationItem({
  notification,
  onMarkRead,
  onDelete,
}: {
  notification: NotificationEntry
  onMarkRead: (id: string) => void
  onDelete: (id: string) => void
}) {
  const Icon = TYPE_ICON[notification.type]

  return (
    <GlassCard
      className={cn(
        'p-4 flex items-start gap-4 cursor-pointer transition-all duration-200',
        !notification.read && 'border-primary/25 bg-primary/[0.03]'
      )}
      onClick={() => !notification.read && onMarkRead(notification.id)}
    >
      <div className={cn('w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0', TYPE_TINT[notification.type])}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-on-surface truncate">{notification.title}</p>
          {!notification.read && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5 leading-relaxed">{notification.body}</p>
        <p className="text-[11px] text-on-surface-variant/50 mt-1.5">{notification.timeAgo}</p>
      </div>
      <button
        onClick={(e) => { e.stopPropagation(); onDelete(notification.id) }}
        className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant/60 hover:text-error hover:bg-error/10 flex-shrink-0"
        aria-label="Delete notification"
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </GlassCard>
  )
}
