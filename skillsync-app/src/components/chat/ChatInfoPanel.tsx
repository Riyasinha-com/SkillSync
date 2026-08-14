import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User, CalendarPlus } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'

interface Conversation {
  id: string
  participantUserId: string
  name: string
  avatar: string
  online: boolean

  city?: string
}
export function ChatInfoPanel({ conversation }: { conversation: Conversation }) {
  const [avatarSrc, setAvatarSrc] = useState(conversation.avatar)

  useEffect(() => {
    setAvatarSrc(conversation.avatar)
  }, [conversation.avatar])

  const initials = conversation.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  
 return (
  <div className="flex flex-col gap-6 p-5 overflow-y-auto h-full">

    <GlassCard raised className="min-w-0 p-6 flex flex-col items-center gap-3">

      {avatarSrc ? (
        <img
          src={avatarSrc}
          alt=""
          onError={() => setAvatarSrc("")}
          className="w-24 h-24 shrink-0 rounded-full object-cover"
        />
      ) : (
        <div
          aria-label={`${conversation.name}'s avatar`}
          className="w-24 h-24 shrink-0 rounded-full flex items-center justify-center font-semibold text-2xl text-on-primary border border-white/10"
          style={{ background: 'linear-gradient(135deg, var(--color-primary-container), var(--color-secondary-container))' }}
        >
          {initials}
        </div>
      )}

      <h2 className="w-full min-w-0 text-center text-lg font-semibold leading-snug break-words whitespace-normal">
        {conversation.name}
      </h2>

      <p className="text-sm text-gray-400">
        {conversation.city || "City not added"}
      </p>

    </GlassCard>

    <div className="flex flex-col gap-3">

      <Link to={`/profile?u=${conversation.participantUserId}`}>
        <Button className="w-full">
          <User className="w-4 h-4 mr-2" />
          View Profile
        </Button>
      </Link>

      <Link to="/sessions/new">
        <Button className="w-full">
          <CalendarPlus className="w-4 h-4 mr-2" />
          Schedule Session
        </Button>
      </Link>

    </div>

  </div>
)
}
