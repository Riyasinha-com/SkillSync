import type { Category } from '@/data/exploreMock'

export interface ProfileInfo {
  name: string
  username: string
  location: string
  timezone: string
  bio: string
  joinDate: string
  verifiedTeacher: boolean
  peerRated: boolean
  rating: number
  reviewCount: number
}

export const PROFILE: ProfileInfo = {
  name: 'Alex Rivera',
  username: '@alexrivera',
  location: 'Denver, USA',
  timezone: 'GMT-7',
  bio: 'Frontend engineer who teaches React and Excel in exchange for design and language practice. Big believer in learning by doing.',
  joinDate: 'March 2024',
  verifiedTeacher: true,
  peerRated: true,
  rating: 4.9,
  reviewCount: 32,
}

export interface ProfileStat {
  label: string
  value: string
}

export const PROFILE_STATS: ProfileStat[] = [
  { label: 'Skills I Teach', value: '5' },
  { label: 'Skills I Want to Learn', value: '5' },
  { label: 'Successful Swaps', value: '28' },
  { label: 'Total Sessions', value: '41' },
  { label: 'Reviews Received', value: '32' },
  { label: 'Learning Streak', value: '14 days' },
]

export type SkillLevel = 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'

export interface ProfileTeachSkill {
  id: string
  name: string
  category: Category
  level: SkillLevel
  years: number
  proof?: string
}

export const PROFILE_TEACH_SKILLS: ProfileTeachSkill[] = [
  { id: 'pt1', name: 'React', category: 'Programming', level: 'Expert', years: 4, proof: 'Portfolio: 6 shipped apps' },
  { id: 'pt2', name: 'Python', category: 'Programming', level: 'Advanced', years: 3 },
  { id: 'pt3', name: 'Photoshop', category: 'Design', level: 'Intermediate', years: 2 },
  { id: 'pt4', name: 'Excel', category: 'Excel', level: 'Advanced', years: 5, proof: 'Microsoft Excel Expert cert.' },
  { id: 'pt5', name: 'Canva', category: 'Design', level: 'Intermediate', years: 1 },
]

export type Priority = 'High' | 'Medium' | 'Low'
export type LearningMethod = '1:1 sessions' | 'Group sessions' | 'Video resources' | 'Practice exercises'

export interface ProfileLearningGoal {
  id: string
  name: string
  category: Category
  priority: Priority
  progress: number
  method: LearningMethod
}

export const PROFILE_LEARNING_GOALS: ProfileLearningGoal[] = [
  { id: 'pl1', name: 'Figma', category: 'Design', priority: 'High', progress: 65, method: '1:1 sessions' },
  { id: 'pl2', name: 'Machine Learning', category: 'AI', priority: 'Medium', progress: 30, method: 'Video resources' },
  { id: 'pl3', name: 'Guitar', category: 'Music', priority: 'Low', progress: 48, method: 'Practice exercises' },
  { id: 'pl4', name: 'Public Speaking', category: 'Soft Skills', priority: 'Medium', progress: 20, method: 'Group sessions' },
  { id: 'pl5', name: 'Spanish', category: 'Languages', priority: 'High', progress: 55, method: '1:1 sessions' },
]

export const WEEK_DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] as const
export const TIME_SLOTS = ['Morning', 'Afternoon', 'Evening', 'Night'] as const
export type MeetingPlatform = 'Google Meet' | 'Zoom' | 'Other'

export interface AvailabilityState {
  days: (typeof WEEK_DAYS)[number][]
  slots: (typeof TIME_SLOTS)[number][]
  timezone: string
  platform: MeetingPlatform
}

export const DEFAULT_AVAILABILITY: AvailabilityState = {
  days: ['Mon', 'Wed', 'Fri', 'Sat'],
  slots: ['Evening'],
  timezone: 'GMT-7',
  platform: 'Google Meet',
}

export type SessionStatus = 'Completed' | 'Upcoming' | 'Cancelled'
export type SessionRole = 'Teacher' | 'Learner'

export interface RecentSession {
  id: string
  partnerName: string
  role: SessionRole
  skill: string
  date: string
  status: SessionStatus
}

export const RECENT_SESSIONS: RecentSession[] = [
  { id: 's1', partnerName: 'Sarah Kim', role: 'Teacher', skill: 'React fundamentals', date: 'Jul 22, 2026', status: 'Completed' },
  { id: 's2', partnerName: 'Marcus Lee', role: 'Learner', skill: 'Guitar basics', date: 'Jul 18, 2026', status: 'Completed' },
  { id: 's3', partnerName: 'Riya Patel', role: 'Teacher', skill: 'Excel formulas', date: 'Jul 30, 2026', status: 'Upcoming' },
  { id: 's4', partnerName: 'Daniel Osei', role: 'Learner', skill: 'Python basics', date: 'Jul 10, 2026', status: 'Cancelled' },
]

export interface Review {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
}

export const REVIEWS: Review[] = [
  { id: 'r1', reviewerName: 'Sarah Kim', rating: 5, comment: 'Alex explained React hooks better than any course I\u2019ve paid for. Endlessly patient.', date: 'Jul 23, 2026' },
  { id: 'r2', reviewerName: 'Daniel Osei', rating: 5, comment: 'Great Excel session — practical examples, no fluff.', date: 'Jul 11, 2026' },
  { id: 'r3', reviewerName: 'Marcus Lee', rating: 4, comment: 'Solid teaching style, would\u2019ve liked a bit more time on advanced topics.', date: 'Jun 30, 2026' },
]

export interface ProfileAchievement {
  id: string
  label: string
  icon: 'shield-check' | 'sparkles' | 'flame' | 'star' | 'zap' | 'heart-handshake'
  unlocked: boolean
}

export const PROFILE_ACHIEVEMENTS: ProfileAchievement[] = [
  { id: 'pa1', label: 'Verified Teacher', icon: 'shield-check', unlocked: true },
  { id: 'pa2', label: 'First Skill Swap', icon: 'sparkles', unlocked: true },
  { id: 'pa3', label: '5 Successful Sessions', icon: 'flame', unlocked: true },
  { id: 'pa4', label: 'Top Rated', icon: 'star', unlocked: true },
  { id: 'pa5', label: 'Fast Learner', icon: 'zap', unlocked: false },
  { id: 'pa6', label: 'Community Helper', icon: 'heart-handshake', unlocked: false },
]

export const ACCOUNT_PREVIEW = {
  email: 'alex.rivera@example.com',
  notifications: 'On',
  privacy: 'Public profile',
}
