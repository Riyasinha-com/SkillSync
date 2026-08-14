import { Search, Bell, MessageSquare, Menu, Flame } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { Avatar } from '@/components/ui/Avatar'
import { Badge } from '@/components/ui/Badge'

interface TopbarProps {
  onMenuClick: () => void
  userName: string
  userAvatar?: string
  xp: number
  level: string
}

export function Topbar({
  onMenuClick,
  userName,
  userAvatar,
  xp,
  level,
}: TopbarProps) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-4 px-5 md:px-8 py-4 glass-panel border-x-0 border-t-0">
      <button
        onClick={onMenuClick}
        className="lg:hidden text-on-surface p-1 -ml-1"
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      <div className="relative flex-1 max-w-md hidden sm:block">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant/60" />
        <input
          type="search"
          placeholder="Search skills, people, sessions…"
          className="w-full rounded-xl bg-white/[0.04] border border-white/10 pl-10 pr-4 py-2.5 text-sm text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary/50 focus:bg-white/[0.06] focus:ring-2 focus:ring-primary/15 transition-all"
        />
      </div>

      <div className="flex-1 sm:hidden" />

      <div className="flex items-center gap-2 md:gap-3 ml-auto">

        <NavLink
          to="/profile"
          aria-label="View profile"
          className="hidden md:inline-flex"
        >
          <Badge
            variant="tertiary"
            size="sm"
            className="normal-case font-body glass-panel glass-hover cursor-pointer transition-all duration-200 hover:scale-105"
          >
            <Flame className="w-3.5 h-3.5" />
            {xp} XP · {level}
          </Badge>
        </NavLink>

        <NavLink
          to="/chat"
          aria-label="Messages"
          className="relative w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <MessageSquare className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-tertiary" />
        </NavLink>

        <NavLink
          to="/notifications"
          aria-label="Notifications"
          className="relative w-10 h-10 rounded-xl glass-panel glass-hover flex items-center justify-center text-on-surface-variant hover:text-on-surface cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-primary" />
        </NavLink>

        <NavLink
          to="/profile"
          aria-label="Profile"
          className="rounded-full glass-hover cursor-pointer transition-all duration-200 hover:scale-105"
        >
          <Avatar
  name={userName}
  src={userAvatar}
  size="sm"
  status="online"
/>
        </NavLink>

      </div>
    </header>
  )
}