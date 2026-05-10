# Ax Styler — Layout patterns

Two app-shell skeletons. Copy whichever fits, then customise. Both use Ax Styler primitives + Tailwind v4 utilities.

## A. Sidebar app shell

```tsx
import {
  Bell, ChevronDown, CreditCard, Folder, HelpCircle, LayoutDashboard,
  Search, Settings, TrendingUp, Users,
} from 'lucide-react'
import {
  Avatar, AvatarFallback, AvatarImage,
  Badge, Button, Input,
  Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList,
  BreadcrumbPage, BreadcrumbSeparator,
} from 'ax-styler'

const NAV = [
  { id: 'dashboard', icon: LayoutDashboard, badge: null  },
  { id: 'projects',  icon: Folder,          badge: '12'  },
  { id: 'team',      icon: Users,           badge: null  },
  { id: 'reports',   icon: TrendingUp,      badge: null  },
  { id: 'billing',   icon: CreditCard,      badge: null  },
  { id: 'settings',  icon: Settings,        badge: null  },
  { id: 'help',      icon: HelpCircle,      badge: null  },
]

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-bg">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border bg-surface/50">
        <div className="flex h-14 items-center gap-2 px-4 border-b border-border">
          <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] brand-gradient text-white text-sm font-black">S</span>
          <span className="font-semibold tracking-tight">Acme</span>
        </div>
        <nav className="flex-1 p-2 overflow-auto">
          <ul className="grid gap-0.5">
            {NAV.map(({ id, icon: Icon, badge }) => {
              const active = id === 'dashboard' // pass currentPage as prop in real app
              return (
                <li key={id}>
                  <a
                    href={`/${id}`}
                    className={[
                      'flex items-center gap-2.5 rounded-[var(--radius-sm)] px-2.5 py-1.5 text-sm transition-colors',
                      active
                        ? 'bg-[color-mix(in_oklab,var(--brand-500)_14%,transparent)] text-accent font-medium'
                        : 'text-fg-muted hover:bg-surface hover:text-fg',
                    ].join(' ')}
                  >
                    <Icon className={['size-4', active ? 'text-accent' : 'text-fg-muted'].join(' ')} />
                    <span className="flex-1">{labelFor(id)}</span>
                    {badge ? <Badge size="sm" variant="neutral">{badge}</Badge> : null}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className="border-t border-border p-3 flex items-center gap-2.5">
          <Avatar className="size-8">
            <AvatarImage src="…" alt="Me" />
            <AvatarFallback>SR</AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-medium truncate">Sarah R.</div>
            <div className="text-xs text-fg-muted truncate">Admin</div>
          </div>
          <ChevronDown className="size-4 text-fg-muted shrink-0" />
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="flex h-14 items-center gap-3 border-b border-border bg-bg-elevated px-4">
          <div className="max-w-sm flex-1">
            <Input
              leftIcon={<Search />}
              placeholder="Quick search"
              rightSlot={
                <kbd className="hidden sm:inline-flex h-5 items-center rounded-[var(--radius-xs)] border border-border bg-surface px-1.5 text-[10px] font-mono text-fg-muted">⌘K</kbd>
              }
            />
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            <Button size="icon" variant="ghost" aria-label="Notifications"><Bell /></Button>
            <Button size="sm" variant="primary">+ New</Button>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <Breadcrumb className="mb-4">
            <BreadcrumbList>
              <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          {children}
        </div>
      </div>
    </div>
  )
}
```

## B. Top-nav app shell

```tsx
export function TopNavShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-40 border-b border-border glass-strong">
        <div className="mx-auto flex h-14 max-w-6xl items-center gap-4 px-5">
          <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] brand-gradient text-white text-sm font-black">S</span>
          <span className="font-semibold tracking-tight">Acme</span>
          <nav className="ml-4 hidden md:flex items-center gap-0.5">
            {['dashboard', 'projects', 'team', 'reports', 'billing'].map(id => {
              const active = id === 'dashboard'
              return (
                <a
                  key={id}
                  href={`/${id}`}
                  className={[
                    'rounded-[var(--radius-sm)] px-3 py-1.5 text-sm transition-colors',
                    active ? 'bg-surface text-fg font-medium' : 'text-fg-muted hover:bg-surface/60 hover:text-fg',
                  ].join(' ')}
                >
                  {labelFor(id)}
                </a>
              )
            })}
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Button size="icon" variant="ghost" aria-label="Notifications"><Bell /></Button>
            <Avatar className="size-8">
              <AvatarImage src="…" alt="Me" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-5 py-6">
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem><BreadcrumbPage>Dashboard</BreadcrumbPage></BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        {children}
      </main>
    </div>
  )
}
```

## When to use which

- **Sidebar shell** — internal apps with ≥5 top-level sections, dashboards, B2B SaaS, admin panels. The vertical rail handles density well.
- **Top-nav shell** — marketing-adjacent products, content-heavy apps, ≤5 sections. Better for wide content and reading.

## Breadcrumbs

```tsx
import {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage,
  BreadcrumbSeparator, BreadcrumbSeparatorSlash, BreadcrumbEllipsis,
} from 'ax-styler'

// Standard: chevron separator, page is the leaf
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Home</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbLink href="/users">Users</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem><BreadcrumbPage>Sarah</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>

// Slash separator + collapsed middle (when path is too deep)
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem><BreadcrumbLink href="/">Dashboard</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparatorSlash />
    <BreadcrumbItem><BreadcrumbEllipsis /></BreadcrumbItem>
    <BreadcrumbSeparatorSlash />
    <BreadcrumbItem><BreadcrumbLink href="/reports">Reports</BreadcrumbLink></BreadcrumbItem>
    <BreadcrumbSeparatorSlash />
    <BreadcrumbItem><BreadcrumbPage>Q4 2026</BreadcrumbPage></BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

The wrapping `<Breadcrumb>` is just `<nav aria-label="breadcrumb">` — you don't need it if you already have a `<nav>` ancestor, in which case use `<BreadcrumbList>` directly.
