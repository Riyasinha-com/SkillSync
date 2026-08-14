import { useState, type KeyboardEvent } from 'react'
import { X, Plus } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'

export function TagInput({
  label,
  values,
  onChange,
  placeholder,
}: {
  label: string
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
}) {
  const [draft, setDraft] = useState('')

  function addTag() {
    const trimmed = draft.trim()
    if (trimmed && !values.includes(trimmed)) {
      onChange([...values, trimmed])
    }
    setDraft('')
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault()
      addTag()
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-on-surface-variant">{label}</label>
      <div className="flex flex-wrap gap-2">
        {values.map((tag) => (
          <Badge key={tag} variant="primary" size="sm" className="normal-case font-body gap-1.5 pr-2">
            {tag}
            <button
              type="button"
              onClick={() => onChange(values.filter((v) => v !== tag))}
              aria-label={`Remove ${tag}`}
              className="hover:text-error"
            >
              <X className="w-3 h-3" />
            </button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder ?? 'Type and press Enter…'}
          className="flex-1 rounded-xl bg-white/[0.04] border border-white/10 px-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
        />
        <button
          type="button"
          onClick={addTag}
          className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary flex-shrink-0"
          aria-label="Add"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
