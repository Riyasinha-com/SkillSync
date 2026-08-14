# Session Scheduler / Calendar — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, Explore Skills, User Profile, Matches, or Chat files were touched or regenerated.

## New files
- `lib/date.ts` — a small shared `toISODate()` helper (local-date formatting, avoids a UTC day-shift bug `toISOString()` has for positive-UTC-offset timezones)
- `data/calendarMock.ts` — scheduled sessions (accepted/pending/completed/cancelled), time-slot options
- `components/calendar/CalendarViewToggle.tsx` — Month / Week switch
- `components/calendar/MonthCalendarGrid.tsx` — full month grid, navigation, status-dot markers per day, day selection
- `components/calendar/WeekScheduleStrip.tsx` — 7-day strip with per-day session chips, navigation
- `components/calendar/SessionRequestCard.tsx` — pending request card, Accept / Decline
- `components/calendar/SessionListItem.tsx` — compact row used for Today's Schedule and Upcoming Sessions, click to select
- `components/calendar/SessionDetailsPanel.tsx` — teacher/learner info, skill, date/time, platform, live countdown, Join Meeting (visual only), Cancel / Reschedule
- `components/calendar/PlatformBadge.tsx` — Google Meet / Zoom / Other indicator
- `components/calendar/TimeSlotPicker.tsx` — specific-time chip picker for proposing a session
- `pages/CalendarPage.tsx` — assembles all of the above

## Reused, not duplicated
- `components/profile/AvailabilityScheduler.tsx` for the Availability Selector section (imported directly, not modified)
- `components/explore/FilterChip.tsx` (powers `TimeSlotPicker`)
- `components/dashboard/SectionHeader.tsx`
- `components/ui/*` primitives (GlassCard, Avatar, Badge, Button)
- `data/profileMock.ts`'s `MeetingPlatform`/`AvailabilityState`/`DEFAULT_AVAILABILITY` (type/data-only import)

## Functional, not just static
- Month and week calendar navigation (prev/next/today), day selection
- Accept moves a request into Upcoming Sessions and selects it in the details panel; Decline removes it
- Cancel / Reschedule update a session's status from the details panel
- The details panel shows a live countdown for the session that has a start time
- The time-slot picker and availability scheduler are both live, controlled state

## Modified files (minimal, additive only)
- `App.tsx` — added the `CalendarPage` import and swapped it in for the `/calendar` placeholder route. Nothing else changed.
