# Supporting Pages — delta package

Edit Profile, Skill Details, Notifications, Settings, and the 404 page — the last five
from the original SkillSync page list. Drop these files into your existing `skillsync-app/src`
tree, preserving paths. No Landing, Auth, Dashboard, Explore Skills, User Profile, Matches,
Chat, Session Scheduler, Reviews & Achievements, or Admin files were touched or regenerated.

## New primitives (in `components/ui/`, additive — nothing existing changed)
- `Textarea.tsx` — same visual language as `Input`, used by the Bio field
- `Switch.tsx` — pill toggle used throughout Settings

## 1. Edit Profile
- `data/editProfileMock.ts`, `pages/EditProfilePage.tsx`
- `components/edit-profile/AvatarUploadCard.tsx` — visual-only photo change
- `components/edit-profile/FormSection.tsx` — shared section wrapper
- `components/edit-profile/TagInput.tsx` — reusable chip input, powers both Skills and Languages
- `components/edit-profile/EducationList.tsx` — add/remove entries
- `components/edit-profile/SocialLinksSection.tsx` — LinkedIn/X/GitHub/Website
- `components/edit-profile/PortfolioLinksInput.tsx` — add/remove entries
- Save simulates an async request (loading → success → redirects to `/profile`); Cancel links straight back

## 2. Skill Details
- `data/skillDetailsMock.ts`, `pages/SkillDetailsPage.tsx`
- `components/skill-details/RoadmapSteps.tsx`, `PersonMiniRow.tsx`
- Reuses `explore/TeacherCard` for Related Mentors and `profile/SessionsList` / `reviews/ReviewEntryCard` for Sessions/Reviews — mentors, learners, sessions, and reviews are all derived by filtering the existing Explore/Profile/Reviews mock data by skill name, not duplicated

## 3. Notifications
- `data/notificationsMock.ts`, `pages/NotificationsPage.tsx`, `components/notifications/NotificationItem.tsx`
- All / Unread / Read filter, mark-as-read (click), mark-all-read, delete, empty state — all real state

## 4. Settings
- `data/settingsMock.ts`, `pages/SettingsPage.tsx`
- `components/settings/SettingsTabs.tsx`, `AccountSection.tsx`, `AppearanceSection.tsx`,
  `NotificationSettingsSection.tsx`, `PrivacySection.tsx`, `SecuritySection.tsx`, `ConnectedAccountsSection.tsx`
- Password change reuses the same `PasswordInput`/`PasswordRequirements`/validation helpers as Login/Register, with the same loading → success pattern
- Appearance intentionally shows one real theme ("Celestial Dark," active) and Light marked "Coming soon" rather than faking a working toggle for a theme that doesn't exist yet

## 5. 404
- `pages/NotFoundPage.tsx` — Back Home (→ `/`) and Go Back (browser history) buttons

## Reused, not duplicated
- `components/ui/*` (GlassCard, Badge, Button, Avatar, Alert, Input, ProgressBar)
- `components/explore/FilterChip.tsx`, `TeacherCard.tsx`, `CATEGORY_ICONS`, `TIMEZONES`
- `components/profile/SessionsList.tsx`
- `components/reviews/ReviewEntryCard.tsx`
- `components/form/PasswordInput.tsx`, `PasswordRequirements.tsx`, and `lib/validation.ts`
- `components/dashboard/SectionHeader.tsx`

## A note on icons
Lucide's brand/logo icons (`Github`, `Linkedin`, `Twitter`, `Chrome`) aren't available in the
version of `lucide-react` already installed in this project — they were swapped for generic
equivalents (`FolderGit2`, `Briefcase`, `AtSign`, `Globe`) so the build stays green without
touching `package.json`.

## Modified files (minimal, additive only)
- `App.tsx` — added the 5 new page imports and swapped them in for their placeholder routes
  (`/profile/edit`, `/skills/:id`, `/notifications`, `/settings`, and the catch-all `*`).
  Nothing else changed.
