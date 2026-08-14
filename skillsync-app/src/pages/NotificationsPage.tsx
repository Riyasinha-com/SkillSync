import { useEffect, useMemo, useState } from 'react'
import { BellOff, CheckCheck } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { FilterChip } from '@/components/explore/FilterChip'
import { NotificationItem } from '@/components/notifications/NotificationItem'
import { type NotificationEntry, type NotificationType } from '@/data/notificationsMock'
import api from '@/api/api'

type ReadFilter = 'all' | 'unread' | 'read'

type ApiNotification = {
  _id: string
  user: string
  type: NotificationType
  title: string
  message: string
  read: boolean
  link?: string
  createdAt: string
  updatedAt: string
}

function getTimeAgo(dateString: string) {
  const created = new Date(dateString)
  const now = new Date()

  const diffMs = now.getTime() - created.getTime()
  const diffMinutes = Math.floor(diffMs / (1000 * 60))

  if (diffMinutes < 1) return 'just now'
  if (diffMinutes < 60) {
    return `${diffMinutes}m ago`
  }

  const diffHours = Math.floor(diffMinutes / 60)

  if (diffHours < 24) {
    return `${diffHours}h ago`
  }

  const diffDays = Math.floor(diffHours / 24)

  if (diffDays < 7) {
    return `${diffDays}d ago`
  }

  return created.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'short',
    year: created.getFullYear() !== now.getFullYear() ? 'numeric' : undefined,
  })
}

function mapNotification(notification: ApiNotification): NotificationEntry {
  return {
    id: notification._id,
    type: notification.type,
    title: notification.title,
    body: notification.message,
    read: notification.read,
    timeAgo: getTimeAgo(notification.createdAt),
    link: notification.link,
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationEntry[]>([])
  const [filter, setFilter] = useState<ReadFilter>('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchNotifications() {
      try {
        setLoading(true)
        setError(null)

        const response = await api.get<ApiNotification[]>('/notifications')

        setNotifications(response.data.map(mapNotification))
      } catch (requestError: any) {
        console.error('Unable to load notifications:', requestError)

        setError(
          requestError.response?.data?.message ||
          'Unable to load notifications. Please try again.'
        )
      } finally {
        setLoading(false)
      }
    }

    void fetchNotifications()
  }, [])

  const unreadCount = notifications.filter((n) => !n.read).length

  const filtered = useMemo(() => {
    if (filter === 'unread') {
      return notifications.filter((n) => !n.read)
    }

    if (filter === 'read') {
      return notifications.filter((n) => n.read)
    }

    return notifications
  }, [notifications, filter])

  async function markRead(id: string) {
    try {
      await api.put(`/notifications/${id}/read`)

      setNotifications((list) =>
        list.map((n) =>
          n.id === id
            ? { ...n, read: true }
            : n
        )
      )
    } catch (requestError: any) {
      console.error('Unable to mark notification as read:', requestError)

      setError(
        requestError.response?.data?.message ||
        'Unable to mark notification as read.'
      )
    }
  }

  async function markAllRead() {
    try {
      await api.put('/notifications/read-all')

      setNotifications((list) =>
        list.map((n) => ({
          ...n,
          read: true,
        }))
      )
    } catch (requestError: any) {
      console.error('Unable to mark notifications as read:', requestError)

      setError(
        requestError.response?.data?.message ||
        'Unable to mark notifications as read.'
      )
    }
  }

  async function deleteNotification(id: string) {
    try {
      await api.delete(`/notifications/${id}`)

      setNotifications((list) =>
        list.filter((n) => n.id !== id)
      )
    } catch (requestError: any) {
      console.error('Unable to delete notification:', requestError)

      setError(
        requestError.response?.data?.message ||
        'Unable to delete notification.'
      )
    }
  }

  return (
    <div className="flex flex-col gap-8 max-w-3xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
            Notifications
          </h1>

          <p className="text-on-surface-variant">
            {loading
              ? 'Loading notifications...'
              : unreadCount > 0
                ? `${unreadCount} unread notification${unreadCount === 1 ? '' : 's'}`
                : 'You’re all caught up.'}
          </p>
        </div>

        {!loading && unreadCount > 0 && (
          <Button
            variant="glass"
            size="sm"
            onClick={markAllRead}
          >
            <CheckCheck className="w-4 h-4" />
            Mark all read
          </Button>
        )}
      </div>

      {error && (
        <GlassCard className="p-4 text-sm text-error">
          {error}
        </GlassCard>
      )}

      <div className="flex flex-wrap gap-2">
        <FilterChip
          active={filter === 'all'}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </FilterChip>

        <FilterChip
          active={filter === 'unread'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </FilterChip>

        <FilterChip
          active={filter === 'read'}
          onClick={() => setFilter('read')}
        >
          Read ({notifications.length - unreadCount})
        </FilterChip>
      </div>

      {loading ? (
        <GlassCard className="p-12 flex flex-col items-center text-center gap-3">
          <p className="text-sm text-on-surface-variant">
            Loading your notifications...
          </p>
        </GlassCard>
      ) : filtered.length === 0 ? (
        <GlassCard className="p-12 flex flex-col items-center text-center gap-3">
          <div className="w-14 h-14 rounded-full bg-white/[0.04] flex items-center justify-center">
            <BellOff className="w-6 h-6 text-on-surface-variant/60" />
          </div>

          <p className="text-sm text-on-surface-variant">
            {notifications.length === 0
              ? 'No notifications yet.'
              : 'No notifications match this filter.'}
          </p>
        </GlassCard>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={markRead}
              onDelete={deleteNotification}
            />
          ))}
        </div>
      )}
    </div>
  )
}