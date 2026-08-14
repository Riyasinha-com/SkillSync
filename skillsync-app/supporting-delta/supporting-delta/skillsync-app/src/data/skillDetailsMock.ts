import type { Category } from '@/data/exploreMock'

export interface RoadmapStage {
  id: string
  title: string
  description: string
}

export interface SkillDetail {
  id: string
  name: string
  category: Category
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  teacherCount: number
  learnerCount: number
  rating: number
  description: string
  roadmap: RoadmapStage[]
  /** If the current user is learning this skill, their progress; omitted otherwise */
  yourProgress?: number
}

export const SKILL_DETAIL: SkillDetail = {
  id: 'excel',
  name: 'Excel',
  category: 'Excel',
  difficulty: 'Intermediate',
  teacherCount: 132,
  learnerCount: 540,
  rating: 4.7,
  description:
    'Excel sessions on SkillSync cover everything from everyday formulas to the spreadsheet models people actually use at work — pivot tables, lookups, and building something clean enough to hand off to a teammate. Most swaps start with a real spreadsheet you\u2019re stuck on.',
  roadmap: [
    { id: 'st1', title: 'Spreadsheet Basics', description: 'Navigate sheets, format cells, and get comfortable with references.' },
    { id: 'st2', title: 'Core Formulas', description: 'SUM, IF, and lookups like VLOOKUP and XLOOKUP for everyday tasks.' },
    { id: 'st3', title: 'Pivot Tables', description: 'Summarize and explore large datasets without writing a single formula.' },
    { id: 'st4', title: 'Data Cleaning', description: 'Tidy messy exports so they\u2019re ready to analyze.' },
    { id: 'st5', title: 'Build a Dashboard', description: 'Combine charts and formulas into something you\u2019d actually share.' },
  ],
  yourProgress: 60,
}
