import { Demo } from './Section'

const brandRamp = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const
const semantic = [
  { name: 'bg', desc: 'Page background' },
  { name: 'bg-elevated', desc: 'Elevated surface' },
  { name: 'surface', desc: 'Subtle surface' },
  { name: 'surface-2', desc: 'Stronger surface' },
  { name: 'border', desc: 'Default border' },
  { name: 'fg', desc: 'Body foreground' },
  { name: 'fg-muted', desc: 'Muted foreground' },
  { name: 'fg-subtle', desc: 'Subtle / placeholder' },
  { name: 'accent', desc: 'Brand accent' },
  { name: 'success', desc: 'Success' },
  { name: 'warning', desc: 'Warning' },
  { name: 'danger', desc: 'Danger / destructive' },
] as const

export function ColorsDemo() {
  return (
    <div className="grid gap-6">
      <Demo label="Brand ramp">
        <div className="grid grid-cols-5 gap-3 sm:grid-cols-10">
          {brandRamp.map((step) => (
            <div key={step} className="flex flex-col items-stretch gap-1.5">
              <div
                className="h-14 w-full rounded-[var(--radius-md)] ring-1 ring-inset ring-black/5 dark:ring-white/5"
                style={{ background: `var(--brand-${step})` }}
              />
              <div className="text-[11px] font-mono text-fg-muted text-center">{step}</div>
            </div>
          ))}
        </div>
      </Demo>

      <Demo label="Semantic tokens">
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {semantic.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-3 rounded-[var(--radius-md)] border border-border p-3"
            >
              <div
                className="size-10 shrink-0 rounded-[var(--radius-sm)] ring-1 ring-inset ring-black/5 dark:ring-white/10"
                style={{ background: `var(--${s.name})` }}
              />
              <div className="min-w-0">
                <div className="font-mono text-xs text-fg">--{s.name}</div>
                <div className="truncate text-xs text-fg-muted">{s.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <Demo label="Surfaces">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-[var(--radius-lg)] bg-bg p-6 border border-border">
            <div className="text-xs font-mono text-fg-muted">bg</div>
            <div className="mt-2 text-sm">Page background</div>
          </div>
          <div className="rounded-[var(--radius-lg)] bg-surface p-6 border border-border">
            <div className="text-xs font-mono text-fg-muted">surface</div>
            <div className="mt-2 text-sm">Subtle surface</div>
          </div>
          <div className="rounded-[var(--radius-lg)] brand-gradient p-6 text-white">
            <div className="text-xs font-mono text-white/80">brand-gradient</div>
            <div className="mt-2 text-sm font-medium">Hero / primary CTA backdrop</div>
          </div>
        </div>
      </Demo>
    </div>
  )
}
