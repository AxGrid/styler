---
name: ax-styler
description: Use this skill when the user wants to apply the Ax Styler design system to a project (new or existing). Triggers on phrases like "ax-styler", "ax styler", "axgrid styler", "styler", "стилизуй под ax-styler", "стилизуй под styler", "применить ax-styler", "apply ax-styler", "use ax-styler design", "use styler design", "apply styler", "оформить в стиле ax-styler", "оформить в стиле styler", "конвертировать в ax-styler", "migrate to ax-styler", "migrate to styler", "стилизуй мой проект", "сделай в нашем стиле", "use our design system", "design system бренд оранжевый", "white orange design system", "black orange design system", "наш дизайн-стиль", "наш стайлгайд". Ax Styler is a React UI kit with a black/white + orange palette, soft modern radii (10–14px), glassmorphism overlays, full Radix UI primitives, react-day-picker dates, and sonner toasts.
version: 1.0.0
---

# Ax Styler Design System

Ax Styler is a complete React UI kit shipped with this skill: design tokens, ~25 components, light/dark theme, and i18n. Use it to set up new projects and to refactor existing ones into one cohesive look.

## Stack assumed by the components

- React 18+ (built and tested with React 19)
- Tailwind CSS v4 with the `@tailwindcss/vite` (or `@tailwindcss/postcss`) plugin
- Radix UI primitives (a11y baseline)
- `react-day-picker` v10 + `date-fns` (date pickers — DO NOT import `react-day-picker/style.css`, see "Hard rules" below)
- `sonner` (toasts), optional `vaul` (iOS-style drawers), `framer-motion` (theme-toggle anim)
- `lucide-react` (icons), `class-variance-authority` + `clsx` + `tailwind-merge`

If the project does NOT use Tailwind v4, you can still adopt **tokens.css** and write hand-rolled CSS using `var(--bg)`, `var(--accent)`, etc. — see `references/install.md` path "Tokens-only adoption".

## Brand identity

- **Light**: bg `#FFFFFF`, fg `#1A1A1A`, accent `#FF6B1A`, surface `#F7F7F7`, border `#E5E5E5`
- **Dark**: bg `#0A0A0A`, fg `#FAFAFA`, accent `#FF7A2E`, surface `#161616`, border `#262626`
- **Radius**: `--radius-xs` 4 / `sm` 6 / `md` 10 / `lg` 14 / `xl` 20 / `2xl` 28 / `full`
- **Modals/popovers**: backdrop blur `16–24px`, glass surface, slide+zoom in
- **Type**: Inter (fallback to system-ui), JetBrains Mono for code
- **Languages**: ru / en / es / de built in

## Decision tree — pick a path

When this skill triggers, identify the user's situation and follow ONE path:

1. **New project from scratch** → `references/install.md` § "From scratch"
   Output: a working Vite + React + Tailwind v4 project wired to Ax Styler.

2. **Existing React project that already uses Tailwind v4** → `references/install.md` § "Add to existing (Tailwind v4)"
   Output: tokens injected, components made available, no breaking changes.

3. **Existing React project on Tailwind v3 / styled-components / vanilla CSS** → `references/install.md` § "Tokens-only adoption"
   Output: design tokens in place, refactor a few key components to look on-brand without a full migration.

4. **Refactor specific surface(s)** ("сделай эту модалку в стиле styler", "перепиши форму") → `references/migration.md`
   Output: targeted rewrite using Ax Styler primitives.

5. **Quick reference** ("как сделать тост?", "как у вас выглядит таблица?") → `references/cheatsheet.md` for one-liners, then `source/<file>.tsx` for full implementation.

## Files in this skill

```
~/.claude/skills/ax-styler/
├── SKILL.md                      # this file (entry)
├── references/
│   ├── install.md                # 4 install paths, copy-paste setup
│   ├── cheatsheet.md             # every component → import + minimal example
│   └── migration.md              # how to refactor legacy components
├── dist/
│   ├── ax-styler.min.js          # built React lib (peers externalised)
│   ├── ax-styler.min.css         # full Tailwind-compiled CSS
│   ├── ax-styler.js / .css       # unminified, for debugging
│   ├── tokens.css                # JUST CSS variables, no Tailwind required
│   ├── preflight.css             # base resets (focus, scrollbar, form chrome)
│   └── utilities.css             # .glass, .brand-gradient when no Tailwind
└── source/
    └── *.tsx                     # the original .tsx of each component (read or copy)
```

For deep refactoring or showing the exact code, read the matching `source/<component>.tsx`. For quick lookup and copy-paste use `references/cheatsheet.md`.

## Hard rules — never violate when applying Ax Styler

These are baked-in invariants. Drop them and the design system stops being itself.

1. **Theme switching uses `data-theme="light"|"dark"` on `<html>`.** Never rely solely on `prefers-color-scheme`. Always persist to `localStorage` and apply BEFORE first paint (inline `<script>` in `index.html`) so there is no flash.

2. **Inputs have one border, on the outer wrapper.** The inner `<input>` is `border-0 bg-transparent`. The wrapper owns the focus ring via `has-[input:focus-visible]:[box-shadow:...]`. NEVER add an extra border or shadow to the inner input — you'll get a double-border in dark mode.

3. **Do NOT add a global `:focus-visible { box-shadow: ring }`.** Only `:focus-visible { outline: none }`. Each component component draws its own ring on its outer wrapper. A global ring causes double-rings on inputs/selects/etc.

4. **Radius** is always `var(--radius-*)`. Never raw `0.5rem`, never `rounded-md` (Tailwind default = 6px, our `md` = 10px).

5. **Toasts anchor at `top-right` with `offset={20}`.** Not bottom.

6. **Modals**: `backdrop-blur-md` over `bg-overlay`. Slide+zoom in. Use `glass-strong` utility on the content for the glass variant.

7. **Date range middle**: the cell `<td>` carries the stripe background, the inner button is forced `!bg-transparent !text-fg` so digits stay readable. **NEVER `import 'react-day-picker/style.css'`** — its unlayered rules win over Tailwind utilities and break dark-theme range styling.

8. **Buttons with `asChild`**: pass exactly ONE child element. Do not also render `leftIcon`/`rightIcon` outside the child — Slot's `Children.only` will throw. The wrapper component handles this for you (see `source/button.tsx`).

9. **i18n**: when adding strings, edit ALL four dictionaries (ru, en, es, de) in one place. Use `t('key', { n: 8 })` for interpolation.

10. **Brand color is non-negotiable.** `#FF6B1A` (light) / `#FF7A2E` (dark). If the user asks "use blue accent", switch only `--brand-500`/`--accent` — keep everything else.

## Working pattern

When you are invoked:

1. Identify which decision-tree branch fits.
2. Read the relevant references file(s).
3. If touching components, read the matching `source/*.tsx` for ground truth.
4. Apply changes. Confirm `data-theme="light"` is set, tokens are in place, all hard rules are respected.
5. Verify: `npm run build` and a dev-server load. For refactors, point out before/after side-by-side or list the files touched.

Do NOT dump the entire skill content to the user. Pull only what is needed for their specific request.
