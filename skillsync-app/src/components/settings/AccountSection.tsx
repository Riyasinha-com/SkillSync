import { Mail, User } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'

export interface AccountSettingsData {
  name: string
  email: string
}

export function AccountSection({
  account,
  onChange,
  onSave,
  saving,
}: {
  account: AccountSettingsData
  onChange: (account: AccountSettingsData) => void
  onSave: () => void
  saving: boolean
}) {
  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="p-6 flex flex-col gap-5">
        <h3 className="font-display font-semibold text-on-surface">
          Account Details
        </h3>

        <Input
          label="Email"
          type="email"
          icon={<Mail className="w-4 h-4" />}
          value={account.email}
          disabled
        />

        <Input
          label="Name"
          icon={<User className="w-4 h-4" />}
          value={account.name}
          onChange={(e) =>
            onChange({ ...account, name: e.target.value })
          }
          disabled={saving}
        />

        <Button
          variant="magical"
          size="sm"
          className="w-fit"
          onClick={onSave}
          loading={saving}
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </Button>
      </GlassCard>
    </div>
  )
}