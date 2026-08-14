export type ReviewRole = 'teacher' | 'learner'

export interface ReviewEntry {
  id: string
  reviewerName: string
  rating: number
  comment: string
  date: string
  role: ReviewRole // the role the reviewer experienced you in
  skill: string
}

export const REVIEWS_DATA: ReviewEntry[] = [
  { id: 'rv1', reviewerName: 'Sarah Kim', rating: 5, comment: 'Alex explained React hooks better than any course I\u2019ve paid for. Endlessly patient.', date: 'Jul 23, 2026', role: 'teacher', skill: 'React' },
  { id: 'rv2', reviewerName: 'Daniel Osei', rating: 5, comment: 'Great Excel session — practical examples, no fluff.', date: 'Jul 11, 2026', role: 'teacher', skill: 'Excel' },
  { id: 'rv3', reviewerName: 'Marcus Lee', rating: 4, comment: 'Solid teaching style, would\u2019ve liked a bit more time on advanced topics.', date: 'Jun 30, 2026', role: 'teacher', skill: 'Excel' },
  { id: 'rv4', reviewerName: 'Riya Patel', rating: 5, comment: 'Picked up conversational basics fast thanks to Alex\u2019s structured approach.', date: 'Jun 18, 2026', role: 'teacher', skill: 'React' },
  { id: 'rv5', reviewerName: 'Emma Laurent', rating: 3, comment: 'Good session overall, ran a little short on time.', date: 'Jun 5, 2026', role: 'teacher', skill: 'Photoshop' },
  { id: 'rv6', reviewerName: 'Priya Menon', rating: 5, comment: 'As a learner, Alex asked great questions and was fully prepared every session.', date: 'Jul 15, 2026', role: 'learner', skill: 'Guitar' },
  { id: 'rv7', reviewerName: 'Kenji Watanabe', rating: 4, comment: 'Attentive learner, picked up Excel formulas quickly.', date: 'Jun 22, 2026', role: 'learner', skill: 'Excel' },
  { id: 'rv8', reviewerName: 'Tomás Ruiz', rating: 2, comment: 'Missed one scheduled session without much notice.', date: 'May 30, 2026', role: 'learner', skill: 'Spanish' },
]

export function ratingBreakdown(reviews: ReviewEntry[]) {
  const counts: Record<1 | 2 | 3 | 4 | 5, number> = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  for (const r of reviews) {
    const bucket = Math.round(r.rating) as 1 | 2 | 3 | 4 | 5
    counts[bucket] = (counts[bucket] ?? 0) + 1
  }
  return counts
}

export function averageRating(reviews: ReviewEntry[]) {
  if (!reviews.length) return 0
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

export type AchievementCategory = 'Skill Milestones' | 'Session Milestones' | 'Community Reputation'

export interface AchievementItem {
  id: string
  label: string
  description: string
  icon: 'sparkles' | 'flame' | 'star' | 'zap' | 'heart-handshake' | 'shield-check' | 'trophy' | 'graduation-cap' | 'crown'
  category: AchievementCategory
  unlocked: boolean
  unlockedDate?: string
}

export const ACHIEVEMENTS_DATA: AchievementItem[] = [
  { id: 'ac1', label: 'First Skill Swap', description: 'Completed your first skill swap session.', icon: 'sparkles', category: 'Skill Milestones', unlocked: true, unlockedDate: 'Apr 2, 2026' },
  { id: 'ac2', label: 'Multi-Skill Teacher', description: 'Teaching 5 or more different skills.', icon: 'graduation-cap', category: 'Skill Milestones', unlocked: true, unlockedDate: 'Jun 10, 2026' },
  { id: 'ac3', label: 'Polyglot Learner', description: 'Learn skills across 5 different categories.', icon: 'star', category: 'Skill Milestones', unlocked: false },
  { id: 'ac4', label: '5 Successful Sessions', description: 'Completed 5 skill swap sessions.', icon: 'flame', category: 'Session Milestones', unlocked: true, unlockedDate: 'May 14, 2026' },
  { id: 'ac5', label: '25 Successful Sessions', description: 'Completed 25 skill swap sessions.', icon: 'trophy', category: 'Session Milestones', unlocked: true, unlockedDate: 'Jul 20, 2026' },
  { id: 'ac6', label: 'Marathon Learner', description: 'Complete 100 hours of learning sessions.', icon: 'zap', category: 'Session Milestones', unlocked: false },
  { id: 'ac7', label: 'Verified Teacher', description: 'Identity and expertise verified by SkillSync.', icon: 'shield-check', category: 'Community Reputation', unlocked: true, unlockedDate: 'Mar 20, 2026' },
  { id: 'ac8', label: 'Top Rated', description: 'Maintained a 4.8+ rating across 20+ reviews.', icon: 'crown', category: 'Community Reputation', unlocked: true, unlockedDate: 'Jul 5, 2026' },
  { id: 'ac9', label: 'Community Helper', description: 'Helped 10 different learners across the platform.', icon: 'heart-handshake', category: 'Community Reputation', unlocked: false },
]

export interface Certificate {
  id: string
  title: string
  skill: string
  issuedDate: string
}

export const CERTIFICATES_DATA: Certificate[] = [
  { id: 'ct1', title: 'React Fundamentals — Peer Verified', skill: 'React', issuedDate: 'Jun 15, 2026' },
  { id: 'ct2', title: 'Excel for Data Analysis — Peer Verified', skill: 'Excel', issuedDate: 'May 2, 2026' },
]

export const XP_LEVEL = {
  xp: 2140,
  level: 6,
  levelLabel: 'Trusted Mentor',
  xpIntoLevel: 340,
  xpForNextLevel: 500,
}

export interface TimelineEvent {
  id: string
  label: string
  date: string
}

export const ACHIEVEMENT_TIMELINE: TimelineEvent[] = [
  { id: 'tl1', label: 'Earned "Top Rated"', date: 'Jul 5, 2026' },
  { id: 'tl2', label: 'Completed 25th session', date: 'Jul 20, 2026' },
  { id: 'tl3', label: 'Reached Level 6 — Trusted Mentor', date: 'Jun 28, 2026' },
  { id: 'tl4', label: 'Became a Multi-Skill Teacher', date: 'Jun 10, 2026' },
  { id: 'tl5', label: 'Completed 5th session', date: 'May 14, 2026' },
  { id: 'tl6', label: 'Verified as a Teacher', date: 'Mar 20, 2026' },
  { id: 'tl7', label: 'First Skill Swap completed', date: 'Apr 2, 2026' },
]
