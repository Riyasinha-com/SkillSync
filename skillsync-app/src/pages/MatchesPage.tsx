import { Clock, Users2, CheckCircle2, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { MatchTabs } from '@/components/matches/MatchTabs'
import { PendingMatchCard } from '@/components/matches/PendingMatchCard'
import { AcceptedMatchCard } from '@/components/matches/AcceptedMatchCard'
import { CompletedMatchCard } from '@/components/matches/CompletedMatchCard'
import { MatchDetailsSidebar } from '@/components/matches/MatchDetailsSidebar'
import { MatchesEmptyState } from '@/components/matches/MatchesEmptyState'
import { useEffect, useState } from 'react'
import api from '@/api/api'
import type { MatchStatus, PersonMatch } from '@/data/matchesMock'

export default function MatchesPage() {
  
const [sentRequests, setSentRequests] = useState<any[]>([])
const [receivedRequests, setReceivedRequests] = useState<any[]>([])
const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<MatchStatus>('pending')
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [reviewedMatchIds, setReviewedMatchIds] = useState<Set<string>>(
  new Set()
)
  
const fetchMatches = async () => {
  try {
    const [
  sentRes,
  receivedRes,
  reviewsRes,
] = await Promise.all([
  api.get("/matches/sent"),
  api.get("/matches/received"),
  api.get("/reviews/my"),
])

    setSentRequests(sentRes.data)
    setReceivedRequests(receivedRes.data)

    // Reviews already submitted by the current user
    const myReviews = Array.isArray(reviewsRes.data)
      ? reviewsRes.data
      : []

      

    const reviewedIds = new Set<string>()

myReviews.forEach((review: any) => {
  const matchId =
    typeof review.session?.match === "string"
      ? review.session.match
      : review.session?.match?._id

  if (matchId) {
    reviewedIds.add(matchId)
  }
})




setReviewedMatchIds(reviewedIds)
   

  } catch (err) {
    console.error(err)
  } finally {
    setLoading(false)
  }
}  

useEffect(() => {
  void fetchMatches()
}, [])



 const counts = {
  pending:
  sentRequests.filter((m) => m.status === "Pending").length +
  receivedRequests.filter((m) => m.status === "Pending").length,
  accepted:
    sentRequests.filter((m) => m.status === "Accepted").length +
    receivedRequests.filter((m) => m.status === "Accepted").length,

  completed:
    sentRequests.filter((m) => m.status === "Completed").length +
    receivedRequests.filter((m) => m.status === "Completed").length,
}

const getStatus = (status: string): MatchStatus => {
  switch (status?.toLowerCase()) {
    case "accepted":
      return "accepted"

    case "completed":
      return "completed"

    case "pending":
      return "pending"

    default:
      return "pending"
  }
}

const mapMatch = (
  match: any,
  isReceived = false
): PersonMatch => ({
  id: match._id,

  participantUserId: isReceived
    ? match.sender?._id
    : match.receiver?._id,

  status: getStatus(match.status),

  name: isReceived
    ? match.sender?.name ?? "Unknown User"
    : match.receiver?.name ?? "Unknown User",

  avatar: isReceived
    ? match.sender?.profilePic ?? ""
    : match.receiver?.profilePic ?? "",

  rating: 0,

  matchScore: 100,

  teaches: [
    isReceived
      ? match.senderSkill?.title ?? ""
      : match.senderSkill?.title ?? "",
  ],

  wants: [
    isReceived
      ? match.receiverSkill?.title ?? ""
      : match.receiverSkill?.title ?? "",
  ],

  requestedDate: new Date(match.createdAt).toLocaleDateString(),

  acceptedDate:
    match.status === "Accepted"
      ? new Date(match.updatedAt).toLocaleDateString()
      : "",

  completionDate:
    match.status === "Completed"
      ? new Date(match.updatedAt).toLocaleDateString()
      : "",

  sessionSummary: "",

  youTeachThemWant: [match.senderSkill?.title ?? ""],

  youLearnFromThem: [match.receiverSkill?.title ?? ""],

  mutualInterests: [],

  availabilityOverlap: [],

  raw: match,
})


  const pendingMatches: (PersonMatch & {
  requestType: "incoming" | "outgoing"
})[] = [
  ...receivedRequests
    .filter((m) => m.status === "Pending")
    .map((m) => ({
      ...mapMatch(m, true),
      requestType: "incoming" as const,
    })),

  ...sentRequests
    .filter((m) => m.status === "Pending")
    .map((m) => ({
      ...mapMatch(m),
      requestType: "outgoing" as const,
    })),
]

const acceptedMatches: PersonMatch[] = [
  ...sentRequests
    .filter((m) => m.status === "Accepted")
    .map((m) => mapMatch(m)),

  ...receivedRequests
    .filter((m) => m.status === "Accepted")
    .map((m) => mapMatch(m, true)),
]
const completedMatches: PersonMatch[] = [
  ...sentRequests
    .filter((m) => m.status === "Completed")
    .map((m) => mapMatch(m)),

  ...receivedRequests
    .filter((m) => m.status === "Completed")
    .map((m) => mapMatch(m, true)),
]

let visibleMatches: (PersonMatch & {
  requestType?: "incoming" | "outgoing"
})[] = []

switch (tab) {
  case "pending":
    visibleMatches = pendingMatches
    break

  case "accepted":
    visibleMatches = acceptedMatches
    break

  case "completed":
    visibleMatches = completedMatches
    break
}

useEffect(() => {
  if (visibleMatches.length === 0) {
    setSelectedId(null)
    return
  }

  const hasSelectedMatch = visibleMatches.some(
    (match) => match.id === selectedId
  )

  if (!hasSelectedMatch) {
    setSelectedId(visibleMatches[0].id)
  }
}, [
  tab,
  sentRequests,
  receivedRequests,
  selectedId,
  reviewedMatchIds,
])

const selectedMatch =
  visibleMatches.find((m) => m.id === selectedId) ?? null
  

 const handleAccept = async (id: string) => {
  try {
    await api.patch(`/matches/${id}/accept`)
    await fetchMatches()
    
  } catch (err) {
    console.error(err)
    alert("Failed to accept request")
  }
}
  const handleDecline = async (id: string) => {
  try {
    await api.patch(`/matches/${id}/reject`)
    await fetchMatches()
    
  } catch (err) {
    console.error(err)
    alert("Failed to reject request")
  }
}
  if (loading) {
  return (
    <div className="p-10 text-center">
      Loading matches...
    </div>
  )
}

  return (
    <div className="flex flex-col gap-10">
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-2">My Matches</h1>
        <p className="text-on-surface-variant">
          Manage your skill swap requests and learning connections.
        </p>
      </div>

      {/* Summary cards */}
      <section>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Pending Requests" value={String(counts.pending)} icon={Clock} tint="secondary" />
          <StatCard label="Accepted Matches" value={String(counts.accepted)} icon={Users2} tint="primary" />
          <StatCard label="Completed Sessions" value={String(counts.completed)} icon={CheckCircle2} tint="tertiary" />
          <StatCard label="Success Rate" value="100%" icon={TrendingUp} tint="primary" />
        </div>
      </section>

      <MatchTabs value={tab} onChange={setTab} counts={counts} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Match list */}
        <div className="lg:col-span-2 min-w-0">
          {visibleMatches.length === 0 ? (
            <MatchesEmptyState />
          ) : (
            <div className="grid sm:grid-cols-2 gap-5">
              {visibleMatches.map((match) => {
                const selected = selectedId === match.id
                const onSelect = () => setSelectedId(match.id)

                if (match.status === 'pending') {
                  return (
                    <PendingMatchCard
  key={match.id}
  match={match}
  selected={selected}
  onSelect={onSelect}
  type={match.requestType}
  onAccept={() => handleAccept(match.id)}
  onDecline={() => handleDecline(match.id)}
/>
                  )
                }
                if (match.status === 'accepted') {
                  return (
                    <AcceptedMatchCard key={match.id} match={match} selected={selected} onSelect={onSelect} />
                  )
                }
                const reviewed = reviewedMatchIds.has(match.id)

return (
  <CompletedMatchCard
    key={match.id}
    match={match}
    selected={selected}
    onSelect={onSelect}
    reviewed={reviewed}
  />
)
              })}
            </div>
          )}
        </div>

        {/* Match details sidebar */}
        <aside className="lg:sticky lg:top-24 h-fit">
          <MatchDetailsSidebar match={selectedMatch} />
        </aside>
      </div>
    </div>
  )
}
