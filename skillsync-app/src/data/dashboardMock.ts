import type { LucideIcon } from 'lucide-react'
import { BookOpen, Heart, Users2, CalendarCheck2, Repeat, Star } from 'lucide-react'

export interface QuickStat {
  label: string
  value: string
  icon: LucideIcon
  tint: 'primary' | 'secondary' | 'tertiary' | 'error'
}

export const QUICK_STATS: QuickStat[] = [
  { label: 'Skills You Teach', value: '5', icon: BookOpen, tint: 'primary' },
  { label: 'Skills You Want', value: '5', icon: Heart, tint: 'secondary' },
  { label: 'Mutual Matches', value: '12', icon: Users2, tint: 'tertiary' },
  { label: 'Upcoming Sessions', value: '3', icon: CalendarCheck2, tint: 'primary' },
  { label: 'Completed Swaps', value: '28', icon: Repeat, tint: 'secondary' },
  { label: 'Community Rating', value: '4.9', icon: Star, tint: 'tertiary' },
]

export interface TeachSkill {
  name: string
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert'
  experience: string
}

export const TEACH_SKILLS: TeachSkill[] = [
  { name: 'React', level: 'Expert', experience: '4 yrs experience' },
  { name: 'Python', level: 'Advanced', experience: '3 yrs experience' },
  { name: 'Photoshop', level: 'Intermediate', experience: '2 yrs experience' },
  { name: 'Excel', level: 'Advanced', experience: '5 yrs experience' },
  { name: 'Canva', level: 'Intermediate', experience: '1 yr experience' },
]

export interface LearningGoal {
  name: string
  progress: number
}

export const LEARNING_GOALS: LearningGoal[] = [
  { name: 'Figma', progress: 65 },
  { name: 'Machine Learning', progress: 30 },
  { name: 'Guitar', progress: 48 },
  { name: 'Public Speaking', progress: 20 },
  { name: 'Spanish', progress: 55 },
]

export interface Match {
  id: string
  name: string
  teaches: string[]
  wants: string[]
  matchScore: number
}

export const MATCHES: Match[] = [
  { id: 'm1', name: 'Sarah Kim', teaches: ['Figma', 'UI Design'], wants: ['React', 'Excel'], matchScore: 94 },
  { id: 'm2', name: 'Marcus Lee', teaches: ['Guitar', 'Music Theory'], wants: ['Python', 'Photoshop'], matchScore: 88 },
  { id: 'm3', name: 'Riya Patel', teaches: ['Spanish', 'Public Speaking'], wants: ['Canva', 'React'], matchScore: 81 },
]

export interface UpcomingSession {
  partnerName: string
  skill: string
  date: string
  time: string
  meetLink: string
  startsAt: string // ISO string used to compute the countdown
}

export const UPCOMING_SESSION: UpcomingSession = {
  partnerName: 'Sarah Kim',
  skill: 'Figma fundamentals',
  date: 'Thu, 30 Jul',
  time: '6:00 PM – 7:00 PM',
  meetLink: 'meet.skillsync.app/sarah-alex',
  startsAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
}

export const PROGRESS_STATS = {
  skillsLearned: { value: 7, max: 10 },
  hoursCompleted: { value: 142, max: 200 },
  sessionsFinished: { value: 28, max: 40 },
  achievementProgress: { value: 6, max: 10 },
}

export interface Achievement {
  id: string
  label: string
  icon: 'sparkles' | 'crown' | 'heart-handshake' | 'zap' | 'star'
  unlocked: boolean
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'a1', label: 'First Swap', icon: 'sparkles', unlocked: true },
  { id: 'a2', label: 'Top Mentor', icon: 'crown', unlocked: true },
  { id: 'a3', label: 'Helpful Teacher', icon: 'heart-handshake', unlocked: true },
  { id: 'a4', label: 'Fast Learner', icon: 'zap', unlocked: false },
  { id: 'a5', label: 'Community Star', icon: 'star', unlocked: false },
]

export interface ActivityEntry {
  id: string
  name: string
  action: string
  timeAgo: string
}

export const ACTIVITY_FEED: ActivityEntry[] = [
  { id: 'f1', name: 'Alex', action: 'completed a Python swap.', timeAgo: '12m ago' },
  { id: 'f2', name: 'Sarah', action: 'learned Photoshop.', timeAgo: '48m ago' },
  { id: 'f3', name: 'Riya', action: 'earned the Top Mentor badge.', timeAgo: '2h ago' },
  { id: 'f4', name: 'Marcus', action: 'started learning Excel.', timeAgo: '5h ago' },
]

export const DAILY_TIP =
  'Teaching a skill out loud, even to one person, cements it in your own memory faster than reviewing it alone.'

export const RECOMMENDED_SKILLS = ['UX Writing', 'SQL', 'Watercolor', 'Negotiation']
export const TRENDING_SKILLS = ['Prompt Engineering', 'Figma', 'Public Speaking', 'Excel']
