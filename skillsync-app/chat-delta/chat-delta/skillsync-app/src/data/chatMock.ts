export type MessageStatus = 'sent' | 'delivered' | 'read'

export interface ChatAttachment {
  type: 'image' | 'file'
  name: string
}

export interface ChatMessage {
  id: string
  sender: 'me' | 'them'
  text: string
  time: string
  status?: MessageStatus // only meaningful for sender === 'me'
  attachment?: ChatAttachment
  /** ISO date used purely to decide where date separators fall */
  day: string
}

export interface UpcomingSession {
  date: string
  time: string
  skill: string
}

export interface Conversation {
  id: string
  name: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  messages: ChatMessage[]
  matchInfo: {
    compatibilityScore: number
    teaches: string[]
    wants: string[]
    sharedInterests: string[]
    upcomingSession?: UpcomingSession
  }
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Sarah Kim',
    online: true,
    lastMessage: 'Sounds great, see you then!',
    lastMessageTime: '2m',
    unreadCount: 2,
    matchInfo: {
      compatibilityScore: 94,
      teaches: ['UI Design', 'Figma'],
      wants: ['React', 'Excel'],
      sharedInterests: ['Product Design', 'Startups'],
      upcomingSession: { date: 'Thu, 30 Jul', time: '6:00 PM', skill: 'Figma fundamentals' },
    },
    messages: [
      { id: 'm1', sender: 'them', text: 'Hey! Excited for our swap 😊', time: '9:02 AM', day: 'Yesterday' },
      { id: 'm2', sender: 'me', text: 'Same here! I put together a few React basics to start with.', time: '9:10 AM', status: 'read', day: 'Yesterday' },
      { id: 'm3', sender: 'them', text: 'Perfect, here\u2019s a quick moodboard for the Figma side', time: '9:12 AM', day: 'Yesterday', attachment: { type: 'image', name: 'moodboard.png' } },
      { id: 'm4', sender: 'me', text: 'Love it. I\u2019ll bring a starter repo too.', time: '9:15 AM', status: 'read', day: 'Yesterday', attachment: { type: 'file', name: 'starter-repo.zip' } },
      { id: 'm5', sender: 'them', text: 'Are we still on for Thursday at 6?', time: '8:58 AM', day: 'Today' },
      { id: 'm6', sender: 'me', text: 'Yes! Sending a calendar invite now.', time: '9:00 AM', status: 'delivered', day: 'Today' },
      { id: 'm7', sender: 'them', text: 'Sounds great, see you then!', time: '9:01 AM', day: 'Today' },
    ],
  },
  {
    id: 'c2',
    name: 'Marcus Lee',
    online: false,
    lastMessage: 'I\u2019ll send over the chord chart',
    lastMessageTime: '1h',
    unreadCount: 0,
    matchInfo: {
      compatibilityScore: 88,
      teaches: ['Guitar', 'Music Theory'],
      wants: ['Python', 'Photoshop'],
      sharedInterests: ['Live music'],
    },
    messages: [
      { id: 'm1', sender: 'me', text: 'Hey Marcus, ready for lesson two?', time: '2:14 PM', status: 'read', day: 'Today' },
      { id: 'm2', sender: 'them', text: 'I\u2019ll send over the chord chart', time: '2:20 PM', day: 'Today' },
    ],
  },
  {
    id: 'c3',
    name: 'Riya Patel',
    online: true,
    lastMessage: 'Buenos días! Ready when you are 🎉',
    lastMessageTime: '3h',
    unreadCount: 5,
    matchInfo: {
      compatibilityScore: 81,
      teaches: ['Spanish', 'Public Speaking'],
      wants: ['Canva', 'React'],
      sharedInterests: ['Travel'],
      upcomingSession: { date: 'Mon, 3 Aug', time: '7:30 PM', skill: 'Conversational Spanish' },
    },
    messages: [
      { id: 'm1', sender: 'them', text: 'Buenos días! Ready when you are 🎉', time: '11:05 AM', day: 'Today' },
    ],
  },
  {
    id: 'c4',
    name: 'Daniel Osei',
    online: false,
    lastMessage: 'Thanks for the session summary!',
    lastMessageTime: '1d',
    unreadCount: 0,
    matchInfo: {
      compatibilityScore: 90,
      teaches: ['Python', 'AI'],
      wants: ['Photography', 'Guitar'],
      sharedInterests: ['Machine learning'],
    },
    messages: [
      { id: 'm1', sender: 'me', text: 'Wrapped up the notes from today\u2019s session', time: 'Yesterday', status: 'read', day: 'Yesterday', attachment: { type: 'file', name: 'session-notes.pdf' } },
      { id: 'm2', sender: 'them', text: 'Thanks for the session summary!', time: 'Yesterday', day: 'Yesterday' },
    ],
  },
]

export const CANNED_REPLIES = [
  'Sounds good to me!',
  'Let me check and get back to you 👍',
  'That works perfectly.',
  'Thanks for sending that over.',
  'Looking forward to it!',
]
