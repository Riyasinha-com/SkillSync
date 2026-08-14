import type { ReactNode } from 'react'

export function SectionHeader({ title, action }: { title: string; action?: ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="font-display text-xl font-semibold text-on-surface">{title}</h2>
      {action}
    </div>
  )
}
