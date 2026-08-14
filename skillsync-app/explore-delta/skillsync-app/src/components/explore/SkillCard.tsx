import { Users, GraduationCap, ArrowRight } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { CATEGORY_ICONS, type FeaturedSkill } from '@/data/exploreMock'

export function SkillCard({ skill }: { skill: FeaturedSkill }) {
  const Icon = CATEGORY_ICONS[skill.category]
  return (
    <GlassCard interactive className="p-6 flex flex-col gap-4">
      <div className="flex items-start justify-between">
        <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <Badge variant="neutral" size="sm" className="normal-case font-body">
          {skill.category}
        </Badge>
      </div>

      <div>
        <h3 className="font-display font-semibold text-on-surface mb-1">{skill.name}</h3>
        <div className="flex items-center gap-4 text-xs text-on-surface-variant">
          <span className="flex items-center gap-1">
            <GraduationCap className="w-3.5 h-3.5" />
            {skill.teacherCount} teachers
          </span>
          <span className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            {skill.learnerCount} learners
          </span>
        </div>
      </div>

      <button className="flex items-center gap-1.5 text-sm font-medium text-primary hover:gap-2.5 transition-all duration-200 mt-auto">
        Explore
        <ArrowRight className="w-4 h-4" />
      </button>
    </GlassCard>
  )
}
