import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { OrbitMatch } from './OrbitMatch'

export function Hero() {
  return (
    <section className="relative pt-40 md:pt-52 pb-20 px-5 md:px-16 max-w-(--container-max) mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Badge variant="primary" className="mb-8">
          Peer-to-peer learning
        </Badge>
        <h1 className="font-display text-[2.5rem] leading-[1.1] md:text-6xl md:leading-[1.05] font-bold mb-6 max-w-4xl mx-auto text-gradient-primary">
          Learn skills. Teach skills. Grow together.
        </h1>
        <p className="text-on-surface-variant max-w-xl mx-auto mb-10 text-base md:text-lg leading-relaxed">
          Trade what you know for what you want to learn. No courses to buy — just people,
          matched by mutual skill, meeting in a calm and focused space.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="magical" size="lg" className="group">
            Find a skill partner
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button variant="glass" size="lg">
            Explore skills
          </Button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <OrbitMatch />
      </motion.div>
    </section>
  )
}
