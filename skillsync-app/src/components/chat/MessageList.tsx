import { useEffect, useRef } from 'react'
import { DateSeparator } from '@/components/chat/DateSeparator'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { TypingIndicator } from '@/components/chat/TypingIndicator'
import type { ChatMessage } from '@/data/chatMock'

export function MessageList({
  messages,
  typingName,
}: {
  messages: ChatMessage[]
  typingName: string | null
}) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages.length, typingName])

  let lastDay: string | null = null

  return (
    <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-4">
      {messages.map((message) => {
        const showSeparator = message.day !== lastDay
        lastDay = message.day
        return (
          <div key={message.id} className="flex flex-col gap-4">
            {showSeparator && <DateSeparator label={message.day} />}
            <MessageBubble message={message} />
          </div>
        )
      })}
      {typingName && <TypingIndicator name={typingName} />}
      <div ref={bottomRef} />
    </div>
  )
}
