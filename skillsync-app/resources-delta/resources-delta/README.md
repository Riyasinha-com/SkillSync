# Module 12 — Resources

Drop these files into your existing `skillsync-app/src` tree, preserving paths.

**No existing file was touched, modified, or regenerated.** Specifically confirmed untouched:
`App.tsx`, `Sidebar.tsx`, `Topbar.tsx`, `Avatar.tsx`, and every file from Modules 01–11. Your
manual customizations to those four files (Admin nav entry in Sidebar, clickable
XP-badge/chat/notifications/avatar in Topbar, pointer cursor on Avatar) are untouched — this
package was built and verified against your actual uploaded versions of those files, not
regenerated copies.

`Sidebar.tsx` already has a `Resources` nav item pointing at `/resources` — nothing to add
there.

## New files

- `data/resourcesMock.ts` — 22 realistic resources across all 19 requested categories and all
  9 resource types (Article/Video/Course/Book/PDF/GitHub/Documentation/Website/Podcast),
  plus Continue Learning progress, Recently Viewed, the Featured resource, learning quotes,
  streak/weekly-progress numbers
- `components/resources/categoryIcons.ts` — one icon per `ResourceCategory`
- `components/resources/ResourceTypeBadge.tsx` — icon + label badge per resource type
- `components/resources/ResourceCard.tsx` — the core reusable card (thumbnail-icon, type +
  difficulty + premium badges, title, description, author/source, tags, optional progress bar,
  bookmark toggle, Open button) — used by every section on the page
- `components/resources/FeaturedResourceCard.tsx` — large hero card for the featured
  learning path
- `components/resources/ResourceScrollRow.tsx` — horizontal-scroll wrapper (reuses the
  `.scrollbar-none` utility Module 04 already added to `index.css` — no new CSS needed)
- `components/resources/ResourceFiltersBar.tsx` — sort (Newest/Popular), difficulty, pricing,
  and category filters, built on your existing `explore/FilterChip`
- `components/resources/ResourcesHero.tsx` — greeting, search bar, quote, featured-path teaser
- `pages/ResourcesPage.tsx` — assembles Hero, quick stats, Featured Resource, Recommended
  for You, Continue Learning, Recently Viewed, Popular This Week, New This Week, and the
  filterable Resource Library

## Reused, not duplicated

- `components/ui/*` (GlassCard, Badge, Button, ProgressBar)
- `components/explore/FilterChip.tsx`
- `components/dashboard/StatCard.tsx`, `SectionHeader.tsx`
- The `.scrollbar-none` utility already in `index.css` (Module 04) — no CSS changes in this
  package

## Functional, not just static

- Search (in the hero) filters the Resource Library live, matching title/description/tags
- Category, difficulty, and pricing filters combine with search; sort toggles between Newest
  and Popular
- Bookmark toggles on every card are real local state (`Set<string>`), reflected instantly in the
  "Bookmarks Saved" stat card
- Continue Learning progress bars render from real per-resource progress data
- Empty state shows for real when a search/filter combination has no matches

## Premium touches included (kept restrained, per the brief)

Editor's Choice, AI Pick, Community Recommended, and Trending each render as a small inline
label only on the specific cards that have them — not a separate cluttering section. Learning
Streak and Weekly Progress are folded into the existing quick-stats row pattern already used on
Dashboard/Profile/Matches/Admin, rather than a new bespoke widget.

## App.tsx changes required (apply manually — do not regenerate the file)

Add this import alongside the others:

```tsx
import ResourcesPage from '@/pages/ResourcesPage'
```

Replace only this one route (currently the `ComingSoon` placeholder):

```tsx
<Route path="/resources" element={<AppLayout><ResourcesPage /></AppLayout>} />
```

Nothing else in `App.tsx` changes.

## Verified

- `npx tsc -b` — clean
- `npx vite build` — clean (bundle-size advisory only, same as prior modules)
- Build-tested with your actual customized `Sidebar.tsx`, `Topbar.tsx`, `Avatar.tsx`, and
  `App.tsx` in place, then `App.tsx` reverted to byte-identical with your upload before
  packaging this ZIP (confirmed via diff) — so this package ships with **zero** modified
  existing files, exactly as instructed.
