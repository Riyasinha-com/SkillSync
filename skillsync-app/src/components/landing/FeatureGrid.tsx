import { Sparkles, MessagesSquare, CalendarClock, ShieldCheck, LineChart } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'

const FEATURES = [
  {
    icon: Sparkles,
    title: 'Mutual skill matching',
    desc: 'We surface people whose "wants" line up with your "teaches" — and vice versa.',
    tint: 'text-primary bg-primary-container/20',
  },
  {
    icon: MessagesSquare,
    title: 'Real-time chat',
    desc: 'Message your match directly to plan a session before you ever schedule anything.',
    tint: 'text-secondary bg-secondary-container/40',
  },
  {
    icon: CalendarClock,
    title: 'Session scheduling',
    desc: 'Share availability, book a time that works across timezones, and get reminders.',
    tint: 'text-tertiary bg-tertiary-container/50',
  },
  {
    icon: ShieldCheck,
    title: 'Verified reviews',
    desc: 'Every session can end in a review, so trust builds with every swap you complete.',
    tint: 'text-error bg-error-container/20',
  },
]

export function FeatureGrid() {
  return (
    <section id="how-it-works" className="relative py-20 md:py-28 px-5 md:px-16 max-w-(--container-max) mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-4">
        <div className="max-w-xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold mb-3 text-on-surface">
            Everything a skill swap needs
          </h2>
          <p className="text-on-surface-variant">
            One quiet space to find a match, talk it through, and follow your progress —
            nothing else competing for your attention.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {FEATURES.map((f) => (
          <GlassCard key={f.title} interactive className="p-8 flex flex-col gap-5">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${f.tint}`}>
              <f.icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold mb-2 text-on-surface">
                {f.title}
              </h3>
              <p className="text-sm text-on-surface-variant leading-relaxed">{f.desc}</p>
            </div>
          </GlassCard>
        ))}

        {/* Progress tracking — spans two columns to feature it, mirrors the
            Stitch reference but with real, animated progress state */}
        <GlassCard interactive className="p-8 flex flex-col justify-between md:col-span-2 relative overflow-hidden">
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-primary-container/20 flex items-center justify-center mb-5">
              <LineChart className="w-5 h-5 text-primary" />
            </div>
            <h3 className="font-display text-xl font-semibold mb-2 text-on-surface">
              Progress tracking
            </h3>
            <p className="text-sm text-on-surface-variant max-w-sm leading-relaxed">
              Every skill you're learning gets its own timeline, so you can see exactly how
              far a swap has taken you.
            </p>
          </div>
          <div className="relative z-10 mt-8 flex gap-2">
            <div className="h-1.5 flex-1 bg-primary/15 rounded-full overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[75%]" />
            </div>
            <div className="h-1.5 flex-1 bg-tertiary/15 rounded-full overflow-hidden">
              <div className="h-full bg-tertiary rounded-full w-[40%]" />
            </div>
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        </GlassCard>
      </div>
    </section>
  )
}
