import { GlassCard } from '@/components/ui/GlassCard'
import { VerificationRequestCard } from '@/components/admin/VerificationRequestCard'
import type { VerificationRequest } from '@/data/adminMock'

export function SkillVerificationSection({
  requests,
  onApprove,
  onReject,
}: {
  requests: VerificationRequest[]
  onApprove: (id: string) => void
  onReject: (id: string) => void
}) {
  const pending = requests.filter((r) => r.status === 'pending')
  const resolved = requests.filter((r) => r.status !== 'pending')

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">
          Pending Requests ({pending.length})
        </h3>
        {pending.length === 0 ? (
          <GlassCard className="p-6 text-sm text-on-surface-variant text-center">
            No pending verification requests.
          </GlassCard>
        ) : (
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {pending.map((r) => (
              <VerificationRequestCard key={r.id} request={r} onApprove={onApprove} onReject={onReject} />
            ))}
          </div>
        )}
      </div>

      {resolved.length > 0 && (
        <div>
          <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-3">Recently Reviewed</h3>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {resolved.map((r) => (
              <VerificationRequestCard key={r.id} request={r} onApprove={onApprove} onReject={onReject} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
