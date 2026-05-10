import { useState } from 'react'
import type { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import { Label } from '@/components/ui/label'
import { DatePicker } from '@/components/ui/date-picker'
import { DateRangePicker } from '@/components/ui/date-range-picker'
import { useI18n } from '@/lib/i18n'
import { getDateLocale } from '@/components/ui/calendar'
import { Demo } from './Section'

export function DatePickerDemo() {
  const { t, locale } = useI18n()
  const [date, setDate] = useState<Date | undefined>()
  const [dateTime, setDateTime] = useState<Date | undefined>()
  const [range, setRange] = useState<DateRange | undefined>()
  const [reportRange, setReportRange] = useState<DateRange | undefined>(() => ({
    from: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    to: new Date(),
  }))

  const dateLocale = getDateLocale(locale)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Demo label="Single date">
        <div className="grid gap-4 max-w-sm">
          <div className="grid gap-1.5">
            <Label>{t('datepicker.placeholder.date')}</Label>
            <DatePicker value={date} onChange={setDate} />
          </div>
          <pre className="text-xs font-mono text-fg-muted bg-surface/40 p-3 rounded-[var(--radius-sm)] border border-border">
{`date: ${date ? format(date, 'PPP', { locale: dateLocale }) : 'undefined'}`}
          </pre>
        </div>
      </Demo>

      <Demo label="Date + time">
        <div className="grid gap-4 max-w-sm">
          <div className="grid gap-1.5">
            <Label>{t('datepicker.placeholder.dateTime')}</Label>
            <DatePicker value={dateTime} onChange={setDateTime} withTime />
          </div>
          <pre className="text-xs font-mono text-fg-muted bg-surface/40 p-3 rounded-[var(--radius-sm)] border border-border">
{`dateTime: ${dateTime ? format(dateTime, 'PPP, HH:mm', { locale: dateLocale }) : 'undefined'}`}
          </pre>
        </div>
      </Demo>

      <Demo label="Range — minimal">
        <div className="grid gap-4 max-w-sm">
          <div className="grid gap-1.5">
            <Label>{t('datepicker.placeholder.range')}</Label>
            {/* presets={null} hides the side panel */}
            <DateRangePicker value={range} onChange={setRange} presets={null} numberOfMonths={1} />
          </div>
        </div>
      </Demo>

      <Demo label="Range with presets">
        <div className="grid gap-4 max-w-md">
          <div className="grid gap-1.5">
            <Label>Report period</Label>
            <DateRangePicker value={reportRange} onChange={setReportRange} />
          </div>
          <p className="text-xs text-fg-muted">
            Пресеты настраиваются — передайте свой массив <code className="font-mono">presets</code> или <code className="font-mono">null</code> чтобы спрятать панель.
          </p>
        </div>
      </Demo>
    </div>
  )
}
