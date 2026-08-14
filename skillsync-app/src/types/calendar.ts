import type { MeetingPlatform } from '@/data/profileMock'

export type SessionRole = 'Teacher' | 'Learner'
export type SessionStatus = 'accepted' | 'pending' | 'completed' | 'cancelled'

export interface ScheduledSession {
  id: string
  partnerName: string
  role: SessionRole
  skill: string
  date: string
  dateLabel: string
  time: string
  durationMins: number
  platform: MeetingPlatform
  meetLink: string
  status: SessionStatus
  startsAt?: string
  requestedDate?: string
}
