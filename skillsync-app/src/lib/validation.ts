const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(value: string): string | undefined {
  if (!value.trim()) return 'Enter your email.'
  if (!EMAIL_RE.test(value.trim())) return 'Enter a valid email address.'
  return undefined
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (!value.trim()) return `Enter your ${fieldLabel.toLowerCase()}.`
  return undefined
}

export function validateLoginPassword(value: string): string | undefined {
  if (!value) return 'Enter your password.'
  return undefined
}

export interface PasswordRule {
  id: string
  label: string
  test: (value: string) => boolean
}

export const PASSWORD_RULES: PasswordRule[] = [
  { id: 'length', label: 'At least 8 characters', test: (v) => v.length >= 8 },
  { id: 'case', label: 'Upper and lower case letters', test: (v) => /[a-z]/.test(v) && /[A-Z]/.test(v) },
  { id: 'number', label: 'At least one number or symbol', test: (v) => /[\d\W]/.test(v) },
]

export function validateNewPassword(value: string): string | undefined {
  if (!value) return 'Create a password.'
  const unmet = PASSWORD_RULES.find((rule) => !rule.test(value))
  if (unmet) return 'Your password doesn\u2019t meet all the requirements yet.'
  return undefined
}

export function validateConfirmPassword(password: string, confirm: string): string | undefined {
  if (!confirm) return 'Confirm your password.'
  if (confirm !== password) return 'Passwords don\u2019t match.'
  return undefined
}

export function passwordStrength(value: string): number {
  return PASSWORD_RULES.reduce((score, rule) => score + (rule.test(value) ? 1 : 0), 0)
}
