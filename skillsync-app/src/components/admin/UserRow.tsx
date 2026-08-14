import { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserCog, Ban, ShieldOff, RotateCcw, Trash2 } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { AdminUser, UserStatus } from '@/data/adminMock'

const STATUS_VARIANT: Record<UserStatus, 'primary' | 'secondary' | 'neutral'> = {
  active: 'primary',
  suspended: 'secondary',
  banned: 'neutral',
}

export function UserRow({
  user,
  onStatusChange,
  onDelete,
}: {
  user: AdminUser
  onStatusChange: (id: string, status: UserStatus) => void
  onDelete: (id: string) => void
}) {
  const [confirmingDelete, setConfirmingDelete] = useState(false)

  return (
    <GlassCard className="p-5 flex flex-wrap items-center gap-4">
      <Avatar name={user.name} size="sm" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-sm font-medium text-on-surface truncate">{user.name}</p>
          <Badge variant={user.role === 'Verified Teacher' ? 'tertiary' : 'neutral'} size="sm" className="normal-case font-body">
            {user.role}
          </Badge>
          <Badge variant={STATUS_VARIANT[user.status]} size="sm" className="normal-case font-body">
            {user.status}
          </Badge>
        </div>
        <p className="text-xs text-on-surface-variant/70 mt-0.5 truncate">
          {user.email} · Joined {user.joinDate} · {user.sessionsCount} sessions
        </p>
      </div>

      {confirmingDelete ? (
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-on-surface-variant">Delete this account?</span>
          <Button variant="outline" size="sm" onClick={() => { onDelete(user.id); setConfirmingDelete(false) }}>
            Confirm
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setConfirmingDelete(false)}>
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex items-center gap-1.5 flex-shrink-0 flex-wrap">
          <Link to={`/profile?u=${user.id}`}>
            <Button variant="glass" size="sm">
              <UserCog className="w-3.5 h-3.5" />
              View
            </Button>
          </Link>
          {user.status !== 'suspended' && user.status !== 'banned' && (
            <Button variant="outline" size="sm" onClick={() => onStatusChange(user.id, 'suspended')}>
              <ShieldOff className="w-3.5 h-3.5" />
              Suspend
            </Button>
          )}
          {user.status !== 'banned' && (
            <Button variant="outline" size="sm" onClick={() => onStatusChange(user.id, 'banned')}>
              <Ban className="w-3.5 h-3.5" />
              Ban
            </Button>
          )}
          {user.status !== 'active' && (
            <Button variant="glass" size="sm" onClick={() => onStatusChange(user.id, 'active')}>
              <RotateCcw className="w-3.5 h-3.5" />
              Restore
            </Button>
          )}
          <Button variant="outline" size="sm" className="hover:border-error/50 hover:text-error" onClick={() => setConfirmingDelete(true)}>
            <Trash2 className="w-3.5 h-3.5" />
            Delete
          </Button>
        </div>
      )}
    </GlassCard>
  )
}
