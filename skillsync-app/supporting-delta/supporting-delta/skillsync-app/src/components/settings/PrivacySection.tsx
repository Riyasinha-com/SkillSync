import { GlassCard } from '@/components/ui/GlassCard'
import { Switch } from '@/components/ui/Switch'
import type { PrivacyPrefs } from '@/data/settingsMock'

const ROWS: { key: keyof PrivacyPrefs; label: string; description: string }[] = [
  { key: 'publicProfile', label: 'Public profile', description: 'Let anyone on SkillSync find and view your profile.' },
  { key: 'showOnlineStatus', label: 'Show online status', description: 'Let matches see when you\u2019re active.' },
  { key: 'showRating', label: 'Show rating', description: 'Display your average rating on your public profile.' },
]

export function PrivacySection({
  prefs,
  onChange,
}: {
  prefs: PrivacyPrefs
  onChange: (prefs: PrivacyPrefs) => void
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
