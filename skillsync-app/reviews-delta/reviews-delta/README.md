# Reviews & Achievements — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, Explore Skills, User Profile, Matches, Chat, or Calendar files were touched or regenerated.

## New files
- `data/reviewsMock.ts` — reviews (teacher/learner role, rating, skill), rating breakdown/average helpers, achievements (grouped by Skill Milestones / Session Milestones / Community Reputation), certificates, XP/level, achievement timeline
- `components/reviews/RatingSummaryCard.tsx` — big average rating + star breakdown bars (5★–1★)
- `components/reviews/ReviewFilterBar.tsx` — search + role filter (Teacher/Learner) + star-rating filter, built on `FilterChip`
- `components/reviews/ReviewEntryCard.tsx` — reviewer, stars, comment, teaching/learning + skill badges
- `components/reviews/XPLevelCard.tsx` — level, label, XP progress toward next level
- `components/reviews/AchievementCard.tsx` — unlocked/locked badge with description and unlock date
- `components/reviews/CertificateCard.tsx` — visual-only certificate card
- `components/reviews/AchievementTimeline.tsx` — vertical timeline of unlock events
- `pages/ReviewsAchievementsPage.tsx` — assembles all of the above; combines Reviews and Achievements into one page per the spec

## Reused, not duplicated
- `components/dashboard/SectionHeader.tsx` and `components/dashboard/StatCard.tsx`
- `components/explore/FilterChip.tsx` (powers the review filters)
- `components/ui/*` primitives (GlassCard, Avatar, Badge, ProgressBar)

## Functional, not just static
- Search filters reviews by reviewer name, skill, or comment text
- Role filter (All / As Teacher / As Learner) and star-rating filter both apply live, combined with search
- Rating breakdown bars and the average are computed from the review data, not hardcoded

## Modified files (minimal, additive only)
- `App.tsx` — added the `ReviewsAchievementsPage` import and wired **both** `/reviews` and `/achievements` to it (the page combines both, per the spec, and the sidebar links to each separately). Nothing else changed.
