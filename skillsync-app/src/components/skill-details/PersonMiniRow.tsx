import { Link } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import type { Teacher } from '@/data/exploreMock'

export function PersonMiniRow({ person, note }: { person: Teacher; note: string }) {
  return (
    <Link
      to={`/profile?u=${person.id}`}
      className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 transition-colors"
    >
      <Avatar name={person.name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-on-surface truncate">{person.name}</p>
        <p className="text-xs text-on-surface-variant truncate">{note}</p>
      </div>
      <Badge variant="tertiary" size="sm">
        {person.rating}★
      </Badge>
    </Link>
  )
}
