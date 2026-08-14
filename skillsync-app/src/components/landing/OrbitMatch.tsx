import { motion } from 'framer-motion'
import { Paintbrush, Code2, Camera, Guitar, Globe, Dumbbell, Sparkles } from 'lucide-react'

/**
 * The signature element of the landing page.
 *
 * SkillSync's core mechanic is a *mutual* match: what you teach meets
 * what someone else wants to learn. Rather than a generic dashboard
 * screenshot, this renders two rings of skill icons orbiting in
 * opposite directions around a shared center — visualising two
 * people's skill sets rotating into alignment.
 */
const OUTER_SKILLS = [Code2, Camera, Guitar, Globe]
const INNER_SKILLS = [Paintbrush, Dumbbell]

export function OrbitMatch() {
  return (
    <div className="relative w-full h-[380px] md:h-[440px] flex items-center justify-center">
      {/* Outer ring */}
      <motion.div
        className="absolute w-[320px] h-[320px] md:w-[400px] md:h-[400px] rounded-full border border-primary/20"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {OUTER_SKILLS.map((Icon, i) => {
          const angle = (i / OUTER_SKILLS.length) * 2 * Math.PI
          const radius = 50
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-12 h-12 -mt-6 -ml-6 rounded-2xl glass-panel-raised flex items-center justify-center"
              style={{
                transform: `translate(${radius * Math.cos(angle)}%, ${radius * Math.sin(angle)}%)`,
              }}
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
              >
                <Icon className="w-5 h-5 text-primary" />
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Inner ring, opposite direction */}
      <motion.div
        className="absolute w-[180px] h-[180px] md:w-[220px] md:h-[220px] rounded-full border border-tertiary/25"
        animate={{ rotate: -360 }}
        transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
      >
        {INNER_SKILLS.map((Icon, i) => {
          const angle = (i / INNER_SKILLS.length) * 2 * Math.PI
          const radius = 50
          return (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 w-10 h-10 -mt-5 -ml-5 rounded-xl glass-panel flex items-center justify-center"
              style={{
                transform: `translate(${radius * Math.cos(angle)}%, ${radius * Math.sin(angle)}%)`,
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: 'linear' }}
              >
                <Icon className="w-4 h-4 text-tertiary" />
              </motion.div>
            </div>
          )
        })}
      </motion.div>

      {/* Center match node */}
      <motion.div
        className="relative w-20 h-20 rounded-full glow-button flex items-center justify-center z-10"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="w-8 h-8 text-on-primary" />
        <div className="absolute inset-0 rounded-full bg-primary/40 blur-2xl -z-10" />
      </motion.div>
    </div>
  )
}
