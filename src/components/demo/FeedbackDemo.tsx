import { toast } from 'sonner'
import { CheckCircle2, Info, TriangleAlert, XCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function FeedbackDemo() {
  const { t } = useI18n()

  function fakePromise() {
    const work = new Promise<void>((resolve, reject) => {
      setTimeout(() => (Math.random() > 0.3 ? resolve() : reject()), 1500)
    })
    toast.promise(work, {
      loading: t('toast.promise.loading'),
      success: t('toast.promise.success'),
      error: t('toast.promise.error'),
    })
  }

  return (
    <div className="grid gap-6">
      <Demo label="Toast notifications">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            leftIcon={<CheckCircle2 className="!text-success" />}
            onClick={() =>
              toast.success(t('toast.success'), {
                description: 'All your changes are now safely stored.',
              })
            }
          >
            {t('btn.showSuccess')}
          </Button>

          <Button
            variant="outline"
            leftIcon={<XCircle className="!text-danger" />}
            onClick={() => toast.error(t('toast.error'), { description: 'Please try again.' })}
          >
            {t('btn.showError')}
          </Button>

          <Button
            variant="outline"
            leftIcon={<Info className="!text-info" />}
            onClick={() => toast.info(t('toast.info'))}
          >
            {t('btn.showInfo')}
          </Button>

          <Button
            variant="outline"
            leftIcon={<TriangleAlert className="!text-warning" />}
            onClick={() => toast.warning('Storage almost full', { description: '92% of your quota used.' })}
          >
            Warning
          </Button>

          <Button onClick={fakePromise}>{t('btn.showPromise')}</Button>

          <Button
            variant="outline"
            onClick={() =>
              toast(t('toast.success'), {
                description: 'You can undo this for the next 5 seconds.',
                action: {
                  label: 'Undo',
                  onClick: () => toast('Reverted'),
                },
              })
            }
          >
            With action
          </Button>
        </div>
      </Demo>
    </div>
  )
}
