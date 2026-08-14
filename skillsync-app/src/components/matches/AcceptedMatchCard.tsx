import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MessageCircle, CalendarPlus, User } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { MatchCardBase } from '@/components/matches/MatchCardBase'
import type { PersonMatch } from '@/data/matchesMock'
import api from '@/api/api'

export function AcceptedMatchCard({
  match,
  selected,
  onSelect,
}: {
  match: PersonMatch
  selected?: boolean
  onSelect?: () => void
}) {
  const navigate = useNavigate()
  const [creatingConversation, setCreatingConversation] = useState(false)

  const handleChat = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation()

    if (!match.participantUserId) return

    setCreatingConversation(true)
    try {
      const { data } = await api.post('/conversations', {
        participantId: match.participantUserId,
      })
      navigate(`/chat?conversation=${data.conversation._id}`)
    } catch (error) {
      console.error('Failed to open conversation', error)
      alert('Unable to open this conversation. Please try again.')
    } finally {
      setCreatingConversation(false)
    }
  }

  return (
    <MatchCardBase
      match={match}
      selected={selected}
      onSelect={onSelect}
      metaLine={`Matched ${match.acceptedDate}`}
      footer={
        <div className="flex flex-wrap gap-2 pt-1">
          <Button
            variant="glass"
            size="sm"
            className="flex-1"
            onClick={handleChat}
            loading={creatingConversation}
            disabled={!match.participantUserId}
          >
              <MessageCircle className="w-4 h-4" />
              Chat
          </Button>
          <Button
            variant="magical"
            size="sm"
            className="flex-1"
            onClick={(event) => {
              event.stopPropagation()
              navigate(`/sessions/new?matchId=${match.id}`)
            }}
          >
              <CalendarPlus className="w-4 h-4" />
              Schedule
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={(event) => {
              event.stopPropagation()
              if (match.participantUserId) navigate(`/profile?u=${match.participantUserId}`)
            }}
            disabled={!match.participantUserId}
          >
              <User className="w-4 h-4" />
              Profile
          </Button>
        </div>
      }
    />
  )
}
