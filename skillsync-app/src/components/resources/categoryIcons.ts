import {
  Code2, Cpu, BrainCircuit, BarChart3, Globe2, Layout, Server, Cloud, ShieldAlert, Workflow,
  Palette, PenTool, MessageCircle, Briefcase, ClipboardList, Timer, Sigma, GitBranch, Sparkles,
  type LucideIcon,
} from 'lucide-react'
import type { ResourceCategory } from '@/data/resourcesMock'

export const CATEGORY_ICONS: Record<ResourceCategory, LucideIcon> = {
  Programming: Code2,
  AI: Cpu,
  'Machine Learning': BrainCircuit,
  'Data Science': BarChart3,
  'Web Development': Globe2,
  Frontend: Layout,
  Backend: Server,
  Cloud: Cloud,
  Cybersecurity: ShieldAlert,
  DevOps: Workflow,
  Design: Palette,
  'UI/UX': PenTool,
  Communication: MessageCircle,
  Career: Briefcase,
  'Interview Prep': ClipboardList,
  Productivity: Timer,
  Mathematics: Sigma,
  'Open Source': GitBranch,
  Other: Sparkles,
}
