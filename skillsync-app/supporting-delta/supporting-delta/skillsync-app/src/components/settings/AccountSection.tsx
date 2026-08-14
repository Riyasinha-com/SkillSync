import { Link } from 'react-router-dom'
import { Mail, User, LogOut } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { AccountSettings } from '@/data/settingsMock'

export function AccountSection({
  account,
  onChange,
}: {
  account: AccountSettings
  onChange: (account: AccountSettings) => void
}) {
  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="p-6 flex flex-col gap-5">
        <h3 className="font-display font-semibold text-on-surface">Account Details</h3>
        <Input
          label="Email"
          type="email"
          icon={<Mail className="w-4 h-4" />}
          value={account.email}
          onChange={(e) => onChange({ ...account, email: e.target.value })}
        />
        <Input
          label="Username"
          icon={<User className="w-4 h-4" />}
          value={account.username}
          onChange={(e) => onChange({ ...account, username: e.target.value })}
        />
      </GlassCard>

      <GlassCard className="p-6 flex items-center justify-between gap-4">
        <div>
          <h3 className="font-display font-semibold text-on-surface">Log out</h3>
          <p className="text-xs text-on-surface-variant mt-0.5">Sign out of SkillSync on this device.</p>
        </div>
        <Link to="/login">
          <Button variant="outline" size="sm">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </Link>
      </GlassCard>
    </div>
  )
}
