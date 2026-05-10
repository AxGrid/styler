# Ax Styler — Cheatsheet

One-liner reference for every exported component. Use this when the user asks "how do I render X". Read `../source/<file>.tsx` for the full implementation if they need to tweak it.

All imports below assume the lib is installed under the alias `ax-styler`:

```ts
import { Button, Input, Dialog, /* … */ } from 'ax-styler'
```

---

## Foundations

### Theme + i18n providers

Wrap the app **once**, near the root.

```tsx
<ThemeProvider>
  <I18nProvider>
    <TooltipProvider delayDuration={200}>
      <App />
      <Toaster />
    </TooltipProvider>
  </I18nProvider>
</ThemeProvider>
```

### Theme toggle / Lang switcher

```tsx
<ThemeToggle />            // animated sun ↔ moon
<LangSwitcher />           // ru / en / es / de
const { theme, setTheme, toggle } = useTheme()
const { locale, setLocale, t } = useI18n()
```

`t(key, vars?)` — looks up dictionary key, supports `{n}` interpolation. Falls back to `en`, then to the key itself.

---

## Buttons

```tsx
<Button>Default</Button>
<Button variant="primary | secondary | outline | ghost | danger | link">…</Button>
<Button size="sm | md | lg | icon">…</Button>
<Button loading>Saving…</Button>
<Button leftIcon={<Plus />} rightIcon={<ArrowRight />}>With icons</Button>
<Button asChild><a href="/x">As link (one element child)</a></Button>
```

Variants resolve to brand orange (`primary`), neutral surface (`secondary`), border-only (`outline`), no-bg (`ghost`), red (`danger`), text-only (`link`). When `asChild`, pass exactly ONE child element.

---

## Inputs

```tsx
<Label htmlFor="email">Email</Label>
<Input id="email" type="email" placeholder="you@…" />
<Input leftIcon={<Search />} rightSlot={<KbdHint />} />
<Input invalid />                          // red border + danger ring
<Textarea rows={4} />
```

The wrapper owns the focus ring; the inner native input is `border-0 bg-transparent`.

### Select (Radix-based)

```tsx
<Select>
  <SelectTrigger><SelectValue placeholder="Pick…" /></SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>Roles</SelectLabel>
      <SelectItem value="admin">Admin</SelectItem>
      <SelectItem value="editor">Editor</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>
```

### Checkbox / Radio / Switch

```tsx
<Checkbox id="terms" defaultChecked />
<Switch defaultChecked />
<RadioGroup defaultValue="pro">
  <RadioGroupItem value="free" />
  <RadioGroupItem value="pro" />
</RadioGroup>
```

---

## Dates

```tsx
<DatePicker value={date} onChange={setDate} />                 // single day
<DatePicker value={dt}   onChange={setDt}   withTime />        // + HH:mm
<DateRangePicker value={range} onChange={setRange} />          // 2 months + presets
<DateRangePicker value={range} onChange={setRange} presets={null} numberOfMonths={1} /> // minimal
```

Presets are configurable. Defaults from `defaultDatePresets(t)` and `defaultDateRangePresets(t)`. Each preset is `{ id, label, getValue: () => Date | DateRange }`. `getValue` is evaluated at click-time so "Today" stays accurate.

`Calendar` is exported separately if you need raw react-day-picker with our theming.

---

## Overlays

### Modal / Dialog

```tsx
<Dialog>
  <DialogTrigger asChild><Button>Open</Button></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirm</DialogTitle>
      <DialogDescription>Are you sure?</DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="ghost">Cancel</Button>
      <Button variant="danger">Delete</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
```

`<DialogContent className="glass-strong">` for the glass variant.

### Drawer (slides from right by default)

```tsx
<Drawer>
  <DrawerTrigger asChild><Button>Open drawer</Button></DrawerTrigger>
  <DrawerContent side="right | left | top | bottom">
    <DrawerHeader>
      <DrawerTitle>Settings</DrawerTitle>
      <DrawerDescription>Manage your account.</DrawerDescription>
    </DrawerHeader>
    {/* form */}
    <DrawerFooter>
      <Button variant="ghost">Cancel</Button>
      <Button>Save</Button>
    </DrawerFooter>
  </DrawerContent>
</Drawer>
```

### Tooltip

```tsx
<Tooltip>
  <TooltipTrigger asChild><Button size="icon"><Plus /></Button></TooltipTrigger>
  <TooltipContent>Add item</TooltipContent>
</Tooltip>
```

(Wrap the app in `<TooltipProvider />` once, see Foundations above.)

### Dropdown menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild><Button variant="outline">Account</Button></DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuLabel>My account</DropdownMenuLabel>
    <DropdownMenuSeparator />
    <DropdownMenuItem><User /> Profile <DropdownMenuShortcut>⌘P</DropdownMenuShortcut></DropdownMenuItem>
    <DropdownMenuCheckboxItem checked={true}>Show panel</DropdownMenuCheckboxItem>
    <DropdownMenuRadioGroup value="x"><DropdownMenuRadioItem value="x">X</DropdownMenuRadioItem></DropdownMenuRadioGroup>
  </DropdownMenuContent>
</DropdownMenu>
```

### Popover (lower-level — DatePicker is built on top)

```tsx
<Popover>
  <PopoverTrigger asChild><Button>Open</Button></PopoverTrigger>
  <PopoverContent align="start">…</PopoverContent>
</Popover>
```

---

## Feedback

### Toasts (sonner)

```tsx
import { toast } from 'sonner'

toast.success('Saved', { description: '…' })
toast.error('Failed', { description: '…' })
toast.info('Update available')
toast.warning('Storage almost full')
toast.promise(fetch('/api'), { loading: 'Saving…', success: 'Done', error: 'Failed' })
toast('With action', { action: { label: 'Undo', onClick: () => {} } })
```

The `<Toaster />` component (mount once at the root) is themed and anchored top-right.

### Badges

```tsx
<Badge variant="brand | solid | neutral | outline | success | warning | danger | info" size="sm | md" dot>
  Live
</Badge>
```

---

## Data display

### Cards

```tsx
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
    <CardDescription>Sub copy.</CardDescription>
  </CardHeader>
  <CardContent>…</CardContent>
  <CardFooter><Button>Action</Button></CardFooter>
</Card>
```

### Avatars

```tsx
<Avatar>
  <AvatarImage src="…" alt="Name" />
  <AvatarFallback>NN</AvatarFallback>
</Avatar>
```

Stack with `<div className="flex -space-x-2">` and `ring-2 ring-bg-elevated` on each Avatar.

### Tabs

```tsx
<Tabs defaultValue="overview">
  <TabsList>
    <TabsTrigger value="overview">Overview</TabsTrigger>
    <TabsTrigger value="settings">Settings</TabsTrigger>
  </TabsList>
  <TabsContent value="overview">…</TabsContent>
  <TabsContent value="settings">…</TabsContent>
</Tabs>
```

### Table

The exported primitives are minimal:

```tsx
<Table>
  <TableHeader>
    <TableRow><TableHead>Name</TableHead><TableHead>Role</TableHead></TableRow>
  </TableHeader>
  <TableBody>
    <TableRow><TableCell>Anna</TableCell><TableCell>Admin</TableCell></TableRow>
  </TableBody>
</Table>
```

For full report-style tables (sortable, zebra, sticky header) use the pattern in `source/report-table.tsx` (or in the demo app's `ReportTableDemo`). It's plain HTML tables + state, not a separate component — copy and adapt.

---

## Layout patterns (no exported component)

These are skeleton patterns documented in `source/layout-patterns.md`. They're not lib exports; copy them into the host app:

- **Sidebar layout** — left vertical nav with icons + badges, header with search + actions, content with breadcrumbs.
- **Top-nav layout** — horizontal nav in header, breadcrumbs above content, full-width body.
- **Breadcrumbs** — `<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink>…</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator /><BreadcrumbItem><BreadcrumbPage>Current</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>`. Variants: `BreadcrumbSeparatorSlash` (slash separator) and `BreadcrumbEllipsis` (collapsed middle).

---

## Utilities (Tailwind v4)

- `glass`, `glass-strong` — backdrop-blur surface
- `brand-gradient` — orange diagonal gradient
- `text-balance` — `text-wrap: balance`
- `shimmer-bg` — loading-skeleton sweep

Use as Tailwind utility class: `<div className="glass-strong rounded-[var(--radius-xl)] p-6">`.

For non-Tailwind projects, the same names are available as plain classes in `dist/utilities.css`.

---

## Quick decision matrix

| Need | Use |
|---|---|
| User clicks → modal | `Dialog` |
| Slides in from edge | `Drawer` |
| Tiny hover label | `Tooltip` |
| Click → menu of actions | `DropdownMenu` |
| Click → custom popup with form | `Popover` |
| Keyed sections of one panel | `Tabs` |
| Async / inline status | `toast.*` |
| Pick a date | `DatePicker` (+`withTime`) |
| Pick from–to | `DateRangePicker` |
| Show user identity | `Avatar` + `AvatarFallback` |
| Status pill | `Badge` |
| Page hierarchy | `Breadcrumb` |
