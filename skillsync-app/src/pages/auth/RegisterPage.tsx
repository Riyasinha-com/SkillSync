import api from "@/api/api"
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, ArrowRight } from 'lucide-react'
import { Input } from '@/components/ui/Input'
import { PasswordInput } from '@/components/form/PasswordInput'
import { PasswordRequirements } from '@/components/form/PasswordRequirements'
import { Checkbox } from '@/components/ui/Checkbox'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import {
  validateRequired,
  validateEmail,
  validateNewPassword,
  validateConfirmPassword,
} from '@/lib/validation'

interface FormState {
  name: string
  email: string
  password: string
  confirm: string
  terms: boolean
}

const INITIAL_STATE: FormState = { name: '', email: '', password: '', confirm: '', terms: false }

/**
 * Mocked submission — no backend. For demo purposes only:
 * registering with "taken@example.com" simulates an email already
 * in use, so the error state is easy to see; any other email succeeds.
 */


export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState<FormState>(INITIAL_STATE)
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [formError, setFormError] = useState<string | null>(null)

  const errors = {
    name: validateRequired(form.name, 'full name'),
    email: validateEmail(form.email),
    password: validateNewPassword(form.password),
    confirm: validateConfirmPassword(form.password, form.confirm),
    terms: form.terms ? undefined : 'You need to accept the terms to continue.',
  }

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }))
  }
  function markTouched(key: keyof FormState) {
    setTouched((t) => ({ ...t, [key]: true }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ name: true, email: true, password: true, confirm: true, terms: true })
    setFormError(null)
    if (Object.values(errors).some(Boolean)) return

    setStatus('loading')
    try {
      await api.post("/auth/register", {
  name: form.name,
  email: form.email,
  password: form.password,
})

setStatus("success")

setTimeout(() => navigate("/login"), 900)
   } 
   
   catch (error: any) {
  setStatus("error")

  setFormError(
    error.response?.data?.message ||
    "Registration failed."
  )
}
  }
  const isLoading = status === 'loading'
  const isSuccess = status === 'success'
  const disabled = isLoading || isSuccess

  return (
    <div>
      <h1 className="font-display text-3xl font-bold text-on-surface mb-2">Create your account</h1>
      <p className="text-sm text-on-surface-variant mb-8">
        Tell us who you are &mdash; matches come next.
      </p>

      {status === 'error' && formError && (
        <Alert variant="error" className="mb-6">
          {formError}
        </Alert>
      )}
      {isSuccess && (
        <Alert variant="success" className="mb-6">
          Account created. Taking you to your dashboard&hellip;
        </Alert>
      )}

      <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          name="name"
          type="text"
          placeholder="Alex Rivera"
          icon={<User className="w-4 h-4" />}
          autoComplete="name"
          value={form.name}
          disabled={disabled}
          onChange={(e) => setField('name', e.target.value)}
          onBlur={() => markTouched('name')}
          error={touched.name ? errors.name : undefined}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          icon={<Mail className="w-4 h-4" />}
          autoComplete="email"
          value={form.email}
          disabled={disabled}
          onChange={(e) => setField('email', e.target.value)}
          onBlur={() => markTouched('email')}
          error={touched.email ? errors.email : undefined}
        />
        <div>
          <PasswordInput
            label="Password"
            name="password"
            placeholder="Create a password"
            autoComplete="new-password"
            value={form.password}
            disabled={disabled}
            onChange={(e) => setField('password', e.target.value)}
            onBlur={() => markTouched('password')}
            error={touched.password ? errors.password : undefined}
          />
          <PasswordRequirements value={form.password} />
        </div>
        <PasswordInput
          label="Confirm password"
          name="confirm"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.confirm}
          disabled={disabled}
          onChange={(e) => setField('confirm', e.target.value)}
          onBlur={() => markTouched('confirm')}
          error={touched.confirm ? errors.confirm : undefined}
        />

        <div>
          <Checkbox
            name="terms"
            checked={form.terms}
            disabled={disabled}
            onChange={(e) => setField('terms', e.target.checked)}
            onBlur={() => markTouched('terms')}
            label={
              <>
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </>
            }
          />
          {touched.terms && errors.terms && (
            <p className="text-xs text-error mt-2">{errors.terms}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="magical"
          size="md"
          className="w-full group mt-2"
          loading={isLoading}
          disabled={isSuccess}
        >
          {isLoading ? 'Creating account\u2026' : isSuccess ? 'Account created' : 'Create account'}
          {!isLoading && !isSuccess && (
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          )}
        </Button>
      </form>

      <p className="text-sm text-on-surface-variant text-center mt-8">
        Already have an account?{' '}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Log in
        </Link>
      </p>
    </div>
  )
}
