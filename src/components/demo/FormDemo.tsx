import { useState } from 'react'
import { Check, Eye, EyeOff } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { DatePicker } from '@/components/ui/date-picker'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

const COUNTRIES = ['us', 'ru', 'es', 'de', 'jp', 'br'] as const
const INTERESTS = ['design', 'dev', 'product', 'marketing'] as const

export function FormDemo() {
  const { t } = useI18n()
  const [showPassword, setShowPassword] = useState(false)
  const [interests, setInterests] = useState<Set<string>>(new Set(['design', 'dev']))
  const [birth, setBirth] = useState<Date | undefined>()

  function toggleInterest(id: string) {
    setInterests((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    toast.success(t('toast.success'), { description: 'Form submitted as a demo.' })
  }

  return (
    <Demo>
      <form onSubmit={onSubmit} className="grid gap-6">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('form.field.firstName')}>
            <Input name="firstName" placeholder={t('form.placeholder.firstName')} required />
          </Field>
          <Field label={t('form.field.lastName')}>
            <Input name="lastName" placeholder={t('form.placeholder.lastName')} required />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('input.label.email')}>
            <Input type="email" name="email" placeholder={t('input.placeholder.email')} required />
          </Field>
          <Field label={t('form.field.username')}>
            <Input name="username" placeholder={t('form.placeholder.username')} required />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('input.label.password')}>
            <Input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder={t('input.placeholder.password')}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="rounded-[var(--radius-xs)] p-1 text-fg-muted hover:text-fg transition-colors"
                  aria-label="Toggle password"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
          </Field>
          <Field label={t('form.field.passwordConfirm')}>
            <Input type={showPassword ? 'text' : 'password'} name="passwordConfirm" />
          </Field>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <Field label={t('form.field.country')}>
            <Select name="country">
              <SelectTrigger>
                <SelectValue placeholder={t('form.placeholder.country')} />
              </SelectTrigger>
              <SelectContent>
                {COUNTRIES.map((c) => (
                  <SelectItem key={c} value={c}>{t(`country.${c}`)}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label={t('form.field.birthdate')}>
            <DatePicker value={birth} onChange={setBirth} />
          </Field>
        </div>

        <Field label={t('form.field.bio')}>
          <Textarea name="bio" placeholder={t('form.placeholder.bio')} rows={3} />
        </Field>

        <Field label={t('form.field.plan')}>
          <RadioGroup defaultValue="pro" name="plan" className="grid grid-cols-3 gap-3">
            {(['free', 'pro', 'team'] as const).map((p) => (
              <label
                key={p}
                htmlFor={`fp-${p}`}
                className={[
                  'cursor-pointer rounded-[var(--radius-md)] border border-border p-4',
                  'transition-[background-color,border-color,box-shadow,transform] duration-200 ease-[var(--ease-smooth)]',
                  'hover:border-border-strong',
                  'has-[:checked]:border-accent',
                  'has-[:checked]:bg-[color-mix(in_oklab,var(--brand-500)_8%,transparent)]',
                  'has-[:checked]:[box-shadow:var(--shadow-soft-glow)]',
                  'has-[:checked]:-translate-y-px',
                ].join(' ')}
              >
                <div className="flex items-start gap-2.5">
                  <RadioGroupItem value={p} id={`fp-${p}`} className="mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">{t(`radio.plan.${p}`)}</div>
                    <div className="text-xs text-fg-muted mt-0.5">{t(`plan.${p}.desc`)}</div>
                  </div>
                </div>
              </label>
            ))}
          </RadioGroup>
        </Field>

        <Field label={t('form.field.interests')}>
          <div className="flex flex-wrap gap-2">
            {INTERESTS.map((id) => {
              const active = interests.has(id)
              return (
                <button
                  type="button"
                  key={id}
                  onClick={() => toggleInterest(id)}
                  aria-pressed={active}
                  className={[
                    'inline-flex h-9 items-center gap-2 rounded-full border px-3.5 text-sm font-medium transition-colors',
                    'focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]',
                    active
                      ? 'border-accent bg-[color-mix(in_oklab,var(--brand-500)_15%,transparent)] text-accent'
                      : 'border-border bg-bg-elevated text-fg-muted hover:bg-surface',
                  ].join(' ')}
                >
                  <span
                    aria-hidden
                    className={[
                      'inline-flex size-4 items-center justify-center rounded-full border transition-colors',
                      active ? 'bg-accent border-accent text-accent-fg' : 'border-border-strong bg-transparent',
                    ].join(' ')}
                  >
                    {active ? <Check className="size-3" strokeWidth={3} /> : null}
                  </span>
                  {t(`interest.${id}`)}
                </button>
              )
            })}
          </div>
        </Field>

        <div className="grid gap-3 rounded-[var(--radius-md)] border border-border bg-surface/40 p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">{t('switch.notifications')}</div>
              <div className="text-xs text-fg-muted">Push and in-app notifications</div>
            </div>
            <Switch defaultChecked name="notifications" />
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <div className="text-sm font-medium">{t('switch.marketing')}</div>
              <div className="text-xs text-fg-muted">Occasional product updates</div>
            </div>
            <Switch name="marketing" />
          </div>
        </div>

        <div className="flex items-start gap-2.5">
          <Checkbox id="form-terms" defaultChecked />
          <Label htmlFor="form-terms" className="leading-snug">{t('check.terms')}</Label>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-border">
          <Button type="reset" variant="ghost">{t('btn.reset')}</Button>
          <Button type="submit">{t('btn.submit')}</Button>
        </div>
      </form>
    </Demo>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  )
}
