import { FilterChip } from '@/components/explore/FilterChip'
import { TIME_SLOT_OPTIONS } from '@/data/calendarMock'

export function TimeSlotPicker({
  selected,
  onSelect,
}: {
  selected: string | null
  onSelect: (slot: string) => void
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {TIME_SLOT_OPTIONS.map((slot) => (
        <FilterChip key={slot} active={selected === slot} onClick={() => onSelect(slot)}>
          {slot}
        </FilterChip>
      ))}
    </div>
  )
}
