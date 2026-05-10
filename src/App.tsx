import { useState } from 'react'
import { ArrowRight, BookOpen, ChevronDown, Menu, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Drawer, DrawerContent, DrawerFooter, DrawerHeader,
  DrawerTitle, DrawerTrigger,
} from '@/components/ui/drawer'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Section } from '@/components/demo/Section'
import { ColorsDemo } from '@/components/demo/ColorsDemo'
import { TypographyDemo } from '@/components/demo/TypographyDemo'
import { ButtonsDemo } from '@/components/demo/ButtonsDemo'
import { InputsDemo } from '@/components/demo/InputsDemo'
import { FormDemo } from '@/components/demo/FormDemo'
import { ValidationDemo } from '@/components/demo/ValidationDemo'
import { DatePickerDemo } from '@/components/demo/DatePickerDemo'
import { BadgesAvatarsDemo } from '@/components/demo/BadgesAvatarsDemo'
import { OverlaysDemo } from '@/components/demo/OverlaysDemo'
import { FeedbackDemo } from '@/components/demo/FeedbackDemo'
import { DataDisplayDemo } from '@/components/demo/DataDisplayDemo'
import { ReportTableDemo } from '@/components/demo/ReportTableDemo'
import { TabsDemo } from '@/components/demo/TabsDemo'
import { PaginationDemo } from '@/components/demo/PaginationDemo'
import { LayoutDemo } from '@/components/demo/LayoutDemo'
import { ThemeToggle } from '@/components/theme-toggle'
import { LangSwitcher } from '@/components/lang-switcher'
import { useI18n } from '@/lib/i18n'

// Top-level nav: 4 entries (2 single links + 2 dropdown groups) — keeps the
// header to a single line on tablet/desktop. Each group surfaces ~5 anchors.
type NavLeaf = { type: 'link'; id: string; key: string }
type NavGroup = { type: 'group'; key: string; items: { id: string; key: string }[] }
const NAV_TREE: ReadonlyArray<NavLeaf | NavGroup> = [
  { type: 'link', id: 'foundations', key: 'nav.foundations' },
  {
    type: 'group',
    key: 'nav.controls',
    items: [
      { id: 'controls', key: 'section.buttons.title' },
      { id: 'forms',    key: 'section.form.title' },
      { id: 'dates',    key: 'section.dates.title' },
    ],
  },
  {
    type: 'group',
    key: 'nav.components',
    items: [
      { id: 'overlays',   key: 'section.overlays.title' },
      { id: 'feedback',   key: 'section.feedback.title' },
      { id: 'data',       key: 'section.dataDisplay.title' },
      { id: 'tabs',       key: 'section.tabs.title' },
      { id: 'pagination', key: 'section.pagination.title' },
    ],
  },
  { type: 'link', id: 'layouts', key: 'nav.layouts' },
]

function Topbar() {
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-40 glass-strong border-b border-border">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-3 px-4 sm:px-6 lg:gap-4 lg:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2 font-bold tracking-tight text-fg">
          <span className="grid size-7 place-items-center rounded-[var(--radius-sm)] brand-gradient text-white">
            <span className="text-sm font-black">S</span>
          </span>
          <span className="whitespace-nowrap">Ax Styler</span>
        </a>

        {/* Desktop nav — hidden below md, replaced by the hamburger drawer. */}
        <nav className="ml-4 hidden md:flex items-center gap-0.5 text-sm">
          {NAV_TREE.map((entry) =>
            entry.type === 'link' ? (
              <a
                key={entry.id}
                href={`#${entry.id}`}
                className="rounded-[var(--radius-sm)] px-2.5 py-1.5 text-fg-muted hover:bg-surface hover:text-fg transition-colors"
              >
                {t(entry.key)}
              </a>
            ) : (
              <NavGroupTrigger key={entry.key} group={entry} />
            )
          )}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href="#foundations"
            className="hidden xl:inline-flex h-10 items-center gap-2 rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 text-sm font-medium text-fg shadow-xs hover:bg-surface transition-colors"
          >
            <BookOpen className="size-[18px] text-fg-muted" />
            Docs
          </a>
          <LangSwitcher />
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

function NavGroupTrigger({ group }: { group: NavGroup }) {
  const { t } = useI18n()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={[
          'group/nav inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2.5 py-1.5',
          'text-fg-muted hover:bg-surface hover:text-fg transition-colors',
          'data-[state=open]:bg-surface data-[state=open]:text-fg',
          'focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]',
        ].join(' ')}
      >
        {t(group.key)}
        <ChevronDown
          className="size-3.5 opacity-60 transition-transform duration-200 group-data-[state=open]/nav:rotate-180"
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="min-w-48">
        {group.items.map((item) => (
          <DropdownMenuItem key={item.id} asChild>
            <a href={`#${item.id}`}>{t(item.key)}</a>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function MobileNav() {
  const { t } = useI18n()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
          aria-label={t('nav.openMenu')}
        >
          <Menu />
        </Button>
      </DrawerTrigger>
      <DrawerContent side="left" className="w-72 max-w-[80vw]">
        <DrawerHeader>
          <DrawerTitle className="flex items-center gap-2">
            <span className="grid size-6 place-items-center rounded-[var(--radius-xs)] brand-gradient text-white text-[10px] font-black">
              S
            </span>
            <span>Ax Styler</span>
          </DrawerTitle>
        </DrawerHeader>
        <nav className="-mx-2 mt-2 flex-1 overflow-auto">
          <ul className="grid gap-3 px-2">
            {NAV_TREE.map((entry) =>
              entry.type === 'link' ? (
                <li key={entry.id}>
                  <a
                    href={`#${entry.id}`}
                    onClick={close}
                    className="flex items-center rounded-[var(--radius-sm)] px-3 py-2.5 text-sm font-medium text-fg-muted hover:bg-surface hover:text-fg transition-colors"
                  >
                    {t(entry.key)}
                  </a>
                </li>
              ) : (
                <li key={entry.key} className="grid gap-0.5">
                  <div className="px-3 pb-1 pt-2 text-[11px] font-semibold uppercase tracking-wider text-fg-subtle">
                    {t(entry.key)}
                  </div>
                  {entry.items.map((item) => (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={close}
                      className="flex items-center rounded-[var(--radius-sm)] px-3 py-2 text-sm font-medium text-fg-muted hover:bg-surface hover:text-fg transition-colors"
                    >
                      {t(item.key)}
                    </a>
                  ))}
                </li>
              )
            )}
          </ul>
        </nav>
        <DrawerFooter className="!flex-row !justify-start gap-2 border-t border-border pt-4">
          <a
            href="#foundations"
            onClick={close}
            className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-border bg-bg-elevated px-3 text-sm font-medium text-fg shadow-xs hover:bg-surface transition-colors"
          >
            <BookOpen className="size-[18px] text-fg-muted" />
            Docs
          </a>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function Hero() {
  const { t } = useI18n()
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      {/* Static radial wash — base layer. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 60% at 50% 0%, color-mix(in oklab, var(--brand-500) 22%, transparent) 0%, transparent 60%)',
        }}
      />
      {/* Two slowly drifting brand orbs. `motion-reduce` kills the animation
          for users who opted out. */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-[10%] size-[28rem] rounded-full blur-3xl opacity-60 motion-reduce:opacity-40 [animation:float-slow_14s_ease-in-out_infinite] motion-reduce:[animation:none]"
        style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--brand-400) 55%, transparent) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-32 right-[8%] size-[22rem] rounded-full blur-3xl opacity-55 motion-reduce:opacity-35 [animation:float-slow_20s_ease-in-out_infinite_reverse] motion-reduce:[animation:none]"
        style={{ background: 'radial-gradient(closest-side, color-mix(in oklab, var(--brand-600) 50%, transparent) 0%, transparent 70%)' }}
      />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-8 py-20 lg:py-32">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-bg-elevated/60 px-3 py-1 text-xs font-medium text-fg-muted backdrop-blur">
            <span className="size-1.5 rounded-full bg-accent animate-pulse" />
            {t('app.poweredBy')}
          </span>
          <h1 className="text-balance text-4xl font-bold tracking-tight text-fg sm:text-5xl lg:text-6xl text-glow">
            {t('app.title')}
          </h1>
          <p className="mt-5 max-w-2xl text-balance text-base sm:text-lg text-fg-muted leading-relaxed">
            {t('app.subtitle')}
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="lg">
              <a href="#foundations">
                <Sparkles />
                {t('btn.continue')}
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#controls">
                {t('nav.controls')}
                <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 lg:px-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-sm text-fg-muted">
          <span className="grid size-5 place-items-center rounded-[var(--radius-xs)] brand-gradient text-white text-[10px] font-black">
            S
          </span>
          <span>Ax Styler design system</span>
        </div>
        <div className="text-xs text-fg-subtle font-mono">
          ax-styler v0.3.0 · React 19 · Tailwind 4 · Radix · react-day-picker
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  const { t } = useI18n()
  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <main className="flex-1">
          <Hero />

          <Section
            id="foundations"
            eyebrow={t('nav.foundations')}
            title={t('section.colors.title')}
            description={t('section.colors.desc')}
          >
            <ColorsDemo />
          </Section>

          <Section
            title={t('section.typography.title')}
            description={t('section.typography.desc')}
          >
            <TypographyDemo />
          </Section>

          <Section
            id="controls"
            eyebrow={t('nav.controls')}
            title={t('section.buttons.title')}
            description={t('section.buttons.desc')}
          >
            <ButtonsDemo />
          </Section>

          <Section
            title={t('section.inputs.title')}
            description={t('section.inputs.desc')}
          >
            <InputsDemo />
          </Section>

          <Section
            id="forms"
            eyebrow={t('nav.forms')}
            title={t('section.form.title')}
            description={t('section.form.desc')}
          >
            <FormDemo />
          </Section>

          <Section
            title={t('section.validation.title')}
            description={t('section.validation.desc')}
          >
            <ValidationDemo />
          </Section>

          <Section
            id="dates"
            eyebrow={t('nav.dates')}
            title={t('section.dates.title')}
            description={t('section.dates.desc')}
          >
            <DatePickerDemo />
          </Section>

          <Section
            id="overlays"
            eyebrow={t('nav.overlays')}
            title={t('section.overlays.title')}
            description={t('section.overlays.desc')}
          >
            <OverlaysDemo />
          </Section>

          <Section
            id="feedback"
            eyebrow={t('nav.feedback')}
            title={t('section.feedback.title')}
            description={t('section.feedback.desc')}
          >
            <FeedbackDemo />
          </Section>

          <Section
            id="data"
            eyebrow={t('nav.dataDisplay')}
            title={t('section.dataDisplay.title')}
            description={t('section.dataDisplay.desc')}
          >
            <BadgesAvatarsDemo />
            <div className="h-6" />
            <DataDisplayDemo />
          </Section>

          <Section
            id="tabs"
            eyebrow={t('nav.tabs')}
            title={t('section.tabs.title')}
            description={t('section.tabs.desc')}
          >
            <TabsDemo />
          </Section>

          <Section
            id="pagination"
            eyebrow={t('nav.pagination')}
            title={t('section.pagination.title')}
            description={t('section.pagination.desc')}
          >
            <PaginationDemo />
          </Section>

          <Section
            title={t('section.report.title')}
            description={t('section.report.desc')}
          >
            <ReportTableDemo />
          </Section>

          <Section
            id="layouts"
            eyebrow={t('nav.layouts')}
            title={t('section.layout.title')}
            description={t('section.layout.desc')}
          >
            <LayoutDemo />
          </Section>
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  )
}
