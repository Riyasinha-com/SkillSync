import { useEffect, useMemo, useState } from 'react'
import { AdminProfileBar } from '@/components/admin/AdminProfileBar'
import { AdminTabs, type AdminTab } from '@/components/admin/AdminTabs'
import { OverviewSection } from '@/components/admin/OverviewSection'
import { UserManagementSection } from '@/components/admin/UserManagementSection'
import { SkillVerificationSection } from '@/components/admin/SkillVerificationSection'
import { ReportsSection } from '@/components/admin/ReportsSection'
import { SessionMonitoringSection } from '@/components/admin/SessionMonitoringSection'
import { ReviewsModerationSection } from '@/components/admin/ReviewsModerationSection'
import { AnalyticsSection } from '@/components/admin/AnalyticsSection'
import api from '@/api/api'

import {
  PLATFORM_STATS,
  RECENT_ACTIVITY,
  REPORTS,
  type AdminUser,
  type UserStatus,
  type VerificationRequest,
  type Report,
  type ModerationReview,
  type AdminSession,
} from '@/data/adminMock'


export default function AdminPage() {

  const currentUser = useMemo(() => {
    try {
      const storedUser = localStorage.getItem('user')
      return storedUser ? JSON.parse(storedUser) : null
    } catch {
      return null
    }
  }, [])

  const [tab, setTab] = useState<AdminTab>('overview')

  const [users, setUsers] = useState<AdminUser[]>([])
  const [requests, setRequests] = useState<VerificationRequest[]>([])
  const [reports, setReports] = useState<Report[]>(REPORTS)
  const [reviews, setReviews] = useState<ModerationReview[]>([])
const [sessions, setSessions] = useState<AdminSession[]>([])

const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // ==========================
  // Load Users
  // ==========================
  const loadUsers = async () => {
    try {
      const { data } = await api.get('/admin/users')

      const mappedUsers: AdminUser[] = data.map((user: any) => ({
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.profilePic || '',
        status: user.isSuspended ? 'suspended' : 'active',
        joinedDate: new Date(user.createdAt).toLocaleDateString(),
      }))

      setUsers(mappedUsers)
    } catch (err: any) {
      console.error('Failed to load users:', err)
      throw err
    }
  }

  // ==========================
  // Load Skills
  // ==========================
  const loadSkills = async () => {
    try {
      const { data } = await api.get('/admin/skills')

      const mappedRequests: VerificationRequest[] = data.map(
        (skill: any) => ({
          id: skill._id,
          userName: skill.owner?.name || 'SkillSync User',
          userAvatar: '',
          skill: skill.title,
          category: skill.category,
          level: skill.level,
          proofUrl: skill.proofUrl || '',
          submittedDate: new Date(skill.createdAt).toLocaleDateString(),
          status: skill.verified ? 'approved' : 'pending',
        })
      )

      setRequests(mappedRequests)
    } catch (err: any) {
      console.error('Failed to load skills:', err)
      throw err
    }
  }

  // ==========================
  // Load Reviews
  // ==========================
  const loadReviews = async () => {
    try {
      const { data } = await api.get('/admin/reviews')

      const mappedReviews: ModerationReview[] = data.map(
        (review: any) => ({
          id: review._id,
          reviewerName: review.reviewer?.name || 'SkillSync User',
          revieweeName: review.reviewee?.name || 'SkillSync User',
          rating: review.rating,
          comment: review.comment || '',
          date: new Date(review.createdAt).toLocaleDateString(),
          flagged: false,
          deleted: false,
        })
      )

      setReviews(mappedReviews)
    } catch (err: any) {
      console.error('Failed to load reviews:', err)
      throw err
    }
  }

  // ==========================
// Load Sessions
// ==========================
const loadSessions = async () => {
  try {
    const { data } = await api.get('/admin/sessions')

    const mappedSessions: AdminSession[] = data.map(
      (session: any) => ({
        id: session._id,
        teacherName: session.teacher?.name || 'SkillSync User',
        learnerName: session.learner?.name || 'SkillSync User',
        skill:
          session.match?.senderSkill?.title ||
          session.match?.receiverSkill?.title ||
          'Skill session',
        date: new Date(session.scheduledDate).toLocaleDateString(),
        time: `${session.startTime} - ${session.endTime}`,
        status:
          session.status === 'Completed'
            ? 'completed'
            : session.status === 'Cancelled'
              ? 'cancelled'
              : 'upcoming',
      })
    )

    setSessions(mappedSessions)
  } catch (err: any) {
    console.error('Failed to load sessions:', err)
    throw err
  }
}

  // ==========================
  // Initial Admin Data
  // ==========================
  useEffect(() => {
    const loadAdminData = async () => {
      setLoading(true)
      setError(null)

      try {
        await Promise.all([
  loadUsers(),
  loadSkills(),
  loadReviews(),
  loadSessions(),
])
      } catch (err: any) {
        setError(
          err.response?.data?.message ||
          'Unable to load admin data.'
        )
      } finally {
        setLoading(false)
      }
    }

    void loadAdminData()
  }, [])

  // ==========================
  // User Status
  // ==========================
  async function handleUserStatusChange(
    id: string,
    status: UserStatus
  ) {
    try {
      const isSuspended = status === 'suspended'

      await api.patch(`/admin/users/${id}/status`, {
        isSuspended,
      })

      setUsers((list) =>
        list.map((user) =>
          user.id === id
            ? { ...user, status }
            : user
        )
      )
    } catch (err: any) {
      console.error(err)

      alert(
        err.response?.data?.message ||
        'Failed to update user status.'
      )
    }
  }

  // ==========================
  // Delete User
  // ==========================
  async function handleUserDelete(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to permanently delete this user?'
    )

    if (!confirmed) return

    try {
      await api.delete(`/admin/users/${id}`)

      setUsers((list) =>
        list.filter((user) => user.id !== id)
      )
    } catch (err: any) {
      console.error(err)

      alert(
        err.response?.data?.message ||
        'Failed to delete user.'
      )
    }
  }

  // ==========================
  // Skill Approval
  // ==========================
  async function handleApprove(id: string) {
    try {
      await api.patch(`/admin/skills/${id}/verification`, {
        verified: true,
      })

      setRequests((list) =>
        list.map((request) =>
          request.id === id
            ? { ...request, status: 'approved' }
            : request
        )
      )
    } catch (err: any) {
      console.error(err)

      alert(
        err.response?.data?.message ||
        'Failed to approve skill.'
      )
    }
  }

  // ==========================
  // Skill Rejection
  // ==========================
  async function handleReject(id: string) {
    try {
      await api.patch(`/admin/skills/${id}/verification`, {
        verified: false,
      })

      setRequests((list) =>
        list.map((request) =>
          request.id === id
            ? { ...request, status: 'rejected' }
            : request
        )
      )
    } catch (err: any) {
      console.error(err)

      alert(
        err.response?.data?.message ||
        'Failed to reject skill.'
      )
    }
  }

  // ==========================
  // Resolve Report
  // ==========================
  function handleResolveReport(id: string) {
    setReports((list) =>
      list.map((report) =>
        report.id === id
          ? { ...report, status: 'resolved' }
          : report
      )
    )
  }

  // ==========================
  // Delete Review
  // ==========================
  async function handleDeleteReview(id: string) {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    )

    if (!confirmed) return

    try {
      await api.delete(`/admin/reviews/${id}`)

      setReviews((list) =>
        list.filter((review) => review.id !== id)
      )
    } catch (err: any) {
      console.error(err)

      alert(
        err.response?.data?.message ||
        'Failed to delete review.'
      )
    }
  }

  // ==========================
  // Restore Review
  // ==========================
  function handleRestoreReview(id: string) {
    // Reviews do not currently have a deleted field
    // in the backend schema, so restoration is not
    // supported by the current API.
    setReviews((list) =>
      list.map((review) =>
        review.id === id
          ? { ...review, deleted: false }
          : review
      )
    )
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">
          Admin Panel
        </h1>

        <p className="text-on-surface-variant">
          Platform statistics, moderation and oversight for SkillSync.
        </p>
      </div>

      <AdminProfileBar name={currentUser?.name || 'Admin'} />

      <AdminTabs value={tab} onChange={setTab} />

      {loading && (
        <div className="text-sm text-on-surface-variant">
          Loading admin data...
        </div>
      )}

      {error && (
        <div className="text-sm text-error">
          {error}
        </div>
      )}

      {tab === 'overview' && (
        <OverviewSection
          stats={PLATFORM_STATS}
          activity={RECENT_ACTIVITY}
        />
      )}

      {tab === 'users' && (
        <UserManagementSection
          users={users}
          onStatusChange={handleUserStatusChange}
          onDelete={handleUserDelete}
        />
      )}

      {tab === 'verification' && (
        <SkillVerificationSection
          requests={requests}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      )}

      {tab === 'reports' && (
        <ReportsSection
          reports={reports}
          onResolve={handleResolveReport}
        />
      )}

     {tab === 'sessions' && (
  <SessionMonitoringSection sessions={sessions} />
)}

      {tab === 'reviews' && (
        <ReviewsModerationSection
          reviews={reviews}
          onDelete={handleDeleteReview}
          onRestore={handleRestoreReview}
        />
      )}

      {tab === 'analytics' && (
        <AnalyticsSection />
      )}
    </div>
  )
}