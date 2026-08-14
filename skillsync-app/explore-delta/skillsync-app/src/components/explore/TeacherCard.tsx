import { Link } from 'react-router-dom'
import { BadgeCheck, MapPin, Star, MessageCircle } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { Teacher } from '@/data/exploreMock'

export function TeacherCard({ teacher }: { teacher: Teacher }) {
  return (
    <GlassCard interactive className="p-6 flex flex-col gap-5">
      <div className="flex items-start gap-4">
        <Avatar name={teacher.name} size="lg" />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display font-semibold text-on-surface truncate">{teacher.name}</h3>
            {teacher.verified && (
              <BadgeCheck className="w-4 h-4 text-tertiary flex-shrink-0" aria-label="Verified" />
            )}
          </div>
          <p className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
            <MapPin className="w-3 h-3" />
            {teacher.location}
          </p>
          <p className="flex items-center gap-1 text-xs text-on-surface-variant mt-1">
            <Star className="w-3.5 h-3.5 text-tertiary fill-tertiary" />
            <span className="text-on-surface font-medium">{teacher.rating}</span>
          </p>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant leading-relaxed">{teacher.bio}</p>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Teaches</p>
        <div className="flex flex-wrap gap-1.5">
          {teacher.teaches.map((s) => (
            <Badge key={s.name} variant="primary" size="sm">
              {s.name}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">Wants to learn</p>
        <div className="flex flex-wrap gap-1.5">
          {teacher.wants.map((s) => (
            <Badge key={s} variant="secondary" size="sm">
              {s}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {teacher.availability.map((a) => (
          <Badge key={a} variant="tertiary" size="sm">
            {a}
          </Badge>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
        <Link to={`/profile?u=${teacher.id}`} className="flex-1">
          <Button variant="glass" size="sm" className="w-full">
            View Profile
          </Button>
        </Link>
        <Button variant="magical" size="sm" className="flex-1">
          Request Swap
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="flex-1 disabled:hover:border-outline-variant disabled:hover:text-on-surface-variant"
          disabled={!teacher.matched}
          title={teacher.matched ? undefined : 'Available once you match'}
        >
          <MessageCircle className="w-4 h-4" />
          Message
        </Button>
      </div>
    </GlassCard>
  )
}
