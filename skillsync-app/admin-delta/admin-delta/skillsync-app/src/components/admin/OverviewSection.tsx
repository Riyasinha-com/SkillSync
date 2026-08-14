import { Users, UserCheck, ShieldCheck, Clock, Radio, CheckCircle2, Flag } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { ActivityItem } from '@/components/dashboard/ActivityItem'
import { GlassCard } from '@/components/ui/GlassCard'
import { SectionHeader } from '@/components/dashboard/SectionHeader'
import type { PLATFORM_STATS, RecentActivityEntry } from '@/data/adminMock'

export function OverviewSection({
  stats,
  activity,
}: {
  stats: typeof PLATFORM_STATS
  activity: RecentActivityEntry[]
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} tint="primary" />
        <StatCard label="Active Users" value={stats.activeUsers.toLocaleString()} icon={UserCheck} tint="tertiary" />
        <StatCard label="Verified Teachers" value={stats.verifiedTeachers.toLocaleString()} icon={ShieldCheck} tint="secondary" />
        <StatCard label="Pending Verifications" value={String(stats.pendingVerifications)} icon={Clock} tint="secondary" />
        <StatCard label="Active Sessions" value={String(stats.activeSessions)} icon={Radio} tint="primary" />
        <StatCard label="Completed Sessions" value={stats.completedSessions.toLocaleString()} icon={CheckCircle2} tint="tertiary" />
        <StatCard label="Total Reports" value={String(stats.totalReports)} icon={Flag} tint="error" />
      </div>

      <section>
        <SectionHeader title="Recent Activity" />
        <GlassCard className="p-6">
          {activity.map((entry) => (
            <ActivityItem key={entry.id} entry={entry} />
          ))}
        </GlassCard>
      </section>
    </div>
  )
}
