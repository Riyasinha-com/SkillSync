import { Link } from 'react-router-dom'
import { Mail, Lock, Bell, Eye, ChevronRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

const ROWS = (email: string, notifications: string, privacy: string) => [
  { icon: Mail, label: 'Email', value: email },
  { icon: Lock, label: 'Password', value: '••••••••' },
  { icon: Bell, label: 'Notifications', value: notifications },
  { icon: Eye, label: 'Privacy', value: privacy },
]

export function AccountSettingsPreview({
  email,
  notifications,
  privacy,
}: {
  email: string
  notifications: string
  privacy: string
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-1">
      {ROWS(email, notifications, privacy).map((row) => (
        <div key={row.label} className="flex items-center gap-3 py-3 border-b border-white/6 last:border-0">
          <row.icon className="w-4 h-4 text-on-surface-variant/60 flex-shrink-0" />
          <span className="text-sm text-on-surface-variant flex-1">{row.label}</span>
          <span className="text-sm text-on-surface">{row.value}</span>
        </div>
      ))}
      <Link to="/settings" className="mt-4">
        <Button variant="glass" size="sm" className="w-full group">
          Manage Account
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Button>
      </Link>
    </GlassCard>
  )
}
