import { Plus, Trash2, Link2 } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import type { PortfolioLink } from '@/data/editProfileMock'

let nextId = 2000

export function PortfolioLinksInput({
  links,
  onChange,
}: {
  links: PortfolioLink[]
  onChange: (links: PortfolioLink[]) => void
}) {
  function update(id: string, patch: Partial<PortfolioLink>) {
    onChange(links.map((l) => (l.id === id ? { ...l, ...patch } : l)))
  }
  function remove(id: string) {
    onChange(links.filter((l) => l.id !== id))
  }
  function add() {
    onChange([...links, { id: `pf-${nextId++}`, title: '', url: '' }])
  }

  return (
    <div className="flex flex-col gap-3">
      {links.map((link) => (
        <div key={link.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-end">
          <Input
            label="Title"
            value={link.title}
            onChange={(e) => update(link.id, { title: e.target.value })}
            placeholder="React Dashboard Project"
            className="flex-1"
          />
          <Input
            label="URL"
            icon={<Link2 className="w-4 h-4" />}
            value={link.url}
            onChange={(e) => update(link.id, { url: e.target.value })}
            placeholder="github.com/you/project"
            className="flex-[1.5]"
          />
          <button
            type="button"
            onClick={() => remove(link.id)}
            className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-error flex-shrink-0"
            aria-label="Remove portfolio link"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      <Button variant="glass" size="sm" className="w-fit" onClick={add}>
        <Plus className="w-4 h-4" />
        Add Portfolio Link
      </Button>
    </div>
  )
}
