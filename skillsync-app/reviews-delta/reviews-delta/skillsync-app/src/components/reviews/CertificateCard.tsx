import { Award } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import type { Certificate } from '@/data/reviewsMock'

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <GlassCard interactive className="p-6 flex flex-col items-center text-center gap-3 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-tertiary/5 via-transparent to-primary/5 pointer-events-none" />
      <div className="relative z-10 w-14 h-14 rounded-full bg-tertiary-container/40 border border-tertiary/25 flex items-center justify-center">
        <Award className="w-6 h-6 text-tertiary" />
      </div>
      <div className="relative z-10">
        <h4 className="font-display font-semibold text-on-surface text-sm mb-1">{certificate.title}</h4>
        <p className="text-[11px] text-on-surface-variant/70">Issued {certificate.issuedDate}</p>
      </div>
    </GlassCard>
  )
}
