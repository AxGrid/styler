import {
  Bell,
  ChevronDown,
  CreditCard,
  Folder,
  HelpCircle,
  LayoutDashboard,
  Search,
  Settings,
  TrendingUp,
  Users,
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbSeparatorSlash,
} from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useI18n } from '@/lib/i18n'
import { cn } from '@/lib/utils'
import { Demo } from './Section'

export function LayoutDemo() {
  return (
    <div className="grid gap-6">
      <BreadcrumbsDemo />
      <SidebarLayoutDemo />
      <TopNavLayoutDemo />
    </div>
  )
}

function BreadcrumbsDemo() {
  const { t } = useI18n()
  return (
    <Demo label="Breadcrumbs">
      <div className="grid gap-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t('breadcrumb.home')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t('breadcrumb.users')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Sarah Reynolds</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t('breadcrumb.dashboard')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparatorSlash />
            <BreadcrumbItem>
              <BreadcrumbEllipsis />
            </BreadcrumbItem>
            <BreadcrumbSeparatorSlash />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">{t('breadcrumb.reports')}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparatorSlash />
            <BreadcrumbItem>
              <BreadcrumbPage>{t('breadcrumb.q4')}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </Demo>
  )
}

const NAV_ITEMS = [
  { id: 'dashboard', icon: LayoutDashboard, badge: null  },
  { id: 'projects',  icon: Folder,          badge: '12'  },
  { id: 'team',      icon: Users,           badge: null  },
  { id: 'reports',   icon: TrendingUp,      badge: null  },
  { id: 'billing',   icon: CreditCard,      badge: null  },
  { id: 'settings',  icon: Settings,        badge: null  },
  { id: 'help',      icon: HelpCircle,      badge: null  },
] as const

function SidebarLayoutDemo() {
  const { t } = useI18n()
  return (
    <Demo label={t('layout.sidebar.title')}>
      <div className="text-sm text-fg-muted mb-3">{t('layout.sidebar.desc')}</div>
      <div className="flex h-[480px] overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-md">
        {/* Sidebar */}
        <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface/50">
          <div className="flex h-14 items-center gap-2 px-4 border-b border-border">
            <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] brand-gradient text-white text-sm font-black">S</span>
            <span className="font-semibold tracking-tight">Styler</span>
          </div>
          <nav className="flex-1 p-2 overflow-auto">
            <ul className="grid gap-0.5">
              {NAV_ITEMS.map((item) => {
                const active = item.id === 'reports'
                const Icon = item.icon
                return (
                  <li key={item.id}>
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className={cn(
                        'flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm transition-colors',
                        active
                          ? 'bg-[color-mix(in_oklab,var(--brand-500)_14%,transparent)] text-accent font-medium'
                          : 'text-fg-muted hover:bg-surface hover:text-fg'
                      )}
                    >
                      <Icon className={cn('size-4', active ? 'text-accent' : 'text-fg-muted')} />
                      <span className="flex-1">{t(`layout.nav.${item.id}`)}</span>
                      {item.badge ? <Badge size="sm" variant="neutral">{item.badge}</Badge> : null}
                    </a>
                  </li>
                )
              })}
            </ul>
          </nav>
          <div className="border-t border-border p-3 flex items-center gap-2.5">
            <Avatar className="size-8">
              <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="Sarah" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium truncate">Sarah R.</div>
              <div className="text-xs text-fg-muted truncate">{t('role.admin')}</div>
            </div>
            <ChevronDown className="size-4 text-fg-muted shrink-0" />
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Header */}
          <header className="flex h-14 items-center gap-3 border-b border-border bg-bg-elevated px-4">
            <div className="max-w-sm flex-1">
              <Input
                leftIcon={<Search />}
                placeholder={t('layout.search')}
                rightSlot={
                  <kbd className="hidden sm:inline-flex h-5 items-center rounded-[var(--radius-xs)] border border-border bg-surface px-1.5 text-[10px] font-mono text-fg-muted">
                    ⌘K
                  </kbd>
                }
              />
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <Button size="icon" variant="ghost" aria-label="Notifications">
                <Bell />
              </Button>
              <Button size="sm" variant="primary">+ New report</Button>
            </div>
          </header>

          {/* Content */}
          <div className="flex-1 overflow-auto p-6">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{t('breadcrumb.dashboard')}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="#">{t('breadcrumb.reports')}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{t('breadcrumb.q4')}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <h2 className="text-2xl font-bold tracking-tight">{t('breadcrumb.q4')}</h2>
            <p className="mt-1 text-sm text-fg-muted">Quarterly performance overview.</p>

            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              {[
                { label: 'Revenue',       value: '$148K',  delta: '+12%' },
                { label: 'New customers', value: '328',    delta: '+8%'  },
                { label: 'Churn',         value: '1.4%',   delta: '−0.3%'},
              ].map((m) => (
                <div key={m.label} className="rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4">
                  <div className="text-xs uppercase tracking-wider text-fg-muted">{m.label}</div>
                  <div className="mt-1 flex items-end justify-between">
                    <div className="text-xl font-bold">{m.value}</div>
                    <Badge size="sm" variant="success">{m.delta}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Demo>
  )
}

function TopNavLayoutDemo() {
  const { t } = useI18n()
  const ITEMS = ['dashboard', 'projects', 'team', 'reports', 'billing'] as const
  return (
    <Demo label={t('layout.topnav.title')}>
      <div className="text-sm text-fg-muted mb-3">{t('layout.topnav.desc')}</div>
      <div className="overflow-hidden rounded-[var(--radius-lg)] border border-border bg-bg shadow-md">
        {/* Header */}
        <header className="border-b border-border bg-bg-elevated">
          <div className="flex h-14 items-center gap-4 px-5">
            <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] brand-gradient text-white text-sm font-black">S</span>
            <span className="font-semibold tracking-tight">Styler</span>
            <nav className="ml-4 hidden md:flex items-center gap-0.5">
              {ITEMS.map((id) => {
                const active = id === 'dashboard'
                return (
                  <a
                    key={id}
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className={cn(
                      'rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors',
                      active ? 'bg-surface text-fg font-medium' : 'text-fg-muted hover:bg-surface/60 hover:text-fg'
                    )}
                  >
                    {t(`layout.nav.${id}`)}
                  </a>
                )
              })}
            </nav>
            <div className="ml-auto flex items-center gap-2">
              <Button size="icon" variant="ghost" aria-label="Notifications">
                <Bell />
              </Button>
              <Avatar className="size-8">
                <AvatarImage src="https://i.pravatar.cc/64?img=47" alt="Sarah" />
                <AvatarFallback>SR</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">{t('breadcrumb.home')}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{t('breadcrumb.dashboard')}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">{t('breadcrumb.dashboard')}</h2>
              <p className="text-sm text-fg-muted">Welcome back, Sarah.</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Export</Button>
              <Button size="sm">+ New project</Button>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-4">
            {['Active', 'In review', 'Shipped', 'Paused'].map((label, i) => (
              <div key={label} className="rounded-[var(--radius-md)] border border-border bg-bg-elevated p-4">
                <div className="text-xs uppercase tracking-wider text-fg-muted">{label}</div>
                <div className="mt-1 text-2xl font-bold">{[24, 8, 132, 3][i]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Demo>
  )
}
