import { Link, useNavigate } from 'react-router-dom'
import { Compass, ArrowLeft, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6 pt-32">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-primary/20 rounded-full blur-3xl" />
        <div className="relative w-24 h-24 rounded-full glass-panel-raised flex items-center justify-center">
          <Compass className="w-10 h-10 text-primary" />
        </div>
      </div>

      <span className="font-mono-label text-xs text-on-surface-variant/60 mb-3">ERROR 404</span>
      <h1 className="font-display text-3xl md:text-4xl font-bold text-on-surface mb-3">
        Lost in space
      </h1>
      <p className="text-on-surface-variant max-w-sm mb-8">
        This page drifted off somewhere in the celestial void. Let's get you back on course.
      </p>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Link to="/">
          <Button variant="magical" size="md">
            <Home className="w-4 h-4" />
            Back Home
          </Button>
        </Link>
        <Button variant="glass" size="md" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-4 h-4" />
          Go Back
        </Button>
      </div>
    </div>
  )
}
