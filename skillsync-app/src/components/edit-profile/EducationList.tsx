import { Plus, Trash2, GraduationCap } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { EducationEntry } from '@/data/editProfileMock'

let nextId = 1000

export function EducationList({
  entries,
  onChange,
}: {
  entries: EducationEntry[]
  onChange: (entries: EducationEntry[]) => void
}) {
  function update(id: string, patch: Partial<EducationEntry>) {
    onChange(entries.map((e) => (e.id === id ? { ...e, ...patch } : e)))
  }
  function remove(id: string) {
    onChange(entries.filter((e) => e.id !== id))
  }
  function add() {
    onChange([...entries, { id: `edu-${nextId++}`, school: '', degree: '', year: '' }])
  }

  return (
    <div className="flex flex-col gap-4">
      {entries.map((entry) => (
        <div key={entry.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end pb-4 border-b border-white/6 last:border-0 last:pb-0">
          <div className="w-9 h-9 rounded-xl bg-primary-container/20 flex items-center justify-center flex-shrink-0 hidden sm:flex">
            <GraduationCap className="w-4 h-4 text-primary" />
          </div>
          <Input
            label="School"
            value={entry.school}
            onChange={(e) => update(entry.id, { school: e.target.value })}
            placeholder="University of Colorado"
            className="flex-1"
          />
          <Input
            label="Degree / Field"
            value={entry.degree}
            onChange={(e) => update(entry.id, { degree: e.target.value })}
            placeholder="B.S. Computer Science"
            className="flex-1"
          />
          <Input
            label="Year"
            value={entry.year}
            onChange={(e) => update(entry.id, { year: e.target.value })}
            placeholder="2021"
            className="w-full sm:w-24"
          />
          <button
            type="button"
            onClick={() => remove(entry.id)}
            className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-error flex-shrink-0"
            aria-label="Remove education entry"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <Button variant="glass" size="sm" className="w-fit" onClick={add}>
        <Plus className="w-4 h-4" />
        Add Education
      </Button>
    </div>
  )
}
