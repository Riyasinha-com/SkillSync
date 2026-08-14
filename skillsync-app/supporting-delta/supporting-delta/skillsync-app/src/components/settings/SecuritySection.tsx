import { useState } from 'react'
import { GlassCard } from '@/components/ui/GlassCard'
import { Button } from '@/components/ui/Button'
import { Alert } from '@/components/ui/Alert'
import { Switch } from '@/components/ui/Switch'
import { PasswordInput } from '@/components/form/PasswordInput'
import { PasswordRequirements } from '@/components/form/PasswordRequirements'
import { validateLoginPassword, validateNewPassword, validateConfirmPassword } from '@/lib/validation'

function mockChangePassword(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, 1100))
}

export function SecuritySection() {
  const [current, setCurrent] = useState('')
  const [next, setNext] = useState('')
  const [confirm, setConfirm] = useState('')
  const [touched, setTouched] = useState<{ current?: boolean; next?: boolean; confirm?: boolean }>({})
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved'>('idle')
  const [twoFactor, setTwoFactor] = useState(false)

  const errors = {
    current: validateLoginPassword(current),
    next: validateNewPassword(next),
    confirm: validateConfirmPassword(next, confirm),
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setTouched({ current: true, next: true, confirm: true })
    if (errors.current || errors.next || errors.confirm) return
    setStatus('saving')
    await mockChangePassword()
    setStatus('saved')
    setCurrent('')
    setNext('')
    setConfirm('')
    setTouched({})
    setTimeout(() => setStatus('idle'), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      <GlassCard className="p-6 flex flex-col gap-5">
        <h3 className="font-display font-semibold text-on-surface">Change Password</h3>
        {status === 'saved' && <Alert variant="success">Password updated.</Alert>}
        <form className="flex flex-col gap-5" onSubmit={handleSubmit} noValidate>
          <PasswordInput
            label="Current password"
            name="current"
            value={current}
            onChange={(e) => setCurrent(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, current: true }))}
            error={touched.current ? errors.current : undefined}
            disabled={status === 'saving'}
          />
          <div>
            <PasswordInput
              label="New password"
              name="next"
              value={next}
              onChange={(e) => setNext(e.target.value)}
              onBlur={() => setTouched((t) => ({ ...t, next: true }))}
              error={touched.next ? errors.next : undefined}
              disabled={status === 'saving'}
            />
            <PasswordRequirements value={next} />
          </div>
          <PasswordInput
            label="Confirm new password"
            name="confirm"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => setTouched((t) => ({ ...t, confirm: true }))}
            error={touched.confirm ? errors.confirm : undefined}
            disabled={status === 'saving'}
          />
          <Button type="submit" variant="magical" size="sm" className="w-fit" loading={status === 'saving'}>
            {status === 'saving' ? 'Updating…' : 'Update Password'}
          </Button>
        </form>
      </GlassCard>

      <GlassCard className="p-6">
        <Switch
          checked={twoFactor}
          onChange={setTwoFactor}
          label="Two-factor authentication"
          description="Add an extra layer of security when logging in."
        />
      </GlassCard>
    </div>
  )
}
