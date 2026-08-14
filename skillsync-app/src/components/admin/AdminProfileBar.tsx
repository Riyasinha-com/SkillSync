import { Link } from 'react-router-dom'
import { ShieldCheck, Settings, LogOut } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export function AdminProfileBar({ name }: { name: string }) {
  return (
    <GlassCard raised className="p-5 flex flex-wrap items-center gap-4">
      <Avatar name={name} size="md" status="online" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="font-display font-semibold text-on-surface truncate">{name}</h2>
          <Badge variant="tertiary" size="sm" className="normal-case font-body gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Administrator
          </Badge>
        </div>
        <p className="text-xs text-on-surface-variant mt-0.5">Platform administration & moderation</p>
      </div>
      <div className="flex gap-2">
        <Link to="/settings">
          <Button variant="glass" size="sm">
            <Settings className="w-4 h-4" />
            Account Settings
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="outline" size="sm">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Link>
      </div>
    </GlassCard>
  )
}
