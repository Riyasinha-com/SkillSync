import { useMemo, useState } from 'react'
import { X } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { ConversationSidebar } from '@/components/chat/ConversationSidebar'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { MessageList } from '@/components/chat/MessageList'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatInfoPanel } from '@/components/chat/ChatInfoPanel'
import { CONVERSATIONS, CANNED_REPLIES, type Conversation, type ChatMessage } from '@/data/chatMock'

function randomReply() {
  return CANNED_REPLIES[Math.floor(Math.random() * CANNED_REPLIES.length)]
}

function nowTime() {
  return new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
}

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS)
  const [activeId, setActiveId] = useState(CONVERSATIONS[0].id)
  const [search, setSearch] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const [infoOpen, setInfoOpen] = useState(false)
  const [typingId, setTypingId] = useState<string | null>(null)

  const filteredConversations = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter((c) => c.name.toLowerCase().includes(q))
  }, [conversations, search])

  const activeConversation = conversations.find((c) => c.id === activeId) ?? conversations[0]

  function selectConversation(id: string) {
    setActiveId(id)
    setMobileView('chat')
    setConversations((list) => list.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c)))
  }

  function handleSend(text: string) {
    const message: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: 'me',
      text,
      time: nowTime(),
      status: 'sent',
      day: 'Today',
    }

    setConversations((list) =>
      list.map((c) =>
        c.id === activeId
          ? { ...c, messages: [...c.messages, message], lastMessage: text, lastMessageTime: 'now' }
          : c
      )
    )

    // Simulate the other person typing, then replying — demonstrates the
    // typing indicator and keeps the mock conversation feeling alive.
    const replyToId = activeId
    setTypingId(replyToId)
    setTimeout(() => {
      const reply: ChatMessage = {
        id: `m-${Date.now()}-r`,
        sender: 'them',
        text: randomReply(),
        time: nowTime(),
        day: 'Today',
      }
      setConversations((list) =>
        list.map((c) =>
          c.id === replyToId
            ? { ...c, messages: [...c.messages, reply], lastMessage: reply.text, lastMessageTime: 'now' }
            : c
        )
      )
      setTypingId((current) => (current === replyToId ? null : current))
    }, 1800)
  }

  return (
    <div className="h-[calc(100vh-8.5rem)] min-h-[520px]">
      <GlassCard raised className="h-full grid grid-cols-1 lg:grid-cols-[320px_1fr_320px] overflow-hidden">
        {/* Conversation list */}
        <div className={`${mobileView === 'list' ? 'flex' : 'hidden'} lg:flex flex-col border-r border-white/8 min-h-0`}>
          <ConversationSidebar
            conversations={filteredConversations}
            activeId={activeId}
            search={search}
            onSearchChange={setSearch}
            onSelect={selectConversation}
          />
        </div>

        {/* Main chat area */}
        <div className={`${mobileView === 'chat' ? 'flex' : 'hidden'} lg:flex flex-col min-h-0`}>
          <ChatHeader
            conversation={activeConversation}
            onBack={() => setMobileView('list')}
            onInfoClick={() => setInfoOpen(true)}
          />
          <MessageList messages={activeConversation.messages} typingName={typingId === activeConversation.id ? activeConversation.name : null} />
          <ChatInput onSend={handleSend} />
        </div>

        {/* Info panel — inline on desktop */}
        <div className="hidden lg:block border-l border-white/8 min-h-0">
          <ChatInfoPanel conversation={activeConversation} />
        </div>
      </GlassCard>

      {/* Info panel — slide-over on tablet/mobile */}
      {infoOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setInfoOpen(false)} />
          <div className="absolute right-0 top-0 h-full w-full max-w-sm glass-panel-raised rounded-l-[2rem] overflow-hidden">
            <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
              <h3 className="font-display font-semibold text-on-surface">Match Details</h3>
              <button
                onClick={() => setInfoOpen(false)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <ChatInfoPanel conversation={activeConversation} />
          </div>
        </div>
      )}
    </div>
  )
}
