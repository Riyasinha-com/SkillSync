# Admin Panel — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, Explore Skills, User Profile, Matches, Chat, Session Scheduler,
or Reviews & Achievements files were touched or regenerated. No new npm dependencies were
added — charts are custom-built (CSS/SVG) in the same visual language as the rest of the app
rather than pulling in a charting library.

## Layout note
The Admin Panel reuses the existing `AppLayout` (same Sidebar + Topbar as every other page)
rather than introducing a separate admin shell, and organizes its eight required sections as
tabs on one page (Overview / Users / Verification / Reports / Sessions / Reviews / Analytics),
the same pattern used by Matches and Explore Skills.

## New files
- `data/adminMock.ts` — platform stats, recent activity, users, verification requests, reports, monitored sessions, moderated reviews, analytics data
- `components/admin/AdminProfileBar.tsx` — admin avatar, role badge, account settings + logout
- `components/admin/AdminTabs.tsx` — the 7-tab switcher
- `components/admin/OverviewSection.tsx` — platform stat cards + recent activity (reuses `dashboard/ActivityItem`)
- `components/admin/UserManagementSection.tsx` + `UserRow.tsx` — search, status filter, View/Suspend/Ban/Restore/Delete (delete asks for inline confirmation first)
- `components/admin/SkillVerificationSection.tsx` + `VerificationRequestCard.tsx` — proof placeholder, Approve/Reject
- `components/admin/ReportsSection.tsx` + `ReportCard.tsx` — filter by report type, Resolve
- `components/admin/SessionMonitoringSection.tsx` + `AdminSessionRow.tsx` — filter by ongoing/upcoming/completed/cancelled
- `components/admin/ReviewsModerationSection.tsx` + `ModerationReviewCard.tsx` — flagged vs. recent, Delete/Restore
- `components/admin/AnalyticsSection.tsx` + `SimpleBarChart.tsx` — user growth & sessions bar charts, top skills / most active teachers & learners ranked lists, engagement rings

## Reused, not duplicated
- `components/dashboard/StatCard.tsx`, `SectionHeader.tsx`, `ActivityItem.tsx`
- `components/explore/FilterChip.tsx` (every filter row in the panel)
- `components/ui/*` primitives (GlassCard, Avatar, Badge, Button, CircularProgress)

## Functional, not just static
- User search + status filter, and Suspend/Ban/Restore all update real state; Delete requires an inline "Confirm / Cancel" step first
- Verification Approve/Reject move a request out of the pending list
- Report Resolve flips its status
- Review Delete/Restore toggles a review's visibility (deleted reviews show a placeholder line instead of the original comment, and can be restored)
- Session monitoring filter and analytics ranked lists/bars are computed from the mock data

## Modified files (minimal, additive only)
- `App.tsx` — added the `AdminPage` import and swapped it in for the `/admin` placeholder route. Nothing else changed.
