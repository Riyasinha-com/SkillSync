# User Profile — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, or Explore Skills files were touched or regenerated.

## New files
- `data/profileMock.ts` — profile info, stats, teach skills, learning goals, availability, recent sessions, reviews, achievements, account preview
- `components/profile/ProfileHeader.tsx` — avatar, name, badges, bio, location/timezone/join date, rating, Edit/Share actions (Share copies a profile link to the clipboard)
- `components/profile/ProfileSkillCard.tsx` — teach-skill card with edit/delete (delete is wired to real local state removal)
- `components/profile/ProfileLearningGoalCard.tsx` — learning goal card with priority badge, progress bar, preferred method
- `components/profile/AvailabilityScheduler.tsx` — day/time-slot chips, timezone select, meeting platform picker, all wired to local state
- `components/profile/SessionsList.tsx` — recent sessions with status badges
- `components/profile/ReviewCard.tsx`
- `components/profile/ProfileAchievementBadge.tsx` — self-contained (a new component rather than extending the Dashboard's achievement badge, to avoid touching Dashboard files)
- `pages/ProfilePage.tsx` — assembles all of the above

## Reused, not duplicated
- `components/dashboard/SectionHeader.tsx` and `components/dashboard/StatCard.tsx` (read-only import, not modified)
- `components/explore/FilterChip.tsx` (used for the availability day/time-slot/platform toggles)
- `data/exploreMock.ts`'s `CATEGORY_ICONS`/`Category`/`TIMEZONES` (read-only import)
- `components/ui/*` primitives (GlassCard, Badge, Button, Avatar, ProgressBar)

## Modified files (minimal, additive only)
- `App.tsx` — added the `ProfilePage` import and swapped it in for the `/profile` placeholder route. Nothing else changed.
