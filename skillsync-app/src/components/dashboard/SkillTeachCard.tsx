import { Pencil } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import type { TeachSkill } from '@/data/dashboardMock'

interface Props {
  skill: TeachSkill
  onEdit?: () => void
}

export function SkillTeachCard({
  skill,
  onEdit,
}: Props) {
  return (
    <GlassCard
      interactive
      className="p-5 flex items-center justify-between gap-4"
    >
      <div>
        <div className="flex items-center gap-2 mb-2">
          <h4 className="font-display font-semibold text-on-surface">
            {skill.name}
          </h4>

          <Badge variant="primary" size="sm">
            {skill.level}
          </Badge>
        </div>

        <p className="text-xs text-on-surface-variant">
          {skill.experience}
        </p>
      </div>

      <button
        onClick={onEdit}
        className="w-9 h-9 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary flex-shrink-0"
        aria-label={`Edit ${skill.name}`}
      >
        <Pencil className="w-4 h-4" />
      </button>
    </GlassCard>
  )
}