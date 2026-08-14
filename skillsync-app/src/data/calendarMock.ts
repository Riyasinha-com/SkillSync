import type { MeetingPlatform } from '@/data/profileMock'

export type SessionRole = 'Teacher' | 'Learner'
export type SessionStatus = 'accepted' | 'pending' | 'completed' | 'cancelled'

export interface ScheduledSession {
  id: string
  partnerName: string
  role: SessionRole
  skill: string
  /** ISO date, e.g. "2026-08-03" — used to place the session on the calendar grid */
  date: string
  dateLabel: string
  time: string
  durationMins: number
  platform: MeetingPlatform
  meetLink: string
  status: SessionStatus
  /** Full ISO datetime, used only for the nearest upcoming session's countdown */
  startsAt?: string
  requestedDate?: string
}

export const SCHEDULED_SESSIONS: ScheduledSession[] = [
  {
    id: 'sc1', partnerName: 'Sarah Kim', role: 'Learner', skill: 'Figma fundamentals',
    date: '2026-07-30', dateLabel: 'Thu, 30 Jul', time: '6:00 PM', durationMins: 60,
    platform: 'Google Meet', meetLink: 'meet.skillsync.app/sarah-alex', status: 'accepted',
    startsAt: new Date(Date.now() + 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'sc2', partnerName: 'Marcus Lee', role: 'Learner', skill: 'Guitar basics',
    date: '2026-08-02', dateLabel: 'Sun, 2 Aug', time: '11:00 AM', durationMins: 45,
    platform: 'Zoom', meetLink: 'zoom.us/j/skillsync-marcus', status: 'accepted',
  },
  {
    id: 'sc3', partnerName: 'Daniel Osei', role: 'Teacher', skill: 'Python fundamentals',
    date: '2026-08-05', dateLabel: 'Wed, 5 Aug', time: '7:00 PM', durationMins: 60,
    platform: 'Google Meet', meetLink: 'meet.skillsync.app/daniel-alex', status: 'accepted',
  },
  {
    id: 'sc4', partnerName: 'Emma Laurent', role: 'Teacher', skill: 'Photography basics',
    date: '2026-08-08', dateLabel: 'Sat, 8 Aug', time: '3:00 PM', durationMins: 60,
    platform: 'Other', meetLink: 'skillsync.app/room/emma-alex', status: 'pending',
    requestedDate: 'Jul 27, 2026',
  },
  {
    id: 'sc5', partnerName: 'Kenji Watanabe', role: 'Learner', skill: 'Excel formulas',
    date: '2026-08-10', dateLabel: 'Mon, 10 Aug', time: '9:00 AM', durationMins: 30,
    platform: 'Zoom', meetLink: 'zoom.us/j/skillsync-kenji', status: 'pending',
    requestedDate: 'Jul 28, 2026',
  },
  {
    id: 'sc6', partnerName: 'Riya Patel', role: 'Learner', skill: 'Conversational Spanish',
    date: '2026-07-22', dateLabel: 'Wed, 22 Jul', time: '5:00 PM', durationMins: 60,
    platform: 'Google Meet', meetLink: '', status: 'completed',
  },
  {
    id: 'sc7', partnerName: 'Priya Menon', role: 'Teacher', skill: 'Public speaking',
    date: '2026-07-18', dateLabel: 'Sat, 18 Jul', time: '4:00 PM', durationMins: 45,
    platform: 'Zoom', meetLink: '', status: 'cancelled',
  },
]

export const TIME_SLOT_OPTIONS = [
  '9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM',
  '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM',
] as const
