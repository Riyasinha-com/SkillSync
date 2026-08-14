import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { label: 'Explore', href: '/explore' },
  { label: 'How it Works', href: '/#how-it-works' },
  { label: 'Community', href: '/#community' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-(--container-max)',
        'rounded-full glass-panel-raised transition-all duration-300',
        scrolled ? 'py-2 bg-white/8' : 'py-3'
      )}
    >
      <div className="flex items-center justify-between px-6 md:px-8">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <Sparkles className="w-5 h-5 text-primary" />
          <span className="font-display text-lg font-bold tracking-tight text-on-surface">
            SkillSync
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button variant="magical" size="sm">
              Join free
            </Button>
          </Link>
        </div>

        <button
          className="md:hidden text-on-surface p-1"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden mt-3 mx-2 mb-2 p-4 rounded-2xl glass-panel flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-on-surface-variant hover:text-on-surface"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div className="flex flex-col gap-2 pt-2 border-t border-white/10">
            <Link to="/login">
              <Button variant="glass" size="sm" className="w-full">
                Log in
              </Button>
            </Link>
            <Link to="/register">
              <Button variant="magical" size="sm" className="w-full">
                Join free
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
