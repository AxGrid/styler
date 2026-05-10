# Ax Styler — Migration playbook

How to convert legacy components to Ax Styler primitives. The goal is visual consistency without rewriting business logic. Apply patterns one component family at a time — don't try to migrate the whole app in one PR.

---

## Order of operations

1. Tokens first (Path B or C from `install.md`). The app should already look "warmer / orange-accented" before any component is touched.
2. Then `Button` — most visible win, low risk.
3. Then `Input` + `Label` + `Textarea`. Watch for the double-border bug on legacy code.
4. Then overlays (`Dialog`, `Drawer`, `Tooltip`, `DropdownMenu`).
5. Then forms (validation patterns, see § "Validation patterns").
6. Then dates if any (`DatePicker`/`DateRangePicker`).
7. Tables last — usually need the most domain-specific tweaks.

---

## Pattern 1 — Replace ad-hoc buttons

### Legacy (typical)

```tsx
<button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
  Save
</button>
```

### Ax Styler

```tsx
<Button>Save</Button>
```

### Migration heuristics

- `bg-blue-*` / `bg-orange-*` / `bg-primary` → `<Button variant="primary">` (drops the brand decision into one place)
- `bg-gray-*` / `bg-secondary` → `<Button variant="secondary">`
- `border` / outlined → `<Button variant="outline">`
- transparent / link-looking → `<Button variant="ghost">` or `<Button variant="link">`
- `bg-red-*` / destructive → `<Button variant="danger">`
- icon-only round button → `<Button size="icon" variant="outline" aria-label="…">`
- `<a className="…btn-styles…">` → `<Button asChild><a href="…">…</a></Button>`
- Loading spinner inside button → `<Button loading>` (built-in spinner, leftIcon hidden, disabled while loading)

### Gotchas

- `asChild` requires exactly ONE child element. If you currently render `<a><Icon /> Text <Icon /></a>`, that's fine (one `<a>` child). But you cannot add `leftIcon` prop AND wrap with asChild; put icons inside the child element.
- Disabled state: `disabled={loading || readonly}`. The component dims and blocks pointer-events automatically.

---

## Pattern 2 — Text inputs with the wrapper-owns-border rule

### Legacy

```tsx
<input
  className="border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 rounded px-3 py-2 w-full"
/>
```

Or worse:

```tsx
<div className="relative">
  <Search className="absolute left-3 top-3" />
  <input className="border border-gray-300 pl-10 pr-3 rounded ..." />
</div>
```

### Ax Styler

```tsx
<Input placeholder="…" />
<Input leftIcon={<Search />} placeholder="Search…" />
<Input
  type={showPwd ? 'text' : 'password'}
  rightSlot={<button type="button" onClick={...}><Eye /></button>}
/>
<Input invalid /> {/* red border + danger ring */}
```

### Migration heuristics

- Move icons into `leftIcon` / `rightSlot` props instead of absolute-positioned overlays.
- Drop ALL focus / hover / border classes from the inner input — the wrapper handles it.
- Validation styling: pass `invalid` (boolean), don't manually swap classes.
- `<label>` becomes `<Label htmlFor="…">…</Label>`. Pair via id.

### Common bug to fix during migration

Legacy code often has a global `:focus-visible { box-shadow: ... }` rule. After installing Ax Styler, this causes a double ring on inputs (the wrapper's ring + the inner input's global ring). **Delete the global rule.** Each component now owns its focus state.

---

## Pattern 3 — Replace native `<select>` with Ax Styler `Select`

### Legacy

```tsx
<select className="border rounded px-3 py-2" value={role} onChange={e => setRole(e.target.value)}>
  <option value="admin">Admin</option>
  <option value="editor">Editor</option>
</select>
```

### Ax Styler

```tsx
<Select value={role} onValueChange={setRole}>
  <SelectTrigger><SelectValue placeholder="Pick a role" /></SelectTrigger>
  <SelectContent>
    <SelectItem value="admin">Admin</SelectItem>
    <SelectItem value="editor">Editor</SelectItem>
  </SelectContent>
</Select>
```

### Note

Note `onChange` (native) → `onValueChange` (Radix). Value type is always `string`. For "no selection" use `undefined` for the value, not empty string.

---

## Pattern 4 — Replace custom modal with `Dialog`

### Legacy (typical)

```tsx
{open && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
    <div className="bg-white rounded p-6 max-w-md" onClick={e => e.stopPropagation()}>
      <h2>Title</h2>
      <p>Body</p>
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onClose}>Cancel</button>
        <button onClick={onConfirm}>OK</button>
      </div>
    </div>
  </div>
)}
```

### Ax Styler

```tsx
<Dialog open={open} onOpenChange={setOpen}>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Title</DialogTitle>
      <DialogDescription>Body</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button>
      <Button onClick={onConfirm}>OK</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

### Wins

- Backdrop blur instead of flat black/50 overlay.
- ESC + outside click + focus trap + scroll lock + restoring focus on close — all from Radix.
- a11y: roles, aria-* are correct.
- Slide+zoom in animation, fade out — out of the box.

### Glass variant

For inline forms over content, use `<DialogContent className="glass-strong">`. Same component, different surface treatment.

---

## Pattern 5 — Custom popovers / dropdown lists

Anything that opens floating UI from a button → `Popover` (custom content) or `DropdownMenu` (action menu).

If the legacy code uses `react-popper` or `floating-ui` directly with custom positioning, replace with Radix `Popover` — handles collisions, keyboard navigation, portals, and focus management for free.

---

## Pattern 6 — Toasts / notifications

Any custom notification system (snackbars, toasts, alerts) → switch to `toast.*` from sonner. Replace the toast renderer with `<Toaster />` mounted once in the root.

```tsx
// Before
notify('Saved', 'success')

// After
toast.success('Saved')
```

For longer-running operations:

```tsx
toast.promise(api.save(form), {
  loading: 'Saving…',
  success: 'Saved',
  error: (err) => `Failed: ${err.message}`,
})
```

---

## Pattern 7 — Validation patterns (no Zod / RHF required)

Ax Styler stays library-agnostic. The pattern in `source/validation-demo.tsx` is plain `useState` + functions returning error keys. Translate as:

- `value` + `setValue` per field
- `touched` map keyed by field
- `errors` derived object — each field is either `null` or a translation key
- On submit, mark all touched and check `formValid`

For async checks (username availability), use `useEffect` with debounce + AbortController-style cleanup. Show inline status icon via `rightSlot`:

```tsx
<Input
  rightSlot={
    state === 'checking' ? <Loader2 className="size-4 animate-spin" /> :
    state === 'available' ? <Check className="size-4 text-success" /> :
    state === 'taken' ? <AlertCircle className="size-4 text-danger" /> : null
  }
/>
```

If the project already uses React Hook Form / Zod / Formik, you don't need to migrate the validation engine — just style the surfaces using Ax Styler primitives (`Input`, `Label`, error helper text below).

---

## Pattern 8 — Date inputs

### Legacy

```tsx
<input type="date" className="..." />
```

### Ax Styler

```tsx
<DatePicker value={d} onChange={setD} />
<DatePicker value={d} onChange={setD} withTime />
<DateRangePicker value={r} onChange={setR} />
```

Native `<input type="date">` looks different in every browser and is not themable. The Ax Styler picker uses react-day-picker under the hood with locale-aware month/weekday names tied to the i18n provider.

### Custom presets

```tsx
const presets = [
  { id: 'today', label: 'Today', getValue: () => new Date() },
  { id: 'q1', label: 'Q1 2026', getValue: () => ({ from: ..., to: ... }) },
]
<DateRangePicker presets={presets} />
<DateRangePicker presets={null} /> // hide preset side panel
```

---

## Pattern 9 — Theme toggle

### Legacy

```tsx
const [dark, setDark] = useState(false)
useEffect(() => {
  document.documentElement.classList.toggle('dark', dark)
}, [dark])
```

### Ax Styler

```tsx
// Wrap once at the root:
<ThemeProvider>{children}</ThemeProvider>

// Anywhere:
<ThemeToggle />
// or:
const { theme, toggle, setTheme } = useTheme()
```

The provider sets `data-theme` (NOT `class="dark"`) on `<html>` and persists to localStorage. The boot script in `index.html` applies it before paint.

If the app uses `class="dark"` based theming (Tailwind v3 default), migrate to `data-theme` — it pairs better with Tailwind v4's `@custom-variant dark` and is what every Ax Styler component expects.

---

## Pattern 10 — Tables → sortable / zebra

There's no exported `<DataTable>` because real-world tables vary too much. Pattern:

```tsx
const [sortKey, setSortKey] = useState<'name' | 'mrr'>('mrr')
const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
const sorted = useMemo(() => /* sort rows */, [rows, sortKey, sortDir])

<Table>
  <TableHeader>
    <TableRow>
      <SortableTh active={sortKey === 'name'} dir={sortDir} onClick={() => toggle('name')}>Name</SortableTh>
      <SortableTh ... />
    </TableRow>
  </TableHeader>
  <TableBody>
    {sorted.map((r, i) => (
      <TableRow key={r.id} className={i % 2 === 1 ? 'bg-surface/40' : ''}>...</TableRow>
    ))}
  </TableBody>
</Table>
```

Full reference in `source/report-table.tsx` — copy `SortableTh`, `Th`, `Td` helpers and adapt.

For sticky header inside a scrollable container:

```tsx
<div className="rounded-[var(--radius-lg)] border border-border bg-bg-elevated overflow-hidden">
  <div className="max-h-[480px] overflow-auto">
    <table className="w-full caption-bottom text-sm border-separate border-spacing-0">
      <thead className="sticky top-0 z-10 bg-surface/95 backdrop-blur">…</thead>
      <tbody>…</tbody>
    </table>
  </div>
</div>
```

---

## Pattern 11 — Layouts

Ax Styler doesn't ship a `<Layout>` component, only patterns. Two go-to skeletons in `source/layout-patterns.md`:

- **Sidebar app shell** — fixed left rail (vertical nav with icons, profile pinned bottom), sticky top header (search + actions), content area with breadcrumbs.
- **Top-nav app shell** — sticky top bar with horizontal nav, content full-width with breadcrumbs above title.

Pick one based on app density: lots of nav items / sub-sections → sidebar. Few top-level sections, marketing-ish → top-nav.

---

## Common pitfalls during migration

1. **Two focus rings on inputs.** Cause: legacy global `:focus-visible { box-shadow }`. Fix: delete it. Each Ax Styler component owns its ring.
2. **Date-range middle is unreadable.** Cause: someone imported `react-day-picker/style.css` somewhere. Fix: remove the import. The `Calendar` component in this skill paints its own range visuals via classNames.
3. **Modal flashes wrong-themed for one frame.** Cause: theme isn't applied before paint. Fix: add the inline `<script>` in `index.html` from `install.md` Path A step 4.
4. **Buttons look slightly wrong-radius.** Cause: project still has Tailwind defaults `rounded-md` (6px). Replace with `rounded-[var(--radius-md)]` (10px) or use the `<Button>` component.
5. **Toasts in the wrong corner.** Cause: legacy `<Toaster position="bottom-right" />`. Fix: drop the prop and use Ax Styler's `<Toaster />` which is preconfigured top-right.
6. **`<button>` inside `<button>` warning.** Common when wrapping Radix Checkbox/RadioItem inside a custom button. Replace the inner Radix element with a non-button visual indicator (span with check icon).
