import {
  FileText, Video, GraduationCap, BookOpen, File, FolderGit2, BookMarked, Globe, Mic,
  type LucideIcon,
} from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { ResourceType } from '@/data/resourcesMock'

const TYPE_ICON: Record<ResourceType, LucideIcon> = {
  Article: FileText,
  Video: Video,
  Course: GraduationCap,
  Book: BookOpen,
  PDF: File,
  GitHub: FolderGit2,
  Documentation: BookMarked,
  Website: Globe,
  Podcast: Mic,
}

export function ResourceTypeBadge({ type }: { type: ResourceType }) {
  const Icon = TYPE_ICON[type]
  return (
    <Badge variant="neutral" size="sm" className="normal-case font-body gap-1.5">
      <Icon className="w-3 h-3" />
      {type}
    </Badge>
  )
}
