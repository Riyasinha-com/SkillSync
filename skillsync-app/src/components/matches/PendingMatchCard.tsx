import { Check, X, Clock3 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { MatchCardBase } from "@/components/matches/MatchCardBase"
import type { PersonMatch } from "@/data/matchesMock"

export function PendingMatchCard({
  match,
  selected,
  onSelect,
  onAccept,
  onDecline,
  type = "incoming",
}: {
  match: PersonMatch
  selected?: boolean
  onSelect?: () => void
  onAccept: (id: string) => void
  onDecline: (id: string) => void
  type?: "incoming" | "outgoing"
}) {
  return (
    <MatchCardBase
      match={match}
      selected={selected}
      onSelect={onSelect}
      metaLine={`Requested ${match.requestedDate}`}
      footer={
        type === "incoming" ? (
          <div className="flex gap-2 pt-1">
            <Button
              variant="magical"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                onAccept(match.id)
              }}
            >
              <Check className="w-4 h-4" />
              Accept Request
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation()
                onDecline(match.id)
              }}
            >
              <X className="w-4 h-4" />
              Decline
            </Button>
          </div>
        ) : (
          <div className="pt-2">
            <Button
              variant="glass"
              size="sm"
              className="w-full cursor-default"
            >
              <Clock3 className="w-4 h-4" />
              Waiting for Response
            </Button>
          </div>
        )
      }
    />
  )
}