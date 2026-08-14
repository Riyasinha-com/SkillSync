# Chat — delta package

Drop these files into your existing `skillsync-app/src` tree, preserving paths.
No Landing, Auth, Dashboard, Explore Skills, User Profile, or Matches files were touched or regenerated.

## New files
- `data/chatMock.ts` — conversations, messages (with day/attachment/status), canned auto-replies
- `components/chat/ConversationSidebar.tsx` — search + conversation list
- `components/chat/ConversationListItem.tsx` — avatar, online dot, unread badge, last-message preview, active highlight
- `components/chat/ChatHeader.tsx` — avatar, name, online status, voice/video call buttons, more-options menu (View Profile / Schedule Session / Report), plus a mobile back button and tablet/mobile info-panel toggle
- `components/chat/MessageList.tsx` — renders bubbles + date separators, auto-scrolls to the newest message
- `components/chat/MessageBubble.tsx` — sent vs. received styling, read receipts, image/file attachment placeholders
- `components/chat/DateSeparator.tsx`
- `components/chat/TypingIndicator.tsx`
- `components/chat/ChatInput.tsx` — emoji/attachment buttons (visual), text field, send button
- `components/chat/ChatInfoPanel.tsx` — compatibility score, skills they teach/want, shared interests, upcoming session, quick actions
- `pages/ChatPage.tsx` — three-column layout (list / conversation / info panel) that assembles all of the above

## Reused, not duplicated
- `components/ui/*` primitives (GlassCard, Avatar, Badge, Button, CircularProgress)

## Functional, not just static
- Switching conversations works and clears that conversation's unread badge
- Search filters the conversation list by name
- Sending a message appends it, updates that conversation's last-message preview, shows a typing indicator, then a canned auto-reply arrives after ~1.8s
- The message list auto-scrolls to the newest message
- Responsive: desktop shows all three columns; tablet/mobile show the list or the conversation (with a back button), and the info panel becomes a slide-over opened from the header's info icon

## Modified files (minimal, additive only)
- `App.tsx` — added the `ChatPage` import and swapped it in for the `/chat` placeholder route. Nothing else changed.
