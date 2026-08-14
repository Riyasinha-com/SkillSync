\# SkillSync – Peer-to-Peer Skill Swapping Platform



SkillSync is a peer-to-peer skill-swapping platform that helps users connect with others to teach and learn skills through mutual skill matching, sessions, messaging, reviews, and progress tracking.



\## Project Overview



SkillSync allows users to:



\- Create and manage their profiles

\- Add skills they can teach and skills they want to learn

\- Explore available skills and other users

\- Discover potential mutual skill matches

\- Send and manage match requests

\- Chat with accepted matches

\- Schedule and attend learning sessions

\- Track completed sessions

\- Leave and receive reviews

\- Track learning progress and achievements

\- Access learning resources

\- Manage notifications and account settings



The platform also includes administrative functionality for managing users, sessions, reviews, reports, and skill verification.



\## Core User Flow



```text

Home / Login

&#x20;     ↓

User Profile

&#x20;     ↓

Teach \& Learn Skills

&#x20;     ↓

Explore \& Mutual Matching

&#x20;     ↓

Match Request

&#x20;     ↓

Pending → Accepted → Completed

&#x20;     ↓

Chat

&#x20;     ↓

Schedule Session

&#x20;     ↓

Attend Session

&#x20;     ↓

Complete Session

&#x20;     ↓

Review \& Progress

&#x20;     ↓

` ``` ` after \*\*Review \& Progress\*\*



\## Main Features



\### Authentication

\- User registration

\- Login

\- Password validation

\- Forgot-password flow

\- Protected application areas



\### Profiles

\- User profile information

\- Skills to teach

\- Skills to learn

\- Availability

\- Location / timezone information

\- Profile editing

\- Profile picture support



\### Skill Discovery \& Matching

\- Explore skills

\- Search and filtering

\- Skill categories

\- Teacher discovery

\- Mutual skill matching

\- Skill details and learning roadmaps



\### Matches

\- Match requests

\- Pending matches

\- Accepted matches

\- Completed matches

\- Match details



\### Chat

\- Conversations

\- Message history

\- Message input

\- Typing indicator

\- Chat information panel



\### Sessions

\- Session scheduling

\- Calendar view

\- Time-slot selection

\- Session requests

\- Session details

\- Session completion tracking



\### Reviews \& Achievements

\- Reviews and ratings

\- Rating summaries

\- Achievements

\- XP and level tracking

\- Progress history

\- Certificates



\### Resources

\- Learning resources

\- Resource categories

\- Featured resources

\- Resource filtering



\### Administration

\- User management

\- Session monitoring

\- Skill verification

\- Review moderation

\- Reports and moderation

\- Analytics



\## Technology Stack



\### Frontend

\- React

\- TypeScript

\- Vite

\- React Router

\- Tailwind CSS

\- Lucide React



\### Backend

\- Node.js

\- Express.js

\- MongoDB

\- Mongoose

\- JWT-based authentication



\### Development Tools

\- Git

\- GitHub

\- VS Code



\## Project Structure



```text

SkillSync/

│

├── backend/

│   ├── config/

│   ├── controllers/

│   ├── middleware/

│   ├── models/

│   ├── routes/

│   ├── package.json

│   └── server.js

│

├── modules/

│   ├── 01-Landing.zip

│   ├── 02-Authentication.zip

│   ├── 03-Dashboard.zip

│   ├── 04-Explore-Skills.zip

│   ├── 05-Profile.zip

│   ├── 06-Matches.zip

│   ├── 07-Chat.zip

│   ├── 08-Session-Scheduler.zip

│   ├── 09-Reviews-Achievements.zip

│   ├── 10-Admin.zip

│   ├── 11-Supporting-Pages.zip

│   └── 12-Resources.zip

│

└── skillsync-app/

&#x20;   ├── src/

&#x20;   │   ├── api/

&#x20;   │   ├── components/

&#x20;   │   ├── data/

&#x20;   │   ├── layouts/

&#x20;   │   ├── pages/

&#x20;   │   └── lib/

&#x20;   ├── public/

&#x20;   ├── package.json

&#x20;   └── vite.config.ts



` ``` ` after \*\*vite.config.ts\*\*



