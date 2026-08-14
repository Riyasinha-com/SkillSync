import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Phone, Video, MoreVertical, User, CalendarPlus, Flag, Info } from 'lucide-react'
import { Avatar } from '@/components/ui/Avatar'
import type { Conversation } from '@/data/chatMock'

export function ChatHeader({
  conversation,
  onBack,
  onInfoClick,
}: {
  conversation: Conversation
  onBack?: () => void
  onInfoClick?: () => void
}) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="relative flex items-center gap-3 px-5 py-4 border-b border-white/8">
      {onBack && (
        <button
          onClick={onBack}
          className="lg:hidden w-9 h-9 -ml-1 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 flex-shrink-0"
          aria-label="Back to conversations"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
      )}
      <Avatar name={conversation.name} size="md" status={conversation.online ? 'online' : 'offline'} />
      <div className="min-w-0 flex-1">
        <h3 className="font-display font-semibold text-on-surface truncate">{conversation.name}</h3>
        <p className="text-xs text-on-surface-variant">{conversation.online ? 'Online' : 'Offline'}</p>
      </div>

      <div className="flex items-center gap-1.5">
        {onInfoClick && (
          <button
            onClick={onInfoClick}
            className="lg:hidden w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary"
            aria-label="Match details"
          >
            <Info className="w-[18px] h-[18px]" />
          </button>
        )}
        <button
          className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary"
          aria-label="Voice call"
        >
          <Phone className="w-[18px] h-[18px]" />
        </button>
        <button
          className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-primary"
          aria-label="Video call"
        >
          <Video className="w-[18px] h-[18px]" />
        </button>
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface"
            aria-label="More options"
            aria-expanded={menuOpen}
          >
            <MoreVertical className="w-[18px] h-[18px]" />
          </button>
          {menuOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
              <div className="absolute right-0 top-12 z-20 w-52 glass-panel-raised rounded-xl p-1.5 flex flex-col gap-0.5">
                <Link
                  to={`/profile?u=${conversation.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                >
                  <User className="w-4 h-4" />
                  View Profile
                </Link>
                <Link
                  to="/sessions/new"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                >
                  <CalendarPlus className="w-4 h-4" />
                  Schedule Session
                </Link>
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-error/80 hover:text-error hover:bg-error/10 text-left"
                >
                  <Flag className="w-4 h-4" />
                  Report conversation
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
