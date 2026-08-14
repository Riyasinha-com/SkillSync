import { Link } from "react-router-dom"
import { BadgeCheck, MapPin } from "lucide-react"
import { GlassCard } from "@/components/ui/GlassCard"
import { Avatar } from "@/components/ui/Avatar"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"

interface TeacherCardProps {
  teacher: {
    _id: string
    name: string
    bio: string
    city: string
    timezone: string
    profilePic: string
    availability: {
      day: string
      slots: string[]
    }[]
  }

  onRequestSwap: (
    teacher: TeacherCardProps["teacher"]
  ) => void
}

export function TeacherCard({
  teacher,
  onRequestSwap,
}: TeacherCardProps) {
  return (
    <GlassCard
      interactive
      className="p-6 flex flex-col gap-5"
    >
      <div className="flex items-start gap-4">
        <Avatar
          name={teacher.name}
          size="lg"
        />

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h3 className="font-display font-semibold text-on-surface truncate">
              {teacher.name}
            </h3>

            <BadgeCheck
              className="w-4 h-4 text-tertiary shrink-0"
            />
          </div>

          <p className="flex items-center gap-1 text-xs text-on-surface-variant mt-0.5">
            <MapPin className="w-3 h-3" />
            {teacher.city || "City not set"}
          </p>

          <p className="text-xs text-on-surface-variant mt-1">
            {teacher.timezone || "Timezone not set"}
          </p>
        </div>
      </div>

      <p className="text-sm text-on-surface-variant leading-relaxed">
        {teacher.bio || "No bio added yet."}
      </p>

      <div>
        <p className="text-[11px] font-mono-label text-on-surface-variant/60 mb-2">
          Availability
        </p>

        <div className="flex flex-wrap gap-1.5">
          {teacher.availability.length > 0 ? (
            teacher.availability.map((slot) => (
              <Badge
                key={slot.day}
                variant="tertiary"
                size="sm"
              >
                {slot.day}
              </Badge>
            ))
          ) : (
            <span className="text-xs text-on-surface-variant">
              No availability added
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2 pt-1">
  <Link
    to={`/profile?u=${teacher._id}`}
    className="flex-1"
  >
    <Button
      variant="glass"
      size="sm"
      className="w-full"
    >
      View Profile
    </Button>
  </Link>

  <Button
  variant="magical"
  size="sm"
  className="flex-1"
  onClick={() => onRequestSwap(teacher)}
>
  Request Swap
</Button>

</div>
    </GlassCard>
  )
}