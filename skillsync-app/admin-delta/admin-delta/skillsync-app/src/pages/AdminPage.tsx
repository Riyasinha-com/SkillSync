import { useState } from 'react'
import { AdminProfileBar } from '@/components/admin/AdminProfileBar'
import { AdminTabs, type AdminTab } from '@/components/admin/AdminTabs'
import { OverviewSection } from '@/components/admin/OverviewSection'
import { UserManagementSection } from '@/components/admin/UserManagementSection'
import { SkillVerificationSection } from '@/components/admin/SkillVerificationSection'
import { ReportsSection } from '@/components/admin/ReportsSection'
import { SessionMonitoringSection } from '@/components/admin/SessionMonitoringSection'
import { ReviewsModerationSection } from '@/components/admin/ReviewsModerationSection'
import { AnalyticsSection } from '@/components/admin/AnalyticsSection'
import {
  PLATFORM_STATS, RECENT_ACTIVITY, ADMIN_USERS, VERIFICATION_REQUESTS, REPORTS,
  ADMIN_SESSIONS, MODERATION_REVIEWS,
  type AdminUser, type UserStatus, type VerificationRequest, type Report, type ModerationReview,
} from '@/data/adminMock'

export default function AdminPage() {
  const [tab, setTab] = useState<AdminTab>('overview')
  const [users, setUsers] = useState<AdminUser[]>(ADMIN_USERS)
  const [requests, setRequests] = useState<VerificationRequest[]>(VERIFICATION_REQUESTS)
  const [reports, setReports] = useState<Report[]>(REPORTS)
  const [reviews, setReviews] = useState<ModerationReview[]>(MODERATION_REVIEWS)

  function handleUserStatusChange(id: string, status: UserStatus) {
    setUsers((list) => list.map((u) => (u.id === id ? { ...u, status } : u)))
  }
  function handleUserDelete(id: string) {
    setUsers((list) => list.filter((u) => u.id !== id))
  }
  function handleApprove(id: string) {
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status: 'approved' } : r)))
  }
  function handleReject(id: string) {
    setRequests((list) => list.map((r) => (r.id === id ? { ...r, status: 'rejected' } : r)))
  }
  function handleResolveReport(id: string) {
    setReports((list) => list.map((r) => (r.id === id ? { ...r, status: 'resolved' } : r)))
  }
  function handleDeleteReview(id: string) {
    setReviews((list) => list.map((r) => (r.id === id ? { ...r, deleted: true } : r)))
  }
  function handleRestoreReview(id: string) {
    setReviews((list) => list.map((r) => (r.id === id ? { ...r, deleted: false } : r)))
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">Admin Panel</h1>
        <p className="text-on-surface-variant">
          Platform statistics, moderation and oversight for SkillSync.
        </p>
      </div>

      <AdminProfileBar name="Jordan Ellis" />

      <AdminTabs value={tab} onChange={setTab} />

      {tab === 'overview' && <OverviewSection stats={PLATFORM_STATS} activity={RECENT_ACTIVITY} />}
      {tab === 'users' && (
        <UserManagementSection users={users} onStatusChange={handleUserStatusChange} onDelete={handleUserDelete} />
      )}
      {tab === 'verification' && (
        <SkillVerificationSection requests={requests} onApprove={handleApprove} onReject={handleReject} />
      )}
      {tab === 'reports' && <ReportsSection reports={reports} onResolve={handleResolveReport} />}
      {tab === 'sessions' && <SessionMonitoringSection sessions={ADMIN_SESSIONS} />}
      {tab === 'reviews' && (
        <ReviewsModerationSection reviews={reviews} onDelete={handleDeleteReview} onRestore={handleRestoreReview} />
      )}
      {tab === 'analytics' && <AnalyticsSection />}
    </div>
  )
}
