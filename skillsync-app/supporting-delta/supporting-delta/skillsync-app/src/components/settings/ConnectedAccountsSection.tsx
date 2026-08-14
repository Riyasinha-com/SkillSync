import { Globe, FolderGit2, Check } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import type { ConnectedAccounts } from '@/data/settingsMock'

const PROVIDERS: { key: keyof ConnectedAccounts; label: string; icon: typeof Globe }[] = [
  { key: 'google', label: 'Google', icon: Globe },
  { key: 'github', label: 'GitHub', icon: FolderGit2 },
]

export function ConnectedAccountsSection({
  accounts,
  onChange,
}: {
  accounts: ConnectedAccounts
  onChange: (accounts: ConnectedAccounts) => void
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-4 divide-y divide-white/6">
      {PROVIDERS.map((provider, i) => {
        const connected = accounts[provider.key]
        return (
          <div key={provider.key} className={`flex items-center justify-between gap-4 ${i > 0 ? 'pt-4' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <provider.icon className="w-4 h-4 text-on-surface-variant" />
              </div>
              <div>
                <p className="text-sm font-medium text-on-surface">{provider.label}</p>
                {connected && (
                  <Badge variant="tertiary" size="sm" className="normal-case font-body gap-1 mt-1">
                    <Check className="w-3 h-3" />
                    Connected
                  </Badge>
                )}
              </div>
            </div>
            <Button
              variant={connected ? 'outline' : 'glass'}
              size="sm"
              onClick={() => onChange({ ...accounts, [provider.key]: !connected })}
            >
              {connected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        )
      })}
    </GlassCard>
  )
}
