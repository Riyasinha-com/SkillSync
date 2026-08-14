import { Video, Users, Link2 } from 'lucide-react'
import { Badge } from '@/components/ui/Badge'
import type { MeetingPlatform } from '@/data/profileMock'

const PLATFORM_ICON = {
  'Google Meet': Video,
  Zoom: Users,
  Other: Link2,
} as const

export function PlatformBadge({ platform }: { platform: MeetingPlatform }) {
  const Icon = PLATFORM_ICON[platform]
  return (
    <Badge variant="neutral" size="sm" className="normal-case font-body gap-1.5">
      <Icon className="w-3.5 h-3.5" />
      {platform}
    </Badge>
  )
}
