import { Avatar } from '@/components/ui/Avatar'
import { cn } from '@/lib/utils'

interface Conversation {
  id: string
  name: string
  avatar: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
}

export function ConversationListItem({
  conversation,
  active,
  onClick,
}: {
  conversation: Conversation
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 border',
        active
          ? 'bg-primary/12 border-primary/25'
          : 'border-transparent hover:bg-white/5'
      )}
    >
      <Avatar name={conversation.name} size="md" status={conversation.online ? 'online' : 'offline'} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className={cn('text-sm font-medium truncate', active ? 'text-on-surface' : 'text-on-surface')}>
            {conversation.name}
          </span>
          <span className="text-[11px] text-on-surface-variant/60 flex-shrink-0">{conversation.lastMessageTime}</span>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-on-surface-variant truncate">{conversation.lastMessage}</p>
          {conversation.unreadCount > 0 && (
            <span className="flex-shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-semibold flex items-center justify-center">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  )
}
