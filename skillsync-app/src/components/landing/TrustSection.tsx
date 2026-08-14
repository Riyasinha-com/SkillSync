import { Star } from 'lucide-react'

export function TrustSection() {
  return (
    <section id="community" className="relative py-20 border-y border-white/8 bg-surface-container-lowest/40">
      <div className="max-w-(--container-max) mx-auto px-5 md:px-16 text-center">
        <h2 className="font-mono-label text-xs text-on-surface-variant mb-10">
          Trusted by a growing community of learners and mentors
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {['UX Design', 'Spanish', 'Guitar', 'Python', 'Photography', 'Public Speaking'].map(
            (skill) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm glass-panel text-on-surface-variant"
              >
                {skill}
              </span>
            )
          )}
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4">
          <div className="flex -space-x-3">
            {['A', 'M', 'J', 'S'].map((letter, i) => (
              <div
                key={letter}
                className="w-11 h-11 rounded-full border-2 border-surface flex items-center justify-center text-xs font-bold"
                style={{
                  background: `linear-gradient(135deg, var(--color-primary-container), var(--color-secondary-container))`,
                  zIndex: 4 - i,
                }}
              >
                {letter}
              </div>
            ))}
          </div>
          <p className="text-sm text-on-surface flex items-center gap-1.5">
            <Star className="w-4 h-4 text-tertiary fill-tertiary" />
            <span className="font-semibold">4.9/5</span>
            <span className="text-on-surface-variant">average mentor rating</span>
          </p>
        </div>
      </div>
    </section>
  )
}
