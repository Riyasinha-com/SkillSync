import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { X } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { ConversationSidebar } from '@/components/chat/ConversationSidebar'
import { ChatHeader } from '@/components/chat/ChatHeader'
import { MessageList } from '@/components/chat/MessageList'
import { ChatInput } from '@/components/chat/ChatInput'
import { ChatInfoPanel } from '@/components/chat/ChatInfoPanel'
import api from "@/api/api"
import type { ChatMessage } from '@/data/chatMock'

interface Conversation {
  _id: string
  participants: {
    _id: string
    name: string
    profilePic?: string
    city?: string
  }[]
}

interface UIConversation {
  id: string
  participantUserId: string
  name: string
  avatar: string
  online: boolean
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  city?: string
}




export default function ChatPage() {
  const [searchParams] = useSearchParams()
  const [conversations, setConversations] =
useState<Conversation[]>([])
  const [activeId, setActiveId] =
useState("")
  const [search, setSearch] = useState('')
  const [mobileView, setMobileView] = useState<'list' | 'chat'>('list')
  const [infoOpen, setInfoOpen] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const meId = JSON.parse(localStorage.getItem("user") || "{}")._id
  const [loadingConversations, setLoadingConversations] = useState(true)

  useEffect(() => {
  const loadConversations = async () => {
    try {
      const { data } = await api.get("/conversations")

      setConversations(data)

      if (data.length > 0) {
        const requestedConversation = searchParams.get('conversation')

        setActiveId(
          data.some(
            (conversation: Conversation) =>
              conversation._id === requestedConversation
          )
            ? requestedConversation!
            : data[0]._id
        )
      }
    } catch (err) {
      console.error(err)
    } finally {
      setLoadingConversations(false)
    }
  }

  loadConversations()
}, [searchParams])

useEffect(() => {
  if (!activeId) return

  const loadMessages = async () => {
    try {
      const { data } = await api.get(`/messages/${activeId}`)

      const formattedMessages: ChatMessage[] = data.map((message: any) => {
        const date = new Date(message.createdAt)

        return {
          id: message._id,
          sender: message.sender._id === meId ? 'me' : 'them',
          text: message.text,
          time: date.toLocaleTimeString([], {
            hour: 'numeric',
            minute: '2-digit',
          }),
          day: date.toLocaleDateString([], {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }),
        }
      })

      setMessages(formattedMessages)
    } catch (err) {
      console.error(err)
    }
  }

  loadMessages()
}, [activeId, meId])



const uiConversations: UIConversation[] = conversations.map((c) => {
  const otherUser = c.participants.find(
  (p) => p._id !== meId
)
  return {
    id: c._id,
    participantUserId: otherUser?._id || "",
    name: otherUser?.name || "Unknown User",
    avatar: otherUser?.profilePic || "",
    online: true,
    lastMessage: "",
    lastMessageTime: "",
    unreadCount: 0,
    city: otherUser?.city,
  }
})
  
const filteredConversations = useMemo(() => {
  const q = search.trim().toLowerCase()

  if (!q) return uiConversations

  return uiConversations.filter((c) =>
    c.name.toLowerCase().includes(q)
  )
}, [uiConversations, search])

  
const uiActiveConversation =
  uiConversations.find((c) => c.id === activeId)

  if (loadingConversations) {
  return (
    <div className="p-10 text-center">
      Loading conversations...
    </div>
  )
}

if (conversations.length === 0) {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-semibold text-on-surface">
        No conversations yet
      </h2>
      <p className="mt-2 text-on-surface-variant">
        Accept a skill swap request to start chatting with your learning partner.
      </p>
    </div>
  )
}

  function selectConversation(id: string) {
  setActiveId(id)
  setMobileView("chat")
}
  async function handleSend(text: string) {
  if (!activeId) return

  try {
    const { data } = await api.post("/messages", {
      conversationId: activeId,
      text,
    })
    const sentMessage = data.data
    const date = new Date(sentMessage.createdAt)

    setMessages((currentMessages) => [
      ...currentMessages,
      {
        id: sentMessage._id,
        sender: 'me',
        text: sentMessage.text,
        time: date.toLocaleTimeString([], {
          hour: 'numeric',
          minute: '2-digit',
        }),
        day: date.toLocaleDateString([], {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        status: 'sent',
      },
    ])
  } catch (err) {
    console.error("Failed to send message", err)
  }
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
            conversation={uiActiveConversation!}
            onBack={() => setMobileView('list')}
            onInfoClick={() => setInfoOpen(true)}
          />
          <MessageList
  messages={messages}
  typingName={null}
/>
          <ChatInput onSend={handleSend} />
        </div>

        {/* Info panel — inline on desktop */}
        <div className="hidden lg:block border-l border-white/8 min-h-0">
          <ChatInfoPanel conversation={uiActiveConversation!} />
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
            <ChatInfoPanel conversation={uiActiveConversation!} />
          </div>
        </div>
      )}
    </div>
  )
}
