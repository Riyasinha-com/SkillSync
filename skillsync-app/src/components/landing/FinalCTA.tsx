import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { GlassCard } from '@/components/ui/GlassCard'

export function FinalCTA() {
  return (
    <section className="relative py-24 px-5 md:px-16">
      <GlassCard
        raised
        className="max-w-4xl mx-auto p-10 md:p-20 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary-container/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-5 text-on-surface">
            Ready to swap your first skill?
          </h2>
          <p className="text-on-surface-variant max-w-lg mx-auto mb-10 text-base md:text-lg">
            Set up your profile, list what you teach and what you want to learn, and see
            your first matches in minutes.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <Button variant="magical" size="lg">
              Get started free
            </Button>
            <button className="text-on-surface hover:text-primary transition-colors flex items-center gap-1 text-sm font-medium">
              See how it works
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </GlassCard>
    </section>
  )
}
