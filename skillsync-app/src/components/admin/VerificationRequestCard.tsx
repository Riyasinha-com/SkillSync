import { FileCheck, Check, X } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { VerificationRequest, VerificationStatus } from '@/data/adminMock'

const STATUS_VARIANT: Record<VerificationStatus, 'secondary' | 'tertiary' | 'neutral'> = {
  pending: 'secondary',
  approved: 'tertiary',
  rejected: 'neutral',
}

export function VerificationRequestCard({
  request,
  onApprove,
  onReject,
}: {
  request: VerificationRequest
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  return (
    <GlassCard interactive className="p-5 flex flex-col gap-4">
      <div className="flex items-start gap-3">
        <Avatar name={request.userName} size="md" />
        <div className="min-w-0 flex-1">
          <h4 className="font-display font-semibold text-on-surface truncate">{request.userName}</h4>
          <p className="text-xs text-on-surface-variant">wants to teach <span className="text-on-surface">{request.skill}</span></p>
        </div>
        <Badge variant={STATUS_VARIANT[request.status]} size="sm" className="normal-case font-body flex-shrink-0">
          {request.status}
        </Badge>
      </div>

      <button className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-colors text-left">
        <FileCheck className="w-4 h-4 text-primary flex-shrink-0" />
        <span className="text-xs text-on-surface truncate">{request.proofFileName}</span>
      </button>

      <p className="text-[11px] text-on-surface-variant/60">Submitted {request.submittedDate}</p>

      {request.status === 'pending' && (
        <div className="flex gap-2">
          <Button variant="magical" size="sm" className="flex-1" onClick={() => onApprove(request.id)}>
            <Check className="w-4 h-4" />
            Approve
          </Button>
          <Button variant="outline" size="sm" className="flex-1" onClick={() => onReject(request.id)}>
            <X className="w-4 h-4" />
            Reject
          </Button>
        </div>
      )}
    </GlassCard>
  )
}
