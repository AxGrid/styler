import { ArrowRight, Download, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function ButtonsDemo() {
  const { t } = useI18n()
  const [loading, setLoading] = useState(false)

  function fakeLoad() {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  return (
    <div className="grid gap-6">
      <Demo label="Variants">
        <div className="flex flex-wrap gap-3">
          <Button variant="primary">{t('btn.primary')}</Button>
          <Button variant="secondary">{t('btn.secondary')}</Button>
          <Button variant="outline">{t('btn.outline')}</Button>
          <Button variant="ghost">{t('btn.ghost')}</Button>
          <Button variant="danger">{t('btn.danger')}</Button>
          <Button variant="link">{t('btn.link')}</Button>
        </div>
      </Demo>

      <Demo label="Sizes">
        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">{t('size.sm')}</Button>
          <Button size="md">{t('size.md')}</Button>
          <Button size="lg">{t('size.lg')}</Button>
          <Button size="icon" variant="outline" aria-label={t('size.icon')}>
            <Plus />
          </Button>
        </div>
      </Demo>

      <Demo label="With icons">
        <div className="flex flex-wrap gap-3">
          <Button leftIcon={<Download />}>{t('btn.withIcon')}</Button>
          <Button variant="outline" rightIcon={<ArrowRight />}>
            {t('btn.continue')}
          </Button>
          <Button variant="danger" leftIcon={<Trash2 />}>
            {t('btn.delete')}
          </Button>
        </div>
      </Demo>

      <Demo label="States">
        <div className="flex flex-wrap items-center gap-3">
          <Button onClick={fakeLoad} loading={loading}>
            {loading ? t('btn.loading') : t('btn.save')}
          </Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>
            Disabled outline
          </Button>
        </div>
      </Demo>
    </div>
  )
}
