import { useState } from 'react'
import { Camera } from 'lucide-react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Avatar } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'

/** Visual only — no real file upload. Clicking "Change Photo" just confirms the intent. */
export function AvatarUploadCard({ name }: { name: string }) {
  const [changed, setChanged] = useState(false)

  return (
    <GlassCard className="p-6 flex items-center gap-5">
      <div className="relative">
        <Avatar name={name} size="lg" className="w-20 h-20 text-xl" />
        <span className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary-container border-2 border-surface flex items-center justify-center">
          <Camera className="w-3.5 h-3.5 text-on-primary-container" />
        </span>
      </div>
      <div>
        <Button variant="glass" size="sm" onClick={() => setChanged(true)}>
          Change Photo
        </Button>
        <p className="text-[11px] text-on-surface-variant/60 mt-2">
          {changed ? 'New photo selected — save to apply it.' : 'PNG or JPG, up to 5MB.'}
        </p>
      </div>
    </GlassCard>
  )
}
