import { Check, CheckCheck, FileText, ImageIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { ChatMessage } from '@/data/chatMock'

export function MessageBubble({ message }: { message: ChatMessage }) {
  const isMe = message.sender === 'me'

  return (
    <div className={cn('flex', isMe ? 'justify-end' : 'justify-start')}>
      <div className={cn('flex flex-col gap-1 max-w-[78%] sm:max-w-[65%]', isMe ? 'items-end' : 'items-start')}>
        <div
          className={cn(
            'px-4 py-2.5 text-sm leading-relaxed',
            isMe
              ? 'glow-button text-on-primary rounded-2xl rounded-br-md'
              : 'glass-panel text-on-surface rounded-2xl rounded-bl-md'
          )}
        >
          {message.attachment && (
            <div
              className={cn(
                'flex items-center gap-2.5 rounded-xl px-3 py-2.5 mb-2',
                isMe ? 'bg-white/15' : 'bg-white/5 border border-white/10'
              )}
            >
              {message.attachment.type === 'image' ? (
                <ImageIcon className="w-4 h-4 flex-shrink-0" />
              ) : (
                <FileText className="w-4 h-4 flex-shrink-0" />
              )}
              <span className="text-xs truncate">{message.attachment.name}</span>
            </div>
          )}
          {message.text}
        </div>
        <div className="flex items-center gap-1 px-1">
          <span className="text-[10px] text-on-surface-variant/60">{message.time}</span>
          {isMe && message.status && (
            <span className={cn(message.status === 'read' ? 'text-primary' : 'text-on-surface-variant/50')}>
              {message.status === 'sent' ? (
                <Check className="w-3 h-3" />
              ) : (
                <CheckCheck className="w-3 h-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
