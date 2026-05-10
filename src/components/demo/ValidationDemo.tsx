import { useEffect, useRef, useState } from 'react'
import { AlertCircle, Check, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Demo } from './Section'

const TAKEN_USERNAMES = new Set(['admin', 'root', 'ax-styler', 'test'])

export function ValidationDemo() {
  const { t } = useI18n()

  // values
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')

  // touched
  const [touched, setTouched] = useState({
    name: false, email: false, username: false, password: false, confirm: false,
  })
  const markTouched = (k: keyof typeof touched) => setTouched((s) => ({ ...s, [k]: true }))

  // async username
  const [usernameState, setUsernameState] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle')
  const usernameTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (usernameTimer.current) clearTimeout(usernameTimer.current)
    if (!username || username.length < 3) {
      setUsernameState('idle')
      return
    }
    setUsernameState('checking')
    usernameTimer.current = setTimeout(() => {
      setUsernameState(TAKEN_USERNAMES.has(username.toLowerCase()) ? 'taken' : 'available')
    }, 700)
    return () => {
      if (usernameTimer.current) clearTimeout(usernameTimer.current)
    }
  }, [username])

  // validators (return error key or null)
  const errors = {
    name: !name ? 'form.error.required' : null,
    email: !email
      ? 'form.error.required'
      : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? null : 'form.error.invalidEmail',
    username:
      !username ? 'form.error.required'
      : username.length < 3 ? 'form.error.tooShort'
      : usernameState === 'taken' ? 'form.username.taken'
      : null,
    password: !password
      ? 'form.error.required'
      : password.length < 8 ? 'form.error.tooShort'
      : !/\d/.test(password) ? 'form.error.weakPassword'
      : null,
    confirm: !confirm
      ? 'form.error.required'
      : confirm !== password ? 'form.error.mismatch'
      : null,
  } as const

  const passwordStrength = (() => {
    let score = 0
    if (password.length >= 8) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[^A-Za-z0-9]/.test(password)) score++
    return score
  })()

  const strengthMeta = passwordStrength <= 1
    ? { key: 'form.passwordStrength.weak', color: 'var(--danger)', width: '33%' }
    : passwordStrength === 2
      ? { key: 'form.passwordStrength.ok', color: 'var(--warning)', width: '66%' }
      : { key: 'form.passwordStrength.strong', color: 'var(--success)', width: '100%' }

  const formValid = !errors.name && !errors.email && !errors.username && !errors.password && !errors.confirm
                  && usernameState !== 'checking'

  return (
    <Demo>
      <form
        className="grid gap-5 max-w-lg"
        onSubmit={(e) => { e.preventDefault() }}
      >
        <Field label={t('form.field.firstName')} error={touched.name ? errors.name : null}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onBlur={() => markTouched('name')}
            invalid={!!(touched.name && errors.name)}
            placeholder={t('form.placeholder.firstName')}
          />
        </Field>

        <Field label={t('input.label.email')} error={touched.email ? errors.email : null}>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => markTouched('email')}
            invalid={!!(touched.email && errors.email)}
            placeholder={t('input.placeholder.email')}
          />
        </Field>

        <Field
          label={t('form.field.username')}
          error={touched.username ? errors.username : null}
          errorVars={errors.username === 'form.error.tooShort' ? { n: 3 } : undefined}
          hint={
            usernameState === 'checking' ? { text: t('form.username.checking'), tone: 'muted' } :
            usernameState === 'available' && !errors.username ? { text: t('form.username.available'), tone: 'success' } :
            null
          }
        >
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={() => markTouched('username')}
            invalid={!!(touched.username && errors.username)}
            placeholder={t('form.placeholder.username')}
            rightSlot={
              <span className="pr-1 text-fg-muted">
                {usernameState === 'checking' ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : usernameState === 'available' ? (
                  <Check className="size-4 text-success" />
                ) : usernameState === 'taken' ? (
                  <AlertCircle className="size-4 text-danger" />
                ) : null}
              </span>
            }
          />
        </Field>

        <Field
          label={t('input.label.password')}
          error={touched.password ? errors.password : null}
          errorVars={errors.password === 'form.error.tooShort' ? { n: 8 } : undefined}
        >
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => markTouched('password')}
            invalid={!!(touched.password && errors.password)}
            placeholder={t('input.placeholder.password')}
          />
          {password ? (
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-surface-2">
                <div
                  className="h-full transition-all"
                  style={{ width: strengthMeta.width, background: strengthMeta.color }}
                />
              </div>
              <span className="text-[11px] font-medium text-fg-muted">
                {t(strengthMeta.key)}
              </span>
            </div>
          ) : null}
        </Field>

        <Field label={t('form.field.passwordConfirm')} error={touched.confirm ? errors.confirm : null}>
          <Input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            onBlur={() => markTouched('confirm')}
            invalid={!!(touched.confirm && errors.confirm)}
          />
        </Field>

        <div className="flex justify-end pt-2 border-t border-border">
          <Button type="submit" disabled={!formValid}>
            {t('btn.submit')}
          </Button>
        </div>
      </form>
    </Demo>
  )
}

type FieldHint = { text: string; tone: 'muted' | 'success' } | null
function Field({
  label,
  error,
  errorVars,
  hint,
  children,
}: {
  label: string
  error?: string | null
  errorVars?: Record<string, string | number>
  hint?: FieldHint
  children: React.ReactNode
}) {
  const { t } = useI18n()
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
      {error ? (
        <p className="text-xs text-danger flex items-center gap-1">
          <AlertCircle className="size-3.5" />
          {t(error, errorVars)}
        </p>
      ) : hint ? (
        <p className={cn('text-xs flex items-center gap-1', hint.tone === 'success' ? 'text-success' : 'text-fg-muted')}>
          {hint.tone === 'success' ? <Check className="size-3.5" /> : null}
          {hint.text}
        </p>
      ) : null}
    </div>
  )
}
