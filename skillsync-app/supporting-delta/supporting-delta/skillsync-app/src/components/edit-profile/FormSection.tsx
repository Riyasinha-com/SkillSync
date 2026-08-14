import type { ReactNode } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'

export function FormSection({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <section>
      <h2 className="font-display text-lg font-semibold text-on-surface mb-1">{title}</h2>
      {description && <p className="text-xs text-on-surface-variant mb-4">{description}</p>}
      {!description && <div className="mb-4" />}
      <GlassCard className="p-6 flex flex-col gap-5">{children}</GlassCard>
    </section>
  )
}
