import { GlassCard } from '@/components/ui/GlassCard'
import { Switch } from '@/components/ui/Switch'
import type { NotificationPrefs } from '@/data/settingsMock'

const ROWS: { key: keyof NotificationPrefs; label: string; description: string }[] = [
  { key: 'email', label: 'Email notifications', description: 'Get emailed about matches, messages and sessions.' },
  { key: 'push', label: 'Push notifications', description: 'Get notified on this device in real time.' },
  { key: 'sessionReminders', label: 'Session reminders', description: 'A heads-up before your scheduled sessions start.' },
  { key: 'matchAlerts', label: 'Match alerts', description: 'Know as soon as someone matches with you.' },
  { key: 'weeklyDigest', label: 'Weekly digest', description: 'A weekly summary of your activity and new skills.' },
]

export function NotificationSettingsSection({
  prefs,
  onChange,
}: {
  prefs: NotificationPrefs
  onChange: (prefs: NotificationPrefs) => void
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-5 divide-y divide-white/6">
      {ROWS.map((row, i) => (
        <div key={row.key} className={i > 0 ? 'pt-5' : ''}>
          <Switch
            checked={prefs[row.key]}
            onChange={(checked) => onChange({ ...prefs, [row.key]: checked })}
            label={row.label}
            description={row.description}
          />
        </div>
      ))}
    </GlassCard>
  )
}
