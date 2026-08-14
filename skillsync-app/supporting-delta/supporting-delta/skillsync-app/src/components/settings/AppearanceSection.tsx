import { Moon, Sun } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { cn } from '@/lib/utils'

/** SkillSync currently ships one theme — this reflects that honestly rather than faking a toggle. */
export function AppearanceSection() {
  return (
    <GlassCard className="p-6 flex flex-col gap-5">
      <div>
        <h3 className="font-display font-semibold text-on-surface">Theme</h3>
        <p className="text-xs text-on-surface-variant mt-0.5">Choose how SkillSync looks on this device.</p>
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <div className="rounded-xl border-2 border-primary/40 bg-primary/8 p-4 flex flex-col items-center gap-2 cursor-default">
          <Moon className="w-5 h-5 text-primary" />
          <span className="text-sm font-medium text-on-surface">Celestial Dark</span>
          <span className="text-[11px] text-primary">Active</span>
        </div>
        <div
          className={cn(
            'rounded-xl border border-white/10 p-4 flex flex-col items-center gap-2 opacity-40 cursor-not-allowed'
          )}
        >
          <Sun className="w-5 h-5 text-on-surface-variant" />
          <span className="text-sm font-medium text-on-surface-variant">Light</span>
          <span className="text-[11px] text-on-surface-variant/60">Coming soon</span>
        </div>
      </div>
    </GlassCard>
  )
}
