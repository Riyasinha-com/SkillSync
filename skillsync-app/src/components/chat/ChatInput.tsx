import { useState, type FormEvent } from 'react'
import { Smile, Paperclip, SendHorizontal } from 'lucide-react'

export function ChatInput({ onSend }: { onSend: (text: string) => void }) {
  const [value, setValue] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = value.trim()
    if (!trimmed) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 px-4 py-4 border-t border-white/8">
      <button
        type="button"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 flex-shrink-0 transition-colors"
        aria-label="Add emoji"
      >
        <Smile className="w-5 h-5" />
      </button>
      <button
        type="button"
        className="w-10 h-10 rounded-xl flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-white/5 flex-shrink-0 transition-colors"
        aria-label="Attach file"
      >
        <Paperclip className="w-5 h-5" />
      </button>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type a message…"
        className="flex-1 rounded-full bg-white/[0.04] border border-white/10 px-5 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
      />
      <button
        type="submit"
        disabled={!value.trim()}
        className="w-10 h-10 rounded-xl glow-button flex items-center justify-center flex-shrink-0 disabled:opacity-40 disabled:pointer-events-none transition-opacity"
        aria-label="Send message"
      >
        <SendHorizontal className="w-[18px] h-[18px] text-on-primary" />
      </button>
    </form>
  )
}
