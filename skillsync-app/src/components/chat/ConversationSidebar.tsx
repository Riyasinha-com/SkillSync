import { Search } from 'lucide-react'
import { ConversationListItem } from '@/components/chat/ConversationListItem'

interface Conversation {
  id: string
  name: string
  avatar: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  city?: string
}

export function ConversationSidebar({
  conversations,
  activeId,
  search,
  onSearchChange,
  onSelect,
}: {
  conversations: Conversation[]
  activeId: string
  search: string
  onSearchChange: (v: string) => void
  onSelect: (id: string) => void
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-white/8">
        <h2 className="font-display text-lg font-semibold text-on-surface mb-3 px-1">Messages</h2>
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search conversations…"
            className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-1">
  {conversations.length === 0 ? (
    <p className="text-sm text-on-surface-variant text-center py-10 px-4">
      No conversations match your search.
    </p>
  ) : (
    conversations.map((c) => (
      <ConversationListItem
        key={c.id}
        conversation={c}
        active={c.id === activeId}
        onClick={() => onSelect(c.id)}
      />
    ))
  )}
</div>
    </div>
  )
}
