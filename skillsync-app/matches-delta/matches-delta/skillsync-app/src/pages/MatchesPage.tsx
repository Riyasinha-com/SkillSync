import { useMemo, useState } from 'react'
import { Clock, Users2, CheckCircle2, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/dashboard/StatCard'
import { MatchTabs } from '@/components/matches/MatchTabs'
import { PendingMatchCard } from '@/components/matches/PendingMatchCard'
import { AcceptedMatchCard } from '@/components/matches/AcceptedMatchCard'
import { CompletedMatchCard } from '@/components/matches/CompletedMatchCard'
import { MatchDetailsSidebar } from '@/components/matches/MatchDetailsSidebar'
import { MatchesEmptyState } from '@/components/matches/MatchesEmptyState'
import { MATCHES, MATCH_SUMMARY, type MatchStatus, type PersonMatch } from '@/data/matchesMock'

export default function MatchesPage() {
  const [matches, setMatches] = useState<PersonMatch[]>(MATCHES)
  const [tab, setTab] = useState<MatchStatus>('pending')
  const [selectedId, setSelectedId] = useState<string | null>(null)

  const counts = useMemo(
    () => ({
      pending: matches.filter((m) => m.status === 'pending').length,
      accepted: matches.filter((m) => m.status === 'accepted').length,
      completed: matches.filter((m) => m.status === 'completed').length,
    }),
    [matches]
  )

  const visibleMatches = matches.filter((m) => m.status === tab)
  const selectedMatch = matches.find((m) => m.id === selectedId) ?? null

  function handleAccept(id: string) {
    setMatches((list) =>
      list.map((m) => (m.id === id ? { ...m, status: 'accepted', acceptedDate: 'Just now' } : m))
    )
    setTab('accepted')
    setSelectedId(id)
  }

  function handleDecline(id: string) {
    setMatches((list) => list.filter((m) => m.id !== id))
    if (selectedId === id) setSelectedId(null)
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
          <StatCard label="Success Rate" value={`${MATCH_SUMMARY.successRate}%`} icon={TrendingUp} tint="primary" />
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
                      onAccept={handleAccept}
                      onDecline={handleDecline}
                    />
                  )
                }
                if (match.status === 'accepted') {
                  return (
                    <AcceptedMatchCard key={match.id} match={match} selected={selected} onSelect={onSelect} />
                  )
                }
                return (
                  <CompletedMatchCard key={match.id} match={match} selected={selected} onSelect={onSelect} />
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
