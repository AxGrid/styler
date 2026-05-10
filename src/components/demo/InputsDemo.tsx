import { useState } from 'react'
import { Eye, EyeOff, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function InputsDemo() {
  const { t } = useI18n()
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const emailInvalid = email.length > 0 && !email.includes('@')

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Demo label="Text inputs">
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="email">{t('input.label.email')}</Label>
            <Input
              id="email"
              type="email"
              placeholder={t('input.placeholder.email')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              invalid={emailInvalid}
            />
            {emailInvalid ? (
              <p className="text-xs text-danger">{t('input.error.email')}</p>
            ) : null}
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="password">{t('input.label.password')}</Label>
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder={t('input.placeholder.password')}
              rightSlot={
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="rounded-[var(--radius-xs)] p-1 text-fg-muted hover:text-fg transition-colors"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              }
            />
            <p className="text-xs text-fg-muted">{t('input.help.password')}</p>
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="search">{t('input.label.search')}</Label>
            <Input
              id="search"
              type="search"
              leftIcon={<Search />}
              placeholder={t('input.placeholder.search')}
            />
          </div>

          <div className="grid gap-1.5">
            <Label htmlFor="disabled">{t('input.disabled')}</Label>
            <Input id="disabled" placeholder="—" disabled value="locked@ax-styler.dev" />
          </div>
        </div>
      </Demo>

      <Demo label="Textarea & select">
        <div className="grid gap-4">
          <div className="grid gap-1.5">
            <Label htmlFor="message">{t('input.label.message')}</Label>
            <Textarea id="message" placeholder={t('input.placeholder.message')} rows={4} />
          </div>

          <div className="grid gap-1.5">
            <Label>{t('input.label.role')}</Label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder={t('input.placeholder.role')} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>{t('input.label.role')}</SelectLabel>
                  <SelectItem value="admin">{t('role.admin')}</SelectItem>
                  <SelectItem value="editor">{t('role.editor')}</SelectItem>
                  <SelectItem value="viewer">{t('role.viewer')}</SelectItem>
                  <SelectItem value="guest">{t('role.guest')}</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Demo>

      <Demo label="Checkbox & radio">
        <div className="grid gap-5">
          <div className="grid gap-3">
            <div className="flex items-start gap-2.5">
              <Checkbox id="terms" defaultChecked />
              <Label htmlFor="terms" className="leading-snug">
                {t('check.terms')}
              </Label>
            </div>
            <div className="flex items-start gap-2.5">
              <Checkbox id="news" />
              <Label htmlFor="news" className="leading-snug">
                {t('check.newsletter')}
              </Label>
            </div>
          </div>

          <div className="grid gap-2">
            <Label>{t('radio.plan.title')}</Label>
            <RadioGroup defaultValue="pro">
              {(['free', 'pro', 'team'] as const).map((p) => (
                <div key={p} className="flex items-center gap-2.5">
                  <RadioGroupItem value={p} id={`plan-${p}`} />
                  <Label htmlFor={`plan-${p}`}>{t(`radio.plan.${p}`)}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        </div>
      </Demo>

      <Demo label="Switches">
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">{t('switch.notifications')}</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="marketing">{t('switch.marketing')}</Label>
            <Switch id="marketing" />
          </div>
        </div>
      </Demo>
    </div>
  )
}
