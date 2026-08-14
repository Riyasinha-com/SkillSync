import { Link } from 'react-router-dom'
import { CalendarDays, User, CalendarPlus, FolderOpen } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { CircularProgress } from '@/components/ui/CircularProgress'
import type { Conversation } from '@/data/chatMock'

export function ChatInfoPanel({ conversation }: { conversation: Conversation }) {
  const { matchInfo } = conversation

  return (
    <div className="flex flex-col gap-6 p-5 overflow-y-auto h-full">
      <div>
        <h3 className="font-mono-label text-xs text-on-surface-variant/70 mb-4">Match Summary</h3>
        <GlassCard raised className="p-6 flex flex-col items-center gap-2">
          <CircularProgress value={matchInfo.compatibilityScore} size={88} strokeWidth={7} tint="tertiary" label={`${matchInfo.compatibilityScore}%`} />
          <span className="text-xs text-on-surface-variant text-center">Compatibility Score</span>
        </GlassCard>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skills They Teach</p>
        <div className="flex flex-wrap gap-1.5">
          {matchInfo.teaches.map((s) => (
            <Badge key={s} variant="primary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Skills They Want to Learn</p>
        <div className="flex flex-wrap gap-1.5">
          {matchInfo.wants.map((s) => (
            <Badge key={s} variant="secondary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Shared Interests</p>
        <div className="flex flex-wrap gap-1.5">
          {matchInfo.sharedInterests.map((s) => (
            <Badge key={s} variant="tertiary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      {matchInfo.upcomingSession && (
        <div>
          <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Upcoming Session</p>
          <GlassCard className="p-4 flex flex-col gap-2">
            <p className="text-sm font-medium text-on-surface">{matchInfo.upcomingSession.skill}</p>
            <p className="flex items-center gap-1.5 text-xs text-on-surface-variant">
              <CalendarDays className="w-3.5 h-3.5 text-primary" />
              {matchInfo.upcomingSession.date} · {matchInfo.upcomingSession.time}
            </p>
          </GlassCard>
        </div>
      )}

      <div className="flex flex-col gap-2 mt-auto pt-2 border-t border-white/8">
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-1">Quick Actions</p>
        <Link to={`/profile?u=${conversation.id}`}>
          <Button variant="glass" size="sm" className="w-full">
            <User className="w-4 h-4" />
            View Profile
          </Button>
        </Link>
        <Link to="/sessions/new">
          <Button variant="glass" size="sm" className="w-full">
            <CalendarPlus className="w-4 h-4" />
            Schedule Session
          </Button>
        </Link>
        <Link to="/resources">
          <Button variant="glass" size="sm" className="w-full">
            <FolderOpen className="w-4 h-4" />
            View Shared Resources
          </Button>
        </Link>
      </div>
    </div>
  )
}
