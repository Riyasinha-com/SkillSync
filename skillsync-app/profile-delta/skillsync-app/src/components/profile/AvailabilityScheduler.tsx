import { Video } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { FilterChip } from '@/components/explore/FilterChip'
import { TIMEZONES } from '@/data/exploreMock'
import {
  WEEK_DAYS, TIME_SLOTS,
  type AvailabilityState, type MeetingPlatform,
} from '@/data/profileMock'

const PLATFORMS: MeetingPlatform[] = ['Google Meet', 'Zoom', 'Other']

function toggle<T>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function AvailabilityScheduler({
  availability,
  onChange,
}: {
  availability: AvailabilityState
  onChange: (a: AvailabilityState) => void
}) {
  return (
    <GlassCard className="p-6 flex flex-col gap-6">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Available Days</h3>
        <div className="flex flex-wrap gap-2">
          {WEEK_DAYS.map((day) => (
            <FilterChip
              key={day}
              active={availability.days.includes(day)}
              onClick={() => onChange({ ...availability, days: toggle(availability.days, day) })}
            >
              {day}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Time Slots</h3>
        <div className="flex flex-wrap gap-2">
          {TIME_SLOTS.map((slot) => (
            <FilterChip
              key={slot}
              active={availability.slots.includes(slot)}
              onClick={() => onChange({ ...availability, slots: toggle(availability.slots, slot) })}
            >
              {slot}
            </FilterChip>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 pt-2 border-t border-white/8">
        <label className="flex flex-col gap-2">
          <span className="text-xs text-on-surface-variant">Timezone</span>
          <select
            value={availability.timezone}
            onChange={(e) => onChange({ ...availability, timezone: e.target.value })}
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-on-surface focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/15 transition-all [&>option]:bg-surface-container"
          >
            {TIMEZONES.map((tz) => (
              <option key={tz} value={tz}>
                {tz}
              </option>
            ))}
          </select>
        </label>

        <div className="flex flex-col gap-2">
          <span className="text-xs text-on-surface-variant flex items-center gap-1.5">
            <Video className="w-3.5 h-3.5" />
            Preferred meeting platform
          </span>
          <div className="flex flex-wrap gap-2">
            {PLATFORMS.map((platform) => (
              <FilterChip
                key={platform}
                active={availability.platform === platform}
                onClick={() => onChange({ ...availability, platform })}
              >
                {platform}
              </FilterChip>
            ))}
          </div>
        </div>
      </div>
    </GlassCard>
  )
}
