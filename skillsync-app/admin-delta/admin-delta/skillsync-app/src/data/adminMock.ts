export const PLATFORM_STATS = {
  totalUsers: 8420,
  activeUsers: 3190,
  verifiedTeachers: 1204,
  pendingVerifications: 37,
  activeSessions: 58,
  completedSessions: 24680,
  totalReports: 14,
}

export interface RecentActivityEntry {
  id: string
  name: string
  action: string
  timeAgo: string
}

export const RECENT_ACTIVITY: RecentActivityEntry[] = [
  { id: 'aa1', name: 'Sarah Kim', action: 'was verified as a teacher.', timeAgo: '8m ago' },
  { id: 'aa2', name: 'Marcus Lee', action: 'reported a profile as fake.', timeAgo: '22m ago' },
  { id: 'aa3', name: 'Daniel Osei', action: 'completed a Python swap.', timeAgo: '41m ago' },
  { id: 'aa4', name: 'Riya Patel', action: 'submitted a verification request.', timeAgo: '1h ago' },
  { id: 'aa5', name: 'Kenji Watanabe', action: 'was suspended for a policy violation.', timeAgo: '3h ago' },
]

export type UserStatus = 'active' | 'suspended' | 'banned'
export type UserRole = 'Member' | 'Verified Teacher'

export interface AdminUser {
  id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  joinDate: string
  sessionsCount: number
}

export const ADMIN_USERS: AdminUser[] = [
  { id: 'u1', name: 'Sarah Kim', email: 'sarah.kim@example.com', role: 'Verified Teacher', status: 'active', joinDate: 'Mar 2, 2026', sessionsCount: 41 },
  { id: 'u2', name: 'Marcus Lee', email: 'marcus.lee@example.com', role: 'Member', status: 'active', joinDate: 'Apr 18, 2026', sessionsCount: 12 },
  { id: 'u3', name: 'Riya Patel', email: 'riya.patel@example.com', role: 'Verified Teacher', status: 'active', joinDate: 'Feb 9, 2026', sessionsCount: 63 },
  { id: 'u4', name: 'Daniel Osei', email: 'daniel.osei@example.com', role: 'Verified Teacher', status: 'suspended', joinDate: 'Jan 22, 2026', sessionsCount: 28 },
  { id: 'u5', name: 'Kenji Watanabe', email: 'kenji.w@example.com', role: 'Member', status: 'suspended', joinDate: 'May 30, 2026', sessionsCount: 6 },
  { id: 'u6', name: 'Tomás Ruiz', email: 'tomas.ruiz@example.com', role: 'Member', status: 'banned', joinDate: 'Dec 1, 2025', sessionsCount: 3 },
  { id: 'u7', name: 'Emma Laurent', email: 'emma.laurent@example.com', role: 'Verified Teacher', status: 'active', joinDate: 'Mar 28, 2026', sessionsCount: 35 },
]

export type VerificationStatus = 'pending' | 'approved' | 'rejected'

export interface VerificationRequest {
  id: string
  userName: string
  skill: string
  proofFileName: string
  submittedDate: string
  status: VerificationStatus
}

export const VERIFICATION_REQUESTS: VerificationRequest[] = [
  { id: 'vr1', userName: 'Priya Menon', skill: 'Public Speaking', proofFileName: 'toastmasters-certificate.pdf', submittedDate: 'Jul 27, 2026', status: 'pending' },
  { id: 'vr2', userName: 'Tomás Ruiz', skill: 'Spanish', proofFileName: 'delE-c1-certificate.pdf', submittedDate: 'Jul 26, 2026', status: 'pending' },
  { id: 'vr3', userName: 'Kenji Watanabe', skill: 'Excel', proofFileName: 'microsoft-excel-expert.pdf', submittedDate: 'Jul 24, 2026', status: 'pending' },
  { id: 'vr4', userName: 'Emma Laurent', skill: 'Photography', proofFileName: 'portfolio-link.pdf', submittedDate: 'Jul 20, 2026', status: 'approved' },
  { id: 'vr5', userName: 'Marcus Lee', skill: 'Guitar', proofFileName: 'performance-reel.mp4', submittedDate: 'Jul 18, 2026', status: 'rejected' },
]

export type ReportType = 'Abuse' | 'Spam' | 'Fake Profile' | 'Review Dispute'
export type ReportStatus = 'open' | 'resolved'

export interface Report {
  id: string
  type: ReportType
  reportedUser: string
  reporterName: string
  description: string
  date: string
  status: ReportStatus
}

export const REPORTS: Report[] = [
  { id: 'rp1', type: 'Fake Profile', reportedUser: 'Tomás Ruiz', reporterName: 'Marcus Lee', description: 'Profile photo appears to be stock imagery, no verifiable identity.', date: 'Jul 28, 2026', status: 'open' },
  { id: 'rp2', type: 'Abuse', reportedUser: 'Kenji Watanabe', reporterName: 'Riya Patel', description: 'Sent unwelcome messages outside of scheduled sessions.', date: 'Jul 27, 2026', status: 'open' },
  { id: 'rp3', type: 'Spam', reportedUser: 'Daniel Osei', reporterName: 'Sarah Kim', description: 'Repeatedly promoting an external paid course in chat.', date: 'Jul 25, 2026', status: 'open' },
  { id: 'rp4', type: 'Review Dispute', reportedUser: 'Emma Laurent', reporterName: 'Priya Menon', description: 'Believes a 2-star review was left in retaliation for a cancelled session.', date: 'Jul 21, 2026', status: 'resolved' },
]

export type AdminSessionStatus = 'ongoing' | 'upcoming' | 'cancelled' | 'completed'

export interface AdminSession {
  id: string
  teacherName: string
  learnerName: string
  skill: string
  date: string
  time: string
  status: AdminSessionStatus
}

export const ADMIN_SESSIONS: AdminSession[] = [
  { id: 'as1', teacherName: 'Sarah Kim', learnerName: 'Alex Rivera', skill: 'Figma fundamentals', date: 'Today', time: '2:00 PM', status: 'ongoing' },
  { id: 'as2', teacherName: 'Riya Patel', learnerName: 'Marcus Lee', skill: 'Spanish basics', date: 'Today', time: '3:30 PM', status: 'ongoing' },
  { id: 'as3', teacherName: 'Daniel Osei', learnerName: 'Alex Rivera', skill: 'Python fundamentals', date: 'Aug 5, 2026', time: '7:00 PM', status: 'upcoming' },
  { id: 'as4', teacherName: 'Emma Laurent', learnerName: 'Kenji Watanabe', skill: 'Photography basics', date: 'Aug 8, 2026', time: '3:00 PM', status: 'upcoming' },
  { id: 'as5', teacherName: 'Priya Menon', learnerName: 'Tomás Ruiz', skill: 'Public speaking', date: 'Jul 18, 2026', time: '4:00 PM', status: 'cancelled' },
  { id: 'as6', teacherName: 'Sarah Kim', learnerName: 'Riya Patel', skill: 'UI Design', date: 'Jul 22, 2026', time: '5:00 PM', status: 'completed' },
]

export interface ModerationReview {
  id: string
  reviewerName: string
  targetUser: string
  rating: number
  comment: string
  date: string
  flagged: boolean
  deleted: boolean
}

export const MODERATION_REVIEWS: ModerationReview[] = [
  { id: 'mr1', reviewerName: 'Marcus Lee', targetUser: 'Kenji Watanabe', rating: 1, comment: 'Never showed up and didn\u2019t respond to messages.', date: 'Jul 27, 2026', flagged: true, deleted: false },
  { id: 'mr2', reviewerName: 'Tomás Ruiz', targetUser: 'Daniel Osei', rating: 2, comment: 'This teacher clearly just wants to sell an external course.', date: 'Jul 25, 2026', flagged: true, deleted: false },
  { id: 'mr3', reviewerName: 'Sarah Kim', targetUser: 'Riya Patel', rating: 5, comment: 'Wonderful, patient teacher — highly recommend.', date: 'Jul 23, 2026', flagged: false, deleted: false },
  { id: 'mr4', reviewerName: 'Priya Menon', targetUser: 'Emma Laurent', rating: 5, comment: 'Learned so much about composition in just one session.', date: 'Jul 21, 2026', flagged: false, deleted: false },
]

export interface MonthlyPoint {
  label: string
  value: number
}

export const USER_GROWTH: MonthlyPoint[] = [
  { label: 'Feb', value: 5200 }, { label: 'Mar', value: 5900 }, { label: 'Apr', value: 6450 },
  { label: 'May', value: 7100 }, { label: 'Jun', value: 7800 }, { label: 'Jul', value: 8420 },
]

export const SESSIONS_CHART: MonthlyPoint[] = [
  { label: 'Feb', value: 1420 }, { label: 'Mar', value: 1680 }, { label: 'Apr', value: 1950 },
  { label: 'May', value: 2210 }, { label: 'Jun', value: 2540 }, { label: 'Jul', value: 2890 },
]

export interface RankedEntry {
  name: string
  value: number
}

export const TOP_SKILLS: RankedEntry[] = [
  { name: 'React', value: 892 }, { name: 'Excel', value: 611 }, { name: 'UI Design', value: 540 },
  { name: 'Spanish', value: 430 }, { name: 'Guitar', value: 320 },
]

export const MOST_ACTIVE_TEACHERS: RankedEntry[] = [
  { name: 'Sarah Kim', value: 41 }, { name: 'Riya Patel', value: 38 }, { name: 'Emma Laurent', value: 29 },
]

export const MOST_ACTIVE_LEARNERS: RankedEntry[] = [
  { name: 'Alex Rivera', value: 34 }, { name: 'Marcus Lee', value: 27 }, { name: 'Tomás Ruiz', value: 19 },
]

export const PLATFORM_ENGAGEMENT = {
  weeklyActiveRate: 68,
  sessionCompletionRate: 91,
}
