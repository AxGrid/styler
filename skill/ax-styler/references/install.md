# Ax Styler — Install paths

Pick **one** path based on the user's project state. Do not mix.

---

## Path A — From scratch (new Vite + React + TS + Tailwind v4)

Use when starting a fresh frontend.

### 1. Scaffold

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install
npm install tailwindcss @tailwindcss/vite \
  class-variance-authority clsx tailwind-merge lucide-react \
  framer-motion sonner vaul \
  @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover \
  @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slot \
  @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip \
  react-day-picker date-fns tw-animate-css
```

### 2. Wire Tailwind v4

`vite.config.ts` — add the Tailwind plugin and a path alias:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```

`tsconfig.app.json` — add `paths`:

```json
{ "compilerOptions": { "paths": { "@/*": ["./src/*"] } } }
```

### 3. Drop in design tokens

Replace `src/index.css` with the contents of `dist/ax-styler.css` from this skill (full Tailwind-compiled CSS — has tokens + `@theme` + base + utilities). Or, for a leaner setup that you'll style yourself:

```css
@import "tailwindcss";
@import "tw-animate-css";
/* Then paste the contents of dist/tokens.css here, in order:
 * — :root,[data-theme="light"] block
 * — [data-theme="dark"] block
 * — @theme inline { ... }  (if you want utilities like bg-bg, text-fg-muted) */
```

The `@theme inline` block remaps the CSS variables to Tailwind utility names — `--color-bg → bg-bg`, `--color-fg-muted → text-fg-muted`, `--radius-md → rounded-[var(--radius-md)]`, etc. Copy from `source/tokens-theme.css` if you want the full map.

### 4. Theme bootstrap

`index.html` — apply the persisted theme **before paint** to avoid FOUC:

```html
<html lang="en" data-theme="light">
  <head>
    ...
    <script>
      (function () {
        try {
          var t = localStorage.getItem('ax-styler-theme');
          if (!t) t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
          document.documentElement.setAttribute('data-theme', t);
        } catch (e) {}
      })();
    </script>
  </head>
  ...
</html>
```

`src/main.tsx` — wrap with providers and the toaster:

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ThemeProvider, I18nProvider, Toaster, TooltipProvider } from 'ax-styler'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <I18nProvider>
        <TooltipProvider delayDuration={200}>
          <App />
          <Toaster />
        </TooltipProvider>
      </I18nProvider>
    </ThemeProvider>
  </StrictMode>,
)
```

### 5. Pull in components

Two options:

- **Library mode (recommended)**: copy `dist/ax-styler.min.js` + `dist/ax-styler.min.css` into the project under `src/lib/ax-styler/` and import from there. No npm publish needed.
- **Source-level**: copy the contents of `source/` into the project at `src/components/ui/` plus `src/lib/{utils,theme,i18n}.tsx`. Gives full editability.

### 6. Smoke test

```tsx
// src/App.tsx
import { Button, Card, CardHeader, CardTitle, CardContent, ThemeToggle, LangSwitcher } from 'ax-styler'

export default function App() {
  return (
    <div className="min-h-screen bg-bg text-fg p-10">
      <div className="flex justify-end gap-2"><LangSwitcher /><ThemeToggle /></div>
      <Card className="max-w-md mx-auto mt-10">
        <CardHeader><CardTitle>Hello Ax Styler</CardTitle></CardHeader>
        <CardContent><Button>It works</Button></CardContent>
      </Card>
    </div>
  )
}
```

`npm run dev` → orange button on white in light mode, on near-black in dark.

---

## Path B — Add to existing Tailwind v4 React project

Use when the project already has Tailwind v4 set up; you just want Ax Styler tokens + components alongside whatever is there.

### 1. Install peer deps

(Same npm install command as Path A step 1, minus `tailwindcss` if it's already installed.)

### 2. Inject tokens

Open the project's main CSS file (`src/index.css` or wherever `@import "tailwindcss"` lives). At the very top after the import, **append** the contents of `dist/tokens.css` from this skill. Then append the `@theme inline` block from `source/tokens-theme.css` (so the variables become utility classes like `bg-bg`).

If the project already has `--bg`, `--fg`, `--accent` defined (some other design system), do NOT clobber. Instead namespace Ax Styler tokens under a parent: e.g. `[data-styler]` instead of `:root`. Then opt-in surfaces by adding `data-styler` to a wrapping element.

### 3. Theme switch

If the project doesn't have a theme system yet, copy `source/theme.tsx` into `src/lib/`. If it already has one (e.g. `next-themes`), make sure it sets `data-theme` on `<html>` rather than `class="dark"`.

### 4. Base resets

Add `@import` for `dist/preflight.css` after the tokens. This is small (~1KB) and prevents the double-border-on-input bug.

### 5. Drop in components

Same as Path A step 5. Ship them under `src/components/ui/`. The existing app keeps working; switch one screen at a time to Ax Styler primitives.

### 6. Verify hard rules

Read SKILL.md § "Hard rules" and grep the project for violations:
- `:focus-visible {` outside of `outline: none` — remove ring rules.
- Hardcoded `rounded-md` / `rounded-xl` — replace with `rounded-[var(--radius-md)]` etc.
- Sonner anchored elsewhere — switch to `position="top-right" offset={20}`.
- `import 'react-day-picker/style.css'` — delete it.

---

## Path C — Tokens-only adoption (vanilla CSS / Tailwind v3 / styled-components)

Use when the project doesn't use Tailwind v4 and rewriting it is out of scope. You can still adopt Ax Styler's color and radius language so further work feels on-brand.

### 1. Add the tokens

Copy `dist/tokens.css` to the project (e.g. `src/styles/tokens.css`) and import it from the global CSS entry. Then `dist/preflight.css` and (optionally) `dist/utilities.css`.

### 2. Use tokens in CSS / styled-components / Tailwind v3

```css
.btn-primary {
  background: var(--accent);
  color: var(--accent-fg);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-sm);
  height: 40px;
  padding: 0 16px;
}
.btn-primary:hover { background: var(--accent-hover); }
```

```ts
// styled-components
const Button = styled.button`
  background: var(--accent);
  color: var(--accent-fg);
  border-radius: var(--radius-md);
`
```

```js
// Tailwind v3 — extend in tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)', fg: 'var(--fg)', accent: 'var(--accent)',
        // ...
      },
      borderRadius: { md: 'var(--radius-md)' },
    },
  },
}
```

### 3. Theme switching

Toggle `data-theme="light|dark"` on `<html>`. Persist to `localStorage`. Apply inline before paint. (Same script as Path A step 4.) The CSS variables in tokens.css will swap automatically.

### 4. Selective component adoption

Pick one or two components from `source/*.tsx` and port them by hand to the project's stack (rewrite Tailwind classes as styled-components / CSS modules). Components to port first: `Button`, `Input`, `Dialog` (modal). They give the most visible brand consistency for least effort.

---

## Path D — Drop-in pre-built bundle (zero source code in the project)

Use when the user wants to consume Ax Styler as a library without copying its source. Smallest footprint.

### 1. Place the dist files

Copy from this skill into the project's static assets (or ship via your bundler):

```
public/ax-styler/ax-styler.min.js
public/ax-styler/ax-styler.min.css
```

### 2. From an HTML page (no bundler)

```html
<link rel="stylesheet" href="/ax-styler/ax-styler.min.css" />
<script type="module">
  import { Button, Card } from '/ax-styler/ax-styler.min.js'
  // ... render with React
</script>
```

You'll need React + ReactDOM loaded ahead of this. Easiest:

```html
<script type="importmap">
{ "imports": {
  "react": "https://esm.sh/react@19",
  "react-dom": "https://esm.sh/react-dom@19",
  "react/jsx-runtime": "https://esm.sh/react@19/jsx-runtime",
  "react-dom/client": "https://esm.sh/react-dom@19/client"
}}
</script>
```

(Same trick for the externalised peers `@radix-ui/*`, `lucide-react`, `framer-motion`, `sonner`, `react-day-picker`, `date-fns`, `class-variance-authority`, `clsx`, `tailwind-merge` — esm.sh handles all of these.)

### 3. From an existing React app (Vite / Next / CRA)

```ts
import { Button, ThemeProvider, I18nProvider, Toaster } from '/path/to/ax-styler.min.js'
import '/path/to/ax-styler.min.css'
```

The bundle externalises React + all peers, so install them in the host:

```bash
npm i react react-dom \
  @radix-ui/react-avatar @radix-ui/react-checkbox @radix-ui/react-dialog \
  @radix-ui/react-dropdown-menu @radix-ui/react-label @radix-ui/react-popover \
  @radix-ui/react-radio-group @radix-ui/react-select @radix-ui/react-slot \
  @radix-ui/react-switch @radix-ui/react-tabs @radix-ui/react-tooltip \
  class-variance-authority clsx tailwind-merge lucide-react \
  framer-motion sonner vaul react-day-picker date-fns
```

Then continue with the bootstrap from Path A step 4.
