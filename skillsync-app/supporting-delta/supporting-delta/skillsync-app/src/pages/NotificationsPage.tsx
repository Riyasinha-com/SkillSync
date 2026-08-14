import { useMemo, useState } from 'react'
import { BellOff, CheckCheck } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { FilterChip } from '@/components/explore/FilterChip'
import { NotificationItem } from '@/components/notifications/NotificationItem'
import { NOTIFICATIONS, type NotificationEntry } from '@/data/notificationsMock'

type ReadFilter = 'all' | 'unread' | 'read'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationEntry[]>(NOTIFICATIONS)
  const [filter, setFilter] = useState<ReadFilter>('all')

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = useMemo(() => {
    if (filter === 'unread') return notifications.filter((n) => !n.read)
    if (filter === 'read') return notifications.filter((n) => n.read)
    return notifications
  }, [notifications, filter])

  function markRead(id: string) {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }
  function markAllRead() {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }
  function deleteNotification(id: string) {
    setNotifications((list) => list.filter((n) => n.id !== id))
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">Notifications</h1>
          <p className="text-on-surface-variant">
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}` : 'You\u2019re all caught up.'}
          </p>
        </div>
        {unreadCount > 0 && (
          <Button variant="glass" size="sm" onClick={markAllRead}>
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>
          All ({notifications.length})
        </FilterChip>
        <FilterChip active={filter === 'unread'} onClick={() => setFilter('unread')}>
          Unread ({unreadCount})
        </FilterChip>
        <FilterChip active={filter === 'read'} onClick={() => setFilter('read')}>
          Read ({notifications.length - unreadCount})
        </FilterChip>
      </div>

      {filtered.length === 0 ? (
        <GlassCard className="p-12 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/[0.04] flex items-center justify-center">
            <BellOff className="w-6 h-6 text-on-surface-variant/60" />
          </div>
          <p className="text-sm text-on-surface-variant">
            {notifications.length === 0 ? 'No notifications yet.' : 'No notifications match this filter.'}
          </p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((n) => (
            <NotificationItem key={n.id} notification={n} onMarkRead={markRead} onDelete={deleteNotification} />
          ))}
        </div>
      )}
    </div>
  )
}
