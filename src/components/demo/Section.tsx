import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: {
  id?: string
  eyebrow?: string
  title: string
  description?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn(
        'scroll-mt-20 border-t border-border first:border-t-0 py-16 lg:py-24',
        className
      )}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <header className="mb-10 max-w-3xl">
          {eyebrow ? (
            <p className="mb-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              <span className="size-1.5 rounded-full bg-accent" />
              {eyebrow}
            </p>
          ) : null}
          <h2 className="text-balance text-3xl font-bold tracking-tight text-fg lg:text-4xl text-glow">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-fg-muted leading-relaxed text-balance">{description}</p>
          ) : null}
        </header>
        <div>{children}</div>
      </div>
    </section>
  )
}

export function Demo({
  label,
  children,
  className,
}: {
  label?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-border bg-bg-elevated overflow-hidden',
        className
      )}
    >
      {label ? (
        <div className="px-5 py-2.5 text-xs font-medium uppercase tracking-wider text-fg-muted border-b border-border bg-surface/40">
          {label}
        </div>
      ) : null}
      <div className="p-6 lg:p-8">{children}</div>
    </div>
  )
}
