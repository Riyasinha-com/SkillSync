import { Flame } from 'lucide-react'

export function TrendingSkillsRow({ skills }: { skills: string[] }) {
  return (
    <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none">
      {skills.map((skill, i) => (
        <div
          key={skill}
          className="flex-shrink-0 flex items-center gap-2 px-5 py-3 rounded-2xl glass-panel glass-hover cursor-pointer"
        >
          <span className="text-xs font-mono-label text-on-surface-variant/50">
            {String(i + 1).padStart(2, '0')}
          </span>
          <span className="text-sm font-medium text-on-surface whitespace-nowrap">{skill}</span>
          {i < 3 && <Flame className="w-3.5 h-3.5 text-tertiary" />}
        </div>
      ))}
    </div>
  )
}
