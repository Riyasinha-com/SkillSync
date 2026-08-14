# Explore Skills — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.

## New files
- `data/exploreMock.ts` — categories, featured skills, teachers, trending skills, recommended matches
- `components/explore/ExploreSearchBar.tsx`
- `components/explore/ExploreTabs.tsx` (All Skills / People / Categories)
- `components/explore/FilterChip.tsx`
- `components/explore/FiltersPanel.tsx` (category, experience level, availability, timezone, city — all wired to real filtering state)
- `components/explore/SkillCard.tsx`
- `components/explore/TeacherCard.tsx`
- `components/explore/CategoryCard.tsx`
- `components/explore/TrendingSkillsRow.tsx`
- `components/explore/RecommendedMatchCard.tsx`
- `components/explore/EmptyState.tsx`
- `pages/ExploreSkillsPage.tsx`

## Modified files (minimal, additive only)
- `App.tsx` — added the `ExploreSkillsPage` import and swapped it in for the `/explore` placeholder route. No other route or layout changed.
- `index.css` — added one small `.scrollbar-none` utility (used by the Trending Skills horizontal row) at the end of the existing `@layer utilities` block. Nothing else in the file was touched.

No files from Landing, Auth, or Dashboard were modified.
