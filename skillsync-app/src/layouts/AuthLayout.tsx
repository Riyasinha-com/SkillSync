import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Sparkles, Star } from 'lucide-react'

const TESTIMONIAL = {
  quote:
    'I taught conversational Spanish and walked away three months later actually able to read music. Best trade I never paid for.',
  name: 'Priya N.',
  role: 'Traded Spanish for Piano',
}

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative z-10 min-h-screen flex">
      {/* Form panel */}
      <div className="w-full lg:w-[46%] flex flex-col min-h-screen px-6 md:px-16 py-10">
        <Link to="/" className="flex items-center gap-2 mb-auto">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-lg font-bold text-on-surface">SkillSync</span>
        </Link>
        <div className="flex-1 flex items-center py-12">
          <div className="w-full max-w-sm mx-auto lg:mx-0">{children}</div>
        </div>
      </div>

      {/* Brand panel — desktop only */}
      <div className="hidden lg:flex lg:w-[54%] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 glass-panel rounded-l-[2.5rem] m-4" />
        <div className="relative z-10 max-w-md text-center">
          <div className="flex justify-center gap-1 mb-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <Star key={i} className="w-4 h-4 text-tertiary fill-tertiary" />
            ))}
          </div>
          <p className="font-display text-2xl leading-snug text-on-surface mb-8">
            "{TESTIMONIAL.quote}"
          </p>
          <p className="text-sm font-semibold text-on-surface">{TESTIMONIAL.name}</p>
          <p className="text-xs text-on-surface-variant">{TESTIMONIAL.role}</p>
        </div>
      </div>
    </div>
  )
}
