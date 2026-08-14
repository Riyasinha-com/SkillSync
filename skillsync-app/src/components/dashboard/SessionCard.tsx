import { useEffect, useState } from 'react'
import { CalendarDays, Clock, Link2, Video } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import type { UpcomingSession } from '@/data/dashboardMock'

function useCountdown(target: string) {
  const [remaining, setRemaining] = useState(() => new Date(target).getTime() - Date.now())

  useEffect(() => {
    const id = setInterval(() => {
      setRemaining(new Date(target).getTime() - Date.now())
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  if (remaining <= 0) return 'Starting now'
  const hours = Math.floor(remaining / (1000 * 60 * 60))
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60))
  const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
  if (hours > 0) return `${hours}h ${minutes}m`
  if (minutes > 0) return `${minutes}m ${seconds}s`
  return `${seconds}s`
}

export function SessionCard({ session }: { session: UpcomingSession }) {
  const countdown = useCountdown(session.startsAt)

  return (
    <GlassCard raised className="p-6 relative overflow-hidden">
      <div className="absolute right-[-30px] top-[-30px] w-40 h-40 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-semibold text-on-surface">Upcoming session</h3>
          <span className="text-xs font-mono-label px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
            {countdown}
          </span>
        </div>

        <p className="text-on-surface font-medium mb-1">{session.skill}</p>
        <p className="text-sm text-on-surface-variant mb-5">with {session.partnerName}</p>

        <div className="flex flex-col gap-3 mb-6">
          <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
            <CalendarDays className="w-4 h-4 text-primary" />
            {session.date}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
            <Clock className="w-4 h-4 text-primary" />
            {session.time}
          </div>
          <div className="flex items-center gap-2.5 text-sm text-on-surface-variant">
            <Link2 className="w-4 h-4 text-primary" />
            <span className="truncate">{session.meetLink}</span>
          </div>
        </div>

        <Button variant="magical" size="md" className="w-full">
          <Video className="w-4 h-4" />
          Join session
        </Button>
      </div>
    </GlassCard>
  )
}
