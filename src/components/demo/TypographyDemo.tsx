import { Demo } from './Section'

const samples = [
  { name: 'Display', cls: 'text-5xl font-bold tracking-tight', value: 'Pack my box' },
  { name: 'H1', cls: 'text-4xl font-bold tracking-tight', value: 'Pack my box' },
  { name: 'H2', cls: 'text-2xl font-semibold tracking-tight', value: 'Pack my box' },
  { name: 'H3', cls: 'text-lg font-semibold tracking-tight', value: 'Pack my box' },
  { name: 'Body', cls: 'text-base', value: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Body small', cls: 'text-sm text-fg-muted', value: 'The quick brown fox jumps over the lazy dog' },
  { name: 'Caption', cls: 'text-xs uppercase tracking-wider text-fg-subtle', value: 'PRESS LEARN MORE' },
  { name: 'Mono', cls: 'font-mono text-sm', value: "const cn = (...args) => twMerge(clsx(args))" },
] as const

export function TypographyDemo() {
  return (
    <Demo>
      <div className="grid gap-5">
        {samples.map((s) => (
          <div key={s.name} className="grid grid-cols-[120px_1fr] items-baseline gap-6">
            <div className="font-mono text-xs uppercase tracking-wider text-fg-subtle">
              {s.name}
            </div>
            <div className={s.cls}>{s.value}</div>
          </div>
        ))}
      </div>
    </Demo>
  )
}
