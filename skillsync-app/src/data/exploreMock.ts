import {
  Code2, Palette, Languages, Music, Briefcase, Megaphone, Camera, Paintbrush,
  Dumbbell, ChefHat, FileSpreadsheet, Cpu, HeartHandshake, PenLine,
  type LucideIcon,
} from 'lucide-react'

export type Category =
  | 'Programming' | 'Design' | 'Languages' | 'Music' | 'Business' | 'Marketing'
  | 'Photography' | 'Art' | 'Fitness' | 'Cooking' | 'Excel' | 'AI' | 'Soft Skills' | 'Writing'

export const CATEGORY_ICONS: Record<Category, LucideIcon> = {
  Programming: Code2,
  Design: Palette,
  Languages: Languages,
  Music: Music,
  Business: Briefcase,
  Marketing: Megaphone,
  Photography: Camera,
  Art: Paintbrush,
  Fitness: Dumbbell,
  Cooking: ChefHat,
  Excel: FileSpreadsheet,
  AI: Cpu,
  'Soft Skills': HeartHandshake,
  Writing: PenLine,
}

export const CATEGORIES: Category[] = [
  'Programming', 'Design', 'Languages', 'Music', 'Business', 'Marketing',
  'Photography', 'Art', 'Fitness', 'Cooking', 'Excel', 'AI', 'Soft Skills', 'Writing',
]

export const POPULAR_CATEGORIES: Category[] = [
  'Programming', 'Design', 'Music', 'Photography', 'Languages',
  'Business', 'Marketing', 'Cooking', 'AI', 'Writing',
]

export type ExperienceLevel =
  | 'Beginner'
  | 'Intermediate'
  | 'Advanced'
  | 'Expert'

export const EXPERIENCE_LEVELS: ExperienceLevel[] = [
  'Beginner',
  'Intermediate',
  'Advanced',
  'Expert',
]

export type Availability = 'Online' | 'Offline' | 'Weekdays' | 'Weekends'
export const AVAILABILITY_OPTIONS: Availability[] = ['Online', 'Offline', 'Weekdays', 'Weekends']

export const TIMEZONES = ['GMT-8', 'GMT-5', 'GMT+0', 'GMT+1', 'GMT+5:30', 'GMT+8'] as const

export interface FeaturedSkill {
  id: string
  name: string
  category: Category
  teacherCount: number
  learnerCount: number
}

export const FEATURED_SKILLS: FeaturedSkill[] = [
  { id: 'sk1', name: 'React', category: 'Programming', teacherCount: 214, learnerCount: 892 },
  { id: 'sk2', name: 'UI Design', category: 'Design', teacherCount: 156, learnerCount: 611 },
  { id: 'sk3', name: 'Spanish', category: 'Languages', teacherCount: 98, learnerCount: 430 },
  { id: 'sk4', name: 'Guitar', category: 'Music', teacherCount: 74, learnerCount: 320 },
  { id: 'sk5', name: 'Public Speaking', category: 'Soft Skills', teacherCount: 61, learnerCount: 275 },
  { id: 'sk6', name: 'Excel', category: 'Excel', teacherCount: 132, learnerCount: 540 },
  { id: 'sk7', name: 'Photography', category: 'Photography', teacherCount: 88, learnerCount: 298 },
  { id: 'sk8', name: 'Prompt Engineering', category: 'AI', teacherCount: 47, learnerCount: 601 },
]

export const TRENDING_SKILLS = [
  'Python', 'React', 'UI Design', 'Figma', 'Excel',
  'Public Speaking', 'English', 'Canva', 'Video Editing', 'Guitar',
]

export interface Teacher {
  id: string
  name: string
  location: string
  timezone: (typeof TIMEZONES)[number]
  verified: boolean
  rating: number
  teaches: { name: string; level: ExperienceLevel }[]
  wants: string[]
  availability: Availability[]
  bio: string
  matched: boolean
}

export const TEACHERS: Teacher[] = [
  {
    id: 't1', name: 'Sarah Kim', location: 'Seattle, USA', timezone: 'GMT-8', verified: true, rating: 4.9,
    teaches: [{ name: 'UI Design', level: 'Advanced' }, { name: 'Figma', level: 'Advanced' }],
    wants: ['React', 'Excel'], availability: ['Online', 'Weekdays'], matched: true,
    bio: 'Product designer by day, always down to trade design chops for code fluency.',
  },
  {
    id: 't2', name: 'Marcus Lee', location: 'Austin, USA', timezone: 'GMT-5', verified: true, rating: 4.8,
    teaches: [{ name: 'Guitar', level: 'Intermediate' }, { name: 'Music Theory', level: 'Beginner' }],
    wants: ['Python', 'Photoshop'], availability: ['Weekends'], matched: false,
    bio: 'Ten years of gigging and teaching — happiest with a guitar and a good playlist.',
  },
  {
    id: 't3', name: 'Riya Patel', location: 'Mumbai, India', timezone: 'GMT+5:30', verified: false, rating: 4.6,
    teaches: [{ name: 'Spanish', level: 'Advanced' }, { name: 'Public Speaking', level: 'Intermediate' }],
    wants: ['Canva', 'React'], availability: ['Online', 'Weekdays', 'Weekends'], matched: false,
    bio: 'Language coach who loves helping nervous speakers find their voice.',
  },
  {
    id: 't4', name: 'Daniel Osei', location: 'London, UK', timezone: 'GMT+0', verified: true, rating: 5.0,
    teaches: [{ name: 'Python', level: 'Expert' as ExperienceLevel }, { name: 'AI', level: 'Advanced' }],
    wants: ['Photography', 'Guitar'], availability: ['Online', 'Offline'], matched: false,
    bio: 'ML engineer exploring how far a good analogy can take a beginner.',
  },
  {
    id: 't5', name: 'Emma Laurent', location: 'Paris, France', timezone: 'GMT+1', verified: true, rating: 4.7,
    teaches: [{ name: 'Photography', level: 'Advanced' }, { name: 'Video Editing', level: 'Intermediate' }],
    wants: ['Public Speaking', 'Excel'], availability: ['Weekdays'], matched: false,
    bio: 'Freelance photographer who teaches composition the way she shoots — patiently.',
  },
  {
    id: 't6', name: 'Kenji Watanabe', location: 'Tokyo, Japan', timezone: 'GMT+8', verified: false, rating: 4.5,
    teaches: [{ name: 'Excel', level: 'Advanced' }, { name: 'Business Strategy', level: 'Intermediate' }],
    wants: ['English', 'UI Design'], availability: ['Online', 'Weekends'], matched: false,
    bio: 'Ops manager turned spreadsheet whisperer, learning English one swap at a time.',
  },
]

export interface RecommendedMatch {
  id: string
  name: string
  matchScore: number
  sharedSkills: string[]
  reason: string
}

export const RECOMMENDED_MATCHES: RecommendedMatch[] = [
  {
    id: 'rm1', name: 'Sarah Kim', matchScore: 94,
    sharedSkills: ['UI Design', 'React'],
    reason: 'Sarah wants React and Excel — both skills you teach — and teaches Figma, which is on your list.',
  },
  {
    id: 'rm2', name: 'Daniel Osei', matchScore: 87,
    sharedSkills: ['Python', 'AI'],
    reason: 'Daniel teaches Python and AI, two of your top learning goals, and wants Photography in return.',
  },
  {
    id: 'rm3', name: 'Emma Laurent', matchScore: 79,
    sharedSkills: ['Photography', 'Excel'],
    reason: 'Emma wants Excel, which you teach, and her Photography lessons match a skill you want to learn.',
  },
]
