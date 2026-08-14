import { useState } from "react"
import { Pencil, Trash2, FileCheck } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/Badge"
import { CATEGORY_ICONS } from "@/data/exploreMock"

interface ProfileSkill {
  id: string
  name: string
  category: string
  level: string
  years: number
  proof: string
}

interface Props {
  skill: ProfileSkill
  onDelete: (id: string) => void
}

export function ProfileSkillCard({
  skill,
  onDelete,
}: Props) {
  const [removing, setRemoving] = useState(false)

  const Icon =
    CATEGORY_ICONS[
      skill.category as keyof typeof CATEGORY_ICONS
    ]

  return (
    <GlassCard
      interactive
      className={`p-5 flex flex-col gap-4 transition-all duration-300 ${
        removing ? "opacity-0 scale-95" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-primary-container/20 flex items-center justify-center shrink-0">
            {Icon && (
              <Icon className="w-5 h-5 text-primary" />
            )}
          </div>

          <div>
            <h4 className="font-display font-semibold text-on-surface">
              {skill.name}
            </h4>

            <Badge
              variant="primary"
              size="sm"
              className="mt-1"
            >
              {skill.level}
            </Badge>
          </div>
        </div>

        <div className="flex gap-1.5 shrink-0">
          <button
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={() => {
              setRemoving(true)
              setTimeout(() => onDelete(skill.id), 250)
            }}
            className="w-8 h-8 rounded-lg glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-error"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <p className="text-xs text-on-surface-variant">
        {skill.years} {skill.years === 1 ? "year" : "years"} of
        experience
      </p>

      {skill.proof && (
        <div className="flex items-center gap-1.5 text-xs text-tertiary bg-tertiary-container/30 border border-tertiary/20 rounded-lg px-3 py-2">
          <FileCheck className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">
            {skill.proof}
          </span>
        </div>
      )}
    </GlassCard>
  )
}