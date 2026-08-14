import { NavLink, useNavigate, useLocation } from 'react-router-dom'
import {
  Sparkles,
  LayoutDashboard,
  Compass,
  Users,
  MessageSquare,
  CalendarClock,
  BookOpen,
  Star,
  Trophy,
  User,
  Settings,
  LogOut,
  Shield,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { label: 'Dashboard', to: '/dashboard', icon: LayoutDashboard },
  { label: 'Explore Skills', to: '/explore', icon: Compass },
  { label: 'My Matches', to: '/matches', icon: Users },
  { label: 'Messages', to: '/chat', icon: MessageSquare },
  { label: 'Sessions', to: '/calendar', icon: CalendarClock },
  { label: 'Resources', to: '/resources', icon: BookOpen },
  { label: 'Reviews', to: '/reviews', icon: Star },
  { label: 'Achievements', to: '/achievements', icon: Trophy },
  { label: 'Admin', to: '/admin', icon: Shield },
]

const FOOTER_ITEMS = [
  { label: 'Profile', to: '/profile', icon: User },
  { label: 'Settings', to: '/settings', icon: Settings },
]

interface SidebarProps {
  open: boolean
  onClose: () => void
}

function NavItem({
  label,
  to,
  icon: Icon,
  onNavigate,
}: {
  label: string
  to: string
  icon: typeof LayoutDashboard
  onNavigate: () => void
}) {
  const { pathname, search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const isViewingAnotherProfile =
    to === '/profile' &&
    pathname === '/profile' &&
    searchParams.has('u')

  return (
    <NavLink
      to={to}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200',
          isActive && !isViewingAnotherProfile
            ? 'bg-primary/12 text-primary border border-primary/20'
            : 'text-on-surface-variant hover:text-on-surface hover:bg-white/5 border border-transparent'
        )
      }
    >
      <Icon className="w-[18px] h-[18px]" />
      {label}
    </NavLink>
  )
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate()

const handleLogout = () => {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  navigate("/login")
}
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      <aside
        className={cn(
          'fixed top-0 left-0 z-50 h-screen w-72 flex flex-col glass-panel-raised rounded-none lg:rounded-r-[2rem]',
          'transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-display text-lg font-bold text-on-surface">SkillSync</span>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden text-on-surface-variant p-1"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col gap-1 px-4 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
        </nav>

        <div className="flex flex-col gap-1 px-4 py-4 border-t border-white/8">
          {FOOTER_ITEMS.map((item) => (
            <NavItem key={item.to} {...item} onNavigate={onClose} />
          ))}
         <button
  onClick={handleLogout}
  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-on-surface-variant hover:text-error hover:bg-error/10 transition-all duration-200"
>
            <LogOut className="w-[18px] h-[18px]" />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
