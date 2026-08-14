export type MatchStatus = 'pending' | 'accepted' | 'completed'

export interface PersonMatch {
  id: string

  /** The other participant's user id when the match comes from the API. */
  participantUserId?: string

  name: string

  avatar?: string

  rating: number

  matchScore: number

  teaches: string[]

  wants: string[]

  status: MatchStatus

  requestedDate: string

  acceptedDate?: string

  completionDate?: string

  sessionSummary?: string

  youTeachThemWant: string[]

  youLearnFromThem: string[]

  mutualInterests: string[]

  availabilityOverlap: string[]

  raw?: any
}

export const MATCHES: PersonMatch[] = [
  {
    id: 'mt1', name: 'Sarah Kim', rating: 4.9, matchScore: 94, status: 'pending',
    teaches: ['UI Design', 'Figma'], wants: ['React', 'Excel'],
    requestedDate: 'Jul 26, 2026',
    youTeachThemWant: ['React'], youLearnFromThem: ['Figma'],
    mutualInterests: ['Product Design', 'Startups'], availabilityOverlap: ['Wed evenings', 'Sat mornings'],
  },
  {
    id: 'mt2', name: 'Kenji Watanabe', rating: 4.5, matchScore: 76, status: 'pending',
    teaches: ['Excel', 'Business Strategy'], wants: ['English', 'UI Design'],
    requestedDate: 'Jul 25, 2026',
    youTeachThemWant: [], youLearnFromThem: ['Excel'],
    mutualInterests: ['Productivity tools'], availabilityOverlap: ['Sun afternoons'],
  },
  {
    id: 'mt3', name: 'Emma Laurent', rating: 4.7, matchScore: 82, status: 'accepted',
    teaches: ['Photography', 'Video Editing'], wants: ['Public Speaking', 'Excel'],
    requestedDate: 'Jul 20, 2026', acceptedDate: 'Jul 21, 2026',
    youTeachThemWant: ['Excel'], youLearnFromThem: ['Photography'],
    mutualInterests: ['Visual storytelling'], availabilityOverlap: ['Tue evenings', 'Fri evenings'],
  },
  {
    id: 'mt4', name: 'Marcus Lee', rating: 4.8, matchScore: 88, status: 'accepted',
    teaches: ['Guitar', 'Music Theory'], wants: ['Python', 'Photoshop'],
    requestedDate: 'Jul 14, 2026', acceptedDate: 'Jul 15, 2026',
    youTeachThemWant: [], youLearnFromThem: ['Guitar'],
    mutualInterests: ['Live music'], availabilityOverlap: ['Weekends'],
  },
  {
    id: 'mt5', name: 'Riya Patel', rating: 4.6, matchScore: 81, status: 'completed',
    teaches: ['Spanish', 'Public Speaking'], wants: ['Canva', 'React'],
    requestedDate: 'Jun 28, 2026', completionDate: 'Jul 12, 2026',
    sessionSummary: 'Four sessions covering conversational Spanish basics — Riya is now comfortable with everyday phrases.',
    youTeachThemWant: [], youLearnFromThem: ['Spanish'],
    mutualInterests: ['Travel'], availabilityOverlap: ['Mon evenings'],
  },
  {
    id: 'mt6', name: 'Daniel Osei', rating: 5.0, matchScore: 90, status: 'completed',
    teaches: ['Python', 'AI'], wants: ['Photography', 'Guitar'],
    requestedDate: 'Jun 10, 2026', completionDate: 'Jun 30, 2026',
    sessionSummary: 'Three sessions on Python fundamentals and a wrap-up on simple ML models.',
    youTeachThemWant: [], youLearnFromThem: ['Python', 'AI'],
    mutualInterests: ['Machine learning'], availabilityOverlap: ['Thu evenings'],
  },
]

export const MATCH_SUMMARY = {
  pending: MATCHES.filter((m) => m.status === 'pending').length,
  accepted: MATCHES.filter((m) => m.status === 'accepted').length,
  completed: MATCHES.filter((m) => m.status === 'completed').length,
  successRate: 92,
}
