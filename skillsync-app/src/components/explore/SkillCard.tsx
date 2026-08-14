import { ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"
import { GlassCard } from "@/components/ui/GlassCard"
import { Badge } from "@/components/ui/Badge"

interface SkillCardProps {
  skill: {
    id: string
    name: string
    category: string
    level: string
    teacher: string
    experience: string
  }
}

export function SkillCard({
  skill,
}: SkillCardProps) {
  return (
    <GlassCard
      interactive
      className="p-6 flex flex-col gap-4"
    >
      <div className="flex items-center justify-between">
        <Badge
          variant="neutral"
          size="sm"
        >
          {skill.category}
        </Badge>

        <Badge
          variant="primary"
          size="sm"
        >
          {skill.level}
        </Badge>
      </div>

      <div>
        <h3 className="font-display font-semibold text-on-surface">
          {skill.name}
        </h3>

        <p className="text-sm text-on-surface-variant mt-2">
          Teacher: {skill.teacher}
        </p>

        <p className="text-xs text-on-surface-variant">
          {skill.experience}
        </p>
      </div>

      <Link
  to={`/skills/${skill.id}`}
  className="mt-auto flex items-center gap-2 text-primary font-medium"
>
  Explore
  <ArrowRight className="w-4 h-4" />
</Link>
    </GlassCard>
  )
}