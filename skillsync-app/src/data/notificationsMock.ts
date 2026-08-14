export type NotificationType = 'match' | 'message' | 'session' | 'review' | 'achievement' | 'system'

export interface NotificationEntry {
  id: string
  type: NotificationType
  title: string
  body: string
  timeAgo: string
  read: boolean
  link?: string
}

export const NOTIFICATIONS: NotificationEntry[] = [
  { id: 'n1', type: 'match', title: 'New mutual match', body: 'Sarah Kim wants to swap Figma for React with you.', timeAgo: '5m ago', read: false },
  { id: 'n2', type: 'message', title: 'New message', body: 'Riya Patel: "Buenos días! Ready when you are"', timeAgo: '32m ago', read: false },
  { id: 'n3', type: 'session', title: 'Session starting soon', body: 'Your Figma fundamentals session with Sarah Kim starts in 2 hours.', timeAgo: '1h ago', read: false },
  { id: 'n4', type: 'review', title: 'New review', body: 'Daniel Osei left you a 5-star review for Excel.', timeAgo: '3h ago', read: true },
  { id: 'n5', type: 'achievement', title: 'Achievement unlocked', body: 'You earned the "Top Rated" badge.', timeAgo: '1d ago', read: true },
  { id: 'n6', type: 'system', title: 'Verification approved', body: 'Your teacher verification for React was approved.', timeAgo: '2d ago', read: true },
  { id: 'n7', type: 'session', title: 'Session cancelled', body: 'Priya Menon cancelled your public speaking session.', timeAgo: '3d ago', read: true },
  { id: 'n8', type: 'match', title: 'New mutual match', body: 'Daniel Osei wants to swap Python for Photography with you.', timeAgo: '4d ago', read: true },
]
