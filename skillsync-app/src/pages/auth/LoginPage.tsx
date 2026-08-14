import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { validateEmail, validateLoginPassword } from '@/lib/validation'
import api from '@/api/api'
import axios from 'axios'

type FieldErrors = {
  email?: string
  password?: string
}

export default function LoginPage() {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [touched, setTouched] = useState<{
    email?: boolean
    password?: boolean
  }>({})

  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle')

  const [formError, setFormError] = useState<string | null>(null)

  const errors: FieldErrors = {
    email: validateEmail(email),
    password: validateLoginPassword(password),
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setTouched({
      email: true,
      password: true,
    })

    setFormError(null)

    if (errors.email || errors.password) return

    setStatus('loading')

    try {
      const response = await api.post('/auth/login', {
        email,
        password,
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))

      setStatus('success')

      setTimeout(() => {
        navigate('/dashboard')
      }, 900)
    } catch (err) {
      setStatus('error')

      if (axios.isAxiosError(err)) {
        setFormError(
          err.response?.data?.message || 'Invalid email or password.'
        )
      } else {
        setFormError('Something went wrong. Please try again.')
      }
    }
  }

  const isLoading = status === 'loading'
  const isSuccess = status === 'success'

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-on-surface mb-2">
        Welcome back
      </h1>

      <p className="text-sm text-on-surface-variant mb-8">
        Log in to pick up your matches and sessions.
      </p>

      {status === 'error' && formError && (
        <Alert variant="error" className="mb-6">
          {formError}
        </Alert>
      )}

      {isSuccess && (
        <Alert variant="success" className="mb-6">
          Logged in. Taking you to your dashboard&hellip;
        </Alert>
      )}

      <form
        className="flex flex-col gap-5"
        onSubmit={handleSubmit}
        noValidate
      >
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          value={email}
          disabled={isLoading || isSuccess}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() =>
            setTouched((t) => ({
              ...t,
              email: true,
            }))
          }
          error={touched.email ? errors.email : undefined}
        />

        <div>
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Enter your password"
            autoComplete="current-password"
            value={password}
            disabled={isLoading || isSuccess}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() =>
              setTouched((t) => ({
                ...t,
                password: true,
              }))
            }
            error={touched.password ? errors.password : undefined}
          />

          <div className="flex justify-end mt-2">
            <Link
              to="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>

        <Checkbox
          name="remember"
          label="Remember me"
          disabled={isLoading || isSuccess}
        />

        <Button
          type="submit"
          variant="magical"
          size="md"
          className="w-full group mt-2"
          loading={isLoading}
          disabled={isSuccess}
        >
          {isLoading
            ? 'Logging in...'
            : isSuccess
            ? 'Logged in'
            : 'Log in'}

          {!isLoading && !isSuccess && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </form>

      <p className="text-sm text-on-surface-variant text-center mt-8">
        New to SkillSync?{' '}
        <Link
          to="/register"
          className="text-primary font-medium hover:underline"
        >
          Create an account
        </Link>
      </p>
    </div>
  )
}