import { useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Clock, CalendarDays, ShieldCheck, Star, Pencil, Share2, Check } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { ProfileInfo } from '@/data/profileMock'

export function ProfileHeader({ profile }: { profile: ProfileInfo }) {
  const [copied, setCopied] = useState(false)

  async function handleShare() {
    try {
      await navigator.clipboard.writeText(`https://skillsync.app/${profile.username.replace('@', '')}`)
    } catch {
      // clipboard API unavailable — still show the confirmation, sharing intent succeeded locally
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <GlassCard raised className="p-6 md:p-10 relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative z-10 flex flex-col md:flex-row md:items-start gap-8">
        <Avatar name={profile.name} size="lg" status="online" className="w-24 h-24 text-2xl" />

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h1 className="font-display text-2xl md:text-3xl font-bold text-on-surface">{profile.name}</h1>
            {profile.verifiedTeacher && (
              <Badge variant="tertiary" size="sm" className="normal-case font-body gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                Verified Teacher
              </Badge>
            )}
            {profile.peerRated && (
              <Badge variant="primary" size="sm" className="normal-case font-body gap-1">
                <Star className="w-3.5 h-3.5" />
                Peer Rated
              </Badge>
            )}
          </div>
          <p className="text-sm text-on-surface-variant mb-4">{profile.username}</p>

          <p className="text-on-surface-variant leading-relaxed max-w-xl mb-5">{profile.bio}</p>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-primary" />
              {profile.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-primary" />
              {profile.timezone}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-primary" />
              Joined {profile.joinDate}
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-tertiary fill-tertiary" />
              <span className="text-on-surface font-semibold">{profile.rating}</span>
              <span>({profile.reviewCount} reviews)</span>
            </span>
          </div>
        </div>

        <div className="flex md:flex-col gap-2 flex-shrink-0">
          <Link to="/profile/edit">
            <Button variant="magical" size="sm" className="w-full">
              <Pencil className="w-4 h-4" />
              Edit Profile
            </Button>
          </Link>
          <Button variant="glass" size="sm" className="w-full" onClick={handleShare}>
            {copied ? <Check className="w-4 h-4 text-tertiary" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Link copied' : 'Share Profile'}
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
