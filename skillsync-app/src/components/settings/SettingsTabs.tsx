import { User, Palette, Bell, Lock, ShieldCheck, Link2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type SettingsTab = 'account' | 'appearance' | 'notifications' | 'privacy' | 'security' | 'connected'

const TABS: { id: SettingsTab; label: string; icon: typeof User }[] = [
  { id: 'account', label: 'Account', icon: User },
  { id: 'appearance', label: 'Appearance', icon: Palette },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'privacy', label: 'Privacy', icon: ShieldCheck },
  { id: 'security', label: 'Security', icon: Lock },
  { id: 'connected', label: 'Connected Accounts', icon: Link2 },
]

export function SettingsTabs({ value, onChange }: { value: SettingsTab; onChange: (tab: SettingsTab) => void }) {
  return (
    <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible pb-1 lg:pb-0">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 flex-shrink-0',
            value === tab.id
              ? 'bg-primary/12 text-primary border border-primary/20'
              : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 border border-transparent'
          )}
        >
          <tab.icon className="w-[18px] h-[18px]" />
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
