import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CelestialBackdrop } from '@/components/ui/CelestialBackdrop'
import { MainLayout } from '@/layouts/MainLayout'
import { AuthLayout } from '@/layouts/AuthLayout'
import { AppLayout } from '@/layouts/AppLayout'
import LandingPage from '@/pages/LandingPage'
import LoginPage from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'
import ForgotPasswordPage from '@/pages/auth/ForgotPasswordPage'
import DashboardPage from '@/pages/DashboardPage'
import ExploreSkillsPage from '@/pages/ExploreSkillsPage'
import ProfilePage from '@/pages/ProfilePage'
import MatchesPage from '@/pages/MatchesPage'
import ChatPage from '@/pages/ChatPage'
import CalendarPage from '@/pages/CalendarPage'

/**
 * Route table. Landing, the auth flow, and the Dashboard are real;
 * everything else is scaffolded as a placeholder so the app stays
 * fully navigable while each remaining page is built out, one at a
 * time. Replace each placeholder import as its page is delivered.
 *
 * Three layouts:
 * - MainLayout   — floating navbar + footer, for marketing pages (Landing)
 * - AuthLayout   — split form / brand panel, no nav/footer (Login, Register, Forgot Password)
 * - AppLayout    — sidebar + topbar shell, for everything behind login
 */
function ComingSoon({ title }: { title: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <h1 className="font-display text-3xl font-semibold text-on-surface mb-3">{title}</h1>
      <p className="text-on-surface-variant max-w-md">
        This page hasn't been built yet — it's next up in the SkillSync build queue.
      </p>
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CelestialBackdrop />
      <Routes>
        <Route path="/" element={<MainLayout><LandingPage /></MainLayout>} />
        <Route path="/login" element={<AuthLayout><LoginPage /></AuthLayout>} />
        <Route path="/register" element={<AuthLayout><RegisterPage /></AuthLayout>} />
        <Route path="/forgot-password" element={<AuthLayout><ForgotPasswordPage /></AuthLayout>} />

        <Route path="/dashboard" element={<AppLayout><DashboardPage /></AppLayout>} />
        <Route path="/profile" element={<AppLayout><ProfilePage /></AppLayout>} />
        <Route path="/profile/edit" element={<AppLayout><ComingSoon title="Edit profile" /></AppLayout>} />
        <Route path="/explore" element={<AppLayout><ExploreSkillsPage /></AppLayout>} />
        <Route path="/skills/:id" element={<AppLayout><ComingSoon title="Skill details" /></AppLayout>} />
        <Route path="/matches" element={<AppLayout><MatchesPage /></AppLayout>} />
        <Route path="/chat" element={<AppLayout><ChatPage /></AppLayout>} />
        <Route path="/sessions/new" element={<AppLayout><ComingSoon title="Schedule a session" /></AppLayout>} />
        <Route path="/calendar" element={<AppLayout><CalendarPage /></AppLayout>} />
        <Route path="/resources" element={<AppLayout><ComingSoon title="Resources" /></AppLayout>} />
        <Route path="/reviews" element={<AppLayout><ComingSoon title="Reviews" /></AppLayout>} />
        <Route path="/achievements" element={<AppLayout><ComingSoon title="Achievements" /></AppLayout>} />
        <Route path="/notifications" element={<AppLayout><ComingSoon title="Notifications" /></AppLayout>} />
        <Route path="/settings" element={<AppLayout><ComingSoon title="Settings" /></AppLayout>} />
        <Route path="/admin" element={<AppLayout><ComingSoon title="Admin dashboard" /></AppLayout>} />
        <Route path="*" element={<MainLayout><ComingSoon title="404 — Lost in space" /></MainLayout>} />
      </Routes>
    </BrowserRouter>
  )
}
