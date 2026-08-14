import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowRight, ArrowLeft, MailCheck } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { validateEmail } from '@/lib/validation'

const RESEND_COOLDOWN = 30

/**
 * Mocked request — no backend. For demo purposes only:
 * "error@example.com" simulates a server-side failure so the error
 * state is easy to see. Any other valid address "succeeds" — real
 * apps should show this same success message whether or not an
 * account exists, so the form can't be used to probe for registered
 * emails.
 */
function mockRequestReset(email: string): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email.trim().toLowerCase() === 'error@example.com') {
        reject(new Error('We couldn\u2019t send that email. Try again in a moment.'))
      } else {
        resolve()
      }
    }, 1000)
  })
}

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [touched, setTouched] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState<string | null>(null)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown === 0) return
    const id = setTimeout(() => setCooldown((c) => c - 1), 1000)
    return () => clearTimeout(id)
  }, [cooldown])

  const error = validateEmail(email)
  const isLoading = status === 'loading'

  async function requestReset() {
    setTouched(true)
    setFormError(null)
    if (error) return

    setStatus('loading')
    try {
      await mockRequestReset(email)
      setStatus('success')
      setCooldown(RESEND_COOLDOWN)
    } catch (err) {
      setStatus('error')
      setFormError(err instanceof Error ? err.message : 'Something went wrong. Try again.')
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    requestReset()
  }

  if (status === 'success') {
    return (
      <div>
        <div className="w-12 h-12 rounded-2xl bg-tertiary-container/50 flex items-center justify-center mb-6">
          <MailCheck className="w-5 h-5 text-tertiary" />
        </div>
        <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Check your inbox</h1>
        <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
          If an account exists for <span className="text-on-surface">{email}</span>, we've sent
          a link to reset your password.
        </p>
        <div className="flex flex-col gap-3">
          <Button
            variant="glass"
            size="md"
            className="w-full"
            disabled={cooldown > 0}
            onClick={requestReset}
          >
            {cooldown > 0 ? `Resend email in ${cooldown}s` : 'Resend email'}
          </Button>
          <Link to="/login">
            <Button variant="ghost" size="md" className="w-full group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to log in
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Reset your password</h1>
      <p className="text-sm text-on-surface-variant mb-8 leading-relaxed">
        Enter the email on your account and we'll send you a reset link.
      </p>

      {status === 'error' && formError && (
        <Alert variant="error" className="mb-6">
          {formError}
        </Alert>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          value={email}
          disabled={isLoading}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={touched ? error : undefined}
        />

        <Button type="submit" variant="magical" size="md" className="w-full group mt-2" loading={isLoading}>
          {isLoading ? 'Sending\u2026' : 'Send reset link'}
          {!isLoading && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </form>

      <Link
        to="/login"
        className="flex items-center justify-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface mt-8 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to log in
      </Link>
    </div>
  )
}
