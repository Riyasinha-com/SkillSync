export type ResourceType =
  | 'Article' | 'Video' | 'Course' | 'Book' | 'PDF' | 'GitHub' | 'Documentation' | 'Website' | 'Podcast'

export type ResourceCategory =
  | 'Programming' | 'AI' | 'Machine Learning' | 'Data Science' | 'Web Development' | 'Frontend'
  | 'Backend' | 'Cloud' | 'Cybersecurity' | 'DevOps' | 'Design' | 'UI/UX' | 'Communication'
  | 'Career' | 'Interview Prep' | 'Productivity' | 'Mathematics' | 'Open Source' | 'Other'

export type Difficulty = 'Beginner' | 'Intermediate' | 'Advanced'

export interface Resource {
  id: string
  title: string
  description: string
  author: string
  source: string
  type: ResourceType
  category: ResourceCategory
  difficulty: Difficulty
  duration: string
  tags: string[]
  free: boolean
  popularityScore: number
  addedDaysAgo: number
  editorsChoice?: boolean
  aiPick?: boolean
  communityRecommended?: boolean
  trending?: boolean
}

export const RESOURCES: Resource[] = [
  {
    id: 'r1', title: 'The Complete React Developer Roadmap', description: 'A structured, project-based path from React fundamentals to advanced patterns like server components and suspense.',
    author: 'Dana Wren', source: 'Frontend Masters', type: 'Course', category: 'Frontend', difficulty: 'Intermediate',
    duration: '18h', tags: ['react', 'hooks', 'roadmap'], free: false, popularityScore: 96, addedDaysAgo: 3, editorsChoice: true,
  },
  {
    id: 'r2', title: 'react-query', description: 'A widely-used data-fetching and caching library for React — the repo everyone links when someone asks "how do I fetch data."',
    author: 'TanStack', source: 'GitHub', type: 'GitHub', category: 'Frontend', difficulty: 'Intermediate',
    duration: '—', tags: ['react', 'data-fetching', 'caching'], free: true, popularityScore: 91, addedDaysAgo: 12, trending: true,
  },
  {
    id: 'r3', title: 'Designing Data-Intensive Applications', description: 'The book most backend engineers point to first — reliability, scalability, and maintainability of modern data systems.',
    author: 'Martin Kleppmann', source: "O'Reilly", type: 'Book', category: 'Backend', difficulty: 'Advanced',
    duration: '~14h read', tags: ['systems-design', 'databases'], free: false, popularityScore: 98, addedDaysAgo: 40, editorsChoice: true,
  },
  {
    id: 'r4', title: 'Neural Networks: Zero to Hero', description: 'Build backpropagation and a GPT from scratch, explained line by line — no black boxes.',
    author: 'Andrej Karpathy', source: 'YouTube', type: 'Video', category: 'Machine Learning', difficulty: 'Advanced',
    duration: '9h series', tags: ['deep-learning', 'from-scratch'], free: true, popularityScore: 99, addedDaysAgo: 60, aiPick: true, communityRecommended: true,
  },
  {
    id: 'r5', title: 'MDN Web Docs: CSS Grid', description: 'The canonical reference for CSS Grid Layout — still the first tab most developers open.',
    author: 'Mozilla', source: 'MDN', type: 'Documentation', category: 'Web Development', difficulty: 'Beginner',
    duration: 'reference', tags: ['css', 'layout'], free: true, popularityScore: 88, addedDaysAgo: 400,
  },
  {
    id: 'r6', title: 'Refactoring UI', description: 'Practical, opinionated design advice for developers who aren\u2019t designers — spacing, color, typography, hierarchy.',
    author: 'Adam Wathan & Steve Schoger', source: 'refactoringui.com', type: 'Book', category: 'UI/UX', difficulty: 'Beginner',
    duration: '~6h read', tags: ['design', 'visual-hierarchy'], free: false, popularityScore: 94, addedDaysAgo: 200, editorsChoice: true,
  },
  {
    id: 'r7', title: 'Kubernetes the Hard Way', description: 'Bootstrap a Kubernetes cluster manually, step by step — the fastest way to actually understand what kubeadm hides.',
    author: 'Kelsey Hightower', source: 'GitHub', type: 'GitHub', category: 'DevOps', difficulty: 'Advanced',
    duration: '~8h', tags: ['kubernetes', 'infrastructure'], free: true, popularityScore: 90, addedDaysAgo: 500,
  },
  {
    id: 'r8', title: 'The Missing Semester of Your CS Education', description: 'Shell tools, version control, debugging, and the practical skills CS classes assume you already have.',
    author: 'MIT', source: 'missing.csail.mit.edu', type: 'Course', category: 'Programming', difficulty: 'Beginner',
    duration: '12h', tags: ['tooling', 'git', 'shell'], free: true, popularityScore: 93, addedDaysAgo: 5, trending: true,
  },
  {
    id: 'r9', title: 'System Design Interview – An Insider\u2019s Guide', description: 'The most commonly referenced prep book for system design interview rounds, with worked examples.',
    author: 'Alex Xu', source: 'ByteByteGo', type: 'Book', category: 'Interview Prep', difficulty: 'Intermediate',
    duration: '~8h read', tags: ['interviews', 'systems-design'], free: false, popularityScore: 95, addedDaysAgo: 25,
  },
  {
    id: 'r10', title: 'Cracking the Cloud: AWS Fundamentals', description: 'Core AWS services explained with the "why," not just the console clicks — EC2, S3, IAM, VPC.',
    author: 'Priya Chandran', source: 'A Cloud Guru', type: 'Course', category: 'Cloud', difficulty: 'Beginner',
    duration: '10h', tags: ['aws', 'cloud-fundamentals'], free: false, popularityScore: 87, addedDaysAgo: 8,
  },
  {
    id: 'r11', title: 'OWASP Top 10', description: 'The standard awareness document for the most critical security risks to web applications — required reading.',
    author: 'OWASP Foundation', source: 'owasp.org', type: 'Website', category: 'Cybersecurity', difficulty: 'Intermediate',
    duration: 'reference', tags: ['security', 'web-security'], free: true, popularityScore: 92, addedDaysAgo: 300,
  },
  {
    id: 'r12', title: 'Syntax.fm', description: 'A twice-weekly podcast on web development — pragmatic, funny, and genuinely useful for staying current.',
    author: 'Wes Bos & Scott Tolinski', source: 'syntax.fm', type: 'Podcast', category: 'Web Development', difficulty: 'Beginner',
    duration: '~45m/ep', tags: ['podcast', 'web-dev'], free: true, popularityScore: 89, addedDaysAgo: 2, trending: true,
  },
  {
    id: 'r13', title: 'Talking to Humans', description: 'A short, practical guide to customer discovery conversations — useful well beyond startups.',
    author: 'Giff Constable', source: 'talkingtohumans.com', type: 'PDF', category: 'Communication', difficulty: 'Beginner',
    duration: '~2h read', tags: ['communication', 'user-research'], free: true, popularityScore: 78, addedDaysAgo: 150,
  },
  {
    id: 'r14', title: 'Deep Learning Specialization', description: 'The specialization most people mean when they say "I learned deep learning on Coursera."',
    author: 'Andrew Ng', source: 'Coursera', type: 'Course', category: 'AI', difficulty: 'Intermediate',
    duration: '~80h', tags: ['deep-learning', 'coursera'], free: false, popularityScore: 97, addedDaysAgo: 700, communityRecommended: true,
  },
  {
    id: 'r15', title: 'Pandas Cookbook', description: 'Task-oriented recipes for the data-wrangling problems you actually hit in real datasets.',
    author: 'Theodore Petrou', source: "O'Reilly", type: 'Book', category: 'Data Science', difficulty: 'Intermediate',
    duration: '~9h read', tags: ['pandas', 'python', 'data-wrangling'], free: false, popularityScore: 84, addedDaysAgo: 90,
  },
  {
    id: 'r16', title: 'Radical Candor', description: 'A framework for giving feedback that\u2019s both direct and genuinely caring — widely cited in engineering-management circles.',
    author: 'Kim Scott', source: 'radicalcandor.com', type: 'Book', category: 'Career', difficulty: 'Beginner',
    duration: '~7h read', tags: ['management', 'feedback'], free: false, popularityScore: 90, addedDaysAgo: 250,
  },
  {
    id: 'r17', title: '3Blue1Brown: Essence of Linear Algebra', description: 'The visual intuition for linear algebra that makes every ML course afterward click.',
    author: 'Grant Sanderson', source: 'YouTube', type: 'Video', category: 'Mathematics', difficulty: 'Beginner',
    duration: '3h series', tags: ['linear-algebra', 'visual-math'], free: true, popularityScore: 99, addedDaysAgo: 4, aiPick: true, trending: true,
  },
  {
    id: 'r18', title: 'freeCodeCamp', description: 'A full, free curriculum from web-dev basics through data structures and machine learning, with certifications.',
    author: 'freeCodeCamp.org', source: 'freecodecamp.org', type: 'Website', category: 'Programming', difficulty: 'Beginner',
    duration: 'self-paced', tags: ['curriculum', 'free', 'certifications'], free: true, popularityScore: 95, addedDaysAgo: 600,
  },
  {
    id: 'r19', title: 'The Pragmatic Programmer', description: 'Timeless, practical advice for software craftsmanship — still assigned reading two decades later.',
    author: 'David Thomas & Andrew Hunt', source: 'Addison-Wesley', type: 'Book', category: 'Programming', difficulty: 'Intermediate',
    duration: '~10h read', tags: ['software-craftsmanship'], free: false, popularityScore: 96, addedDaysAgo: 800, editorsChoice: true,
  },
  {
    id: 'r20', title: 'Open Source Guides', description: 'GitHub\u2019s own guide to starting, contributing to, and maintaining open source projects.',
    author: 'GitHub', source: 'opensource.guide', type: 'Documentation', category: 'Open Source', difficulty: 'Beginner',
    duration: 'reference', tags: ['open-source', 'contributing'], free: true, popularityScore: 82, addedDaysAgo: 20,
  },
  {
    id: 'r21', title: 'Atomic Habits, Applied to Deep Work', description: 'A practical article on structuring focused work blocks for skill practice — short, actionable, no fluff.',
    author: 'Lena Ortiz', source: 'SkillSync Blog', type: 'Article', category: 'Productivity', difficulty: 'Beginner',
    duration: '8 min read', tags: ['focus', 'habits'], free: true, popularityScore: 76, addedDaysAgo: 1, trending: true,
  },
  {
    id: 'r22', title: 'Figma for Developers', description: 'Everything a developer needs from Figma to work smoothly with a design handoff — components, auto layout, dev mode.',
    author: 'Priya Chandran', source: 'Figma Academy', type: 'Course', category: 'Design', difficulty: 'Beginner',
    duration: '4h', tags: ['figma', 'design-handoff'], free: true, popularityScore: 85, addedDaysAgo: 6,
  },
]

export interface ContinueLearningEntry {
  resourceId: string
  progress: number
}

export const CONTINUE_LEARNING: ContinueLearningEntry[] = [
  { resourceId: 'r1', progress: 62 },
  { resourceId: 'r14', progress: 34 },
  { resourceId: 'r9', progress: 80 },
]

export const RECENTLY_VIEWED_IDS = ['r5', 'r12', 'r17', 'r20']

export const FEATURED_RESOURCE_ID = 'r4'

export const LEARNING_QUOTES = [
  'The beautiful thing about learning is that no one can take it away from you. — B.B. King',
  'Every skill you share helps someone grow.',
  'An investment in knowledge pays the best interest. — Benjamin Franklin',
]

export const DAILY_STREAK = { days: 12, longestStreak: 21 }
export const WEEKLY_PROGRESS = { hoursThisWeek: 6.5, goalHours: 10 }
