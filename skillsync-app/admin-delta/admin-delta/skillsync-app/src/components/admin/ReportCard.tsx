import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CheckCircle2 } from 'lucide-react'
import type { Report, ReportType } from '@/data/adminMock'

const TYPE_VARIANT: Record<ReportType, 'primary' | 'secondary' | 'tertiary' | 'neutral'> = {
  Abuse: 'primary',
  Spam: 'secondary',
  'Fake Profile': 'neutral',
  'Review Dispute': 'tertiary',
}

export function ReportCard({ report, onResolve }: { report: Report; onResolve: (id: string) => void }) {
  return (
    <GlassCard className="p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2">
        <Badge variant={TYPE_VARIANT[report.type]} size="sm" className="normal-case font-body">
          {report.type}
        </Badge>
        <Badge variant={report.status === 'open' ? 'secondary' : 'tertiary'} size="sm" className="normal-case font-body">
          {report.status}
        </Badge>
      </div>

      <p className="text-sm text-on-surface">
        <span className="font-medium">{report.reportedUser}</span> reported by {report.reporterName}
      </p>
      <p className="text-sm text-on-surface-variant leading-relaxed">{report.description}</p>
      <p className="text-[11px] text-on-surface-variant/60">{report.date}</p>

      {report.status === 'open' && (
        <Button variant="glass" size="sm" className="w-full" onClick={() => onResolve(report.id)}>
          <CheckCircle2 className="w-4 h-4" />
          Resolve Report
        </Button>
      )}
    </GlassCard>
  )
}
