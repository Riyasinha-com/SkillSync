import { Sparkles } from 'lucide-react'

const COLUMNS = [
  {
    title: 'Product',
    links: ['Explore skills', 'How it works', 'Achievements', 'Pricing'],
  },
  {
    title: 'Community',
    links: ['Mentors', 'Success stories', 'Guidelines', 'Blog'],
  },
  {
    title: 'Support',
    links: ['Help center', 'Contact us', 'Trust & safety', 'Status'],
  },
]

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 mt-24">
      <div className="max-w-(--container-max) mx-auto px-5 md:px-16 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-display text-lg font-bold text-on-surface">SkillSync</span>
            </div>
            <p className="text-sm text-on-surface-variant max-w-xs leading-relaxed">
              A peer-to-peer skill swapping platform. Learn skills. Teach skills. Grow together.
            </p>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-mono-label text-xs text-on-surface-variant/70 mb-4">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-on-surface-variant hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 pt-8 border-t border-white/8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-on-surface-variant/60">
            © {new Date().getFullYear()} SkillSync. Boundless learning, one swap at a time.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-on-surface-variant/60 hover:text-primary">
              Terms
            </a>
            <a href="#" className="text-xs text-on-surface-variant/60 hover:text-primary">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
