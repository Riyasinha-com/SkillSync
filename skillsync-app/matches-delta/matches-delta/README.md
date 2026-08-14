# Matches — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, Explore Skills, or User Profile files were touched or regenerated.

## New files
- `data/matchesMock.ts` — pending/accepted/completed match records, summary counts
- `components/matches/MatchTabs.tsx` — Pending / Accepted / Completed, with live counts
- `components/matches/MatchCardBase.tsx` — shared card shell (photo, name, rating, match %, teaches/wants) used by all three status cards
- `components/matches/PendingMatchCard.tsx` — Accept / Decline
- `components/matches/AcceptedMatchCard.tsx` — Chat / Schedule / View Profile
- `components/matches/CompletedMatchCard.tsx` — completion date, session summary, Leave a Review
- `components/matches/MatchDetailsSidebar.tsx` — compatibility score, skills you teach/learn, mutual interests, availability overlap for the selected match
- `components/matches/MatchesEmptyState.tsx`
- `pages/MatchesPage.tsx` — assembles all of the above

## Reused, not duplicated
- `components/dashboard/StatCard.tsx` for the four summary cards (read-only import)
- `components/ui/*` primitives (GlassCard, Badge, Button, Avatar, CircularProgress)

## Functional, not just static
- Accept moves a match from Pending to Accepted (and switches the tab there)
- Decline removes the match from the list
- Clicking any card selects it and populates the Match Details sidebar

## Modified files (minimal, additive only)
- `App.tsx` — added the `MatchesPage` import and swapped it in for the `/matches` placeholder route. Nothing else changed.
