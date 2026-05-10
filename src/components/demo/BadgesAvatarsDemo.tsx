import { Sparkles } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

const PEOPLE = [
  { name: 'Anna K.', img: 'https://i.pravatar.cc/64?img=47', initials: 'AK' },
  { name: 'Marco L.', img: 'https://i.pravatar.cc/64?img=12', initials: 'ML' },
  { name: 'Yuki S.', img: 'https://i.pravatar.cc/64?img=32', initials: 'YS' },
  { name: 'Ravi P.', img: '', initials: 'RP' },
]

export function BadgesAvatarsDemo() {
  const { t } = useI18n()
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Demo label="Badges">
        <div className="grid gap-4">
          <div className="flex flex-wrap gap-2">
            <Badge variant="brand">
              <Sparkles />
              {t('badge.new')}
            </Badge>
            <Badge variant="solid">{t('badge.pro')}</Badge>
            <Badge variant="neutral">{t('badge.beta')}</Badge>
            <Badge variant="outline">v2.0</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" dot>{t('status.active')}</Badge>
            <Badge variant="warning" dot>Warning</Badge>
            <Badge variant="danger" dot>{t('status.suspended')}</Badge>
            <Badge variant="info" dot>{t('badge.live')}</Badge>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge size="sm" variant="brand">small</Badge>
            <Badge size="md" variant="brand">medium</Badge>
          </div>
        </div>
      </Demo>

      <Demo label="Avatars">
        <div className="grid gap-5">
          <div className="flex items-center gap-3">
            {PEOPLE.map((p) => (
              <Avatar key={p.name}>
                <AvatarImage src={p.img} alt={p.name} />
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
            ))}
          </div>

          <div className="flex -space-x-2">
            {PEOPLE.map((p) => (
              <Avatar key={p.name} className="ring-2 ring-bg-elevated">
                <AvatarImage src={p.img} alt={p.name} />
                <AvatarFallback>{p.initials}</AvatarFallback>
              </Avatar>
            ))}
            <span
              className="ring-2 ring-bg-elevated relative flex size-9 items-center justify-center rounded-full bg-surface-2 text-xs font-semibold text-fg-muted border border-border"
              aria-label="more"
            >
              +5
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Avatar className="size-12">
              <AvatarFallback className="text-base brand-gradient text-white">SR</AvatarFallback>
            </Avatar>
            <div>
              <div className="text-sm font-semibold">Sarah Reynolds</div>
              <div className="text-xs text-fg-muted">{t('role.admin')}</div>
            </div>
          </div>
        </div>
      </Demo>
    </div>
  )
}
