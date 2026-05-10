/**
 * Ax Styler — public library entry point.
 * Everything other projects need is re-exported from here.
 */

// Side-effect: emits the bundled CSS alongside the JS output.
// Consumers must import `ax-styler.css` (or `ax-styler.min.css`) separately.
import './styles.css'

// Tokens & helpers
export { cn } from '@/lib/utils'
export { ThemeProvider, useTheme } from '@/lib/theme'
export type { Theme } from '@/lib/theme'
export { I18nProvider, useI18n, LOCALES, LOCALE_LABELS } from '@/lib/i18n'
export type { Locale } from '@/lib/i18n'

// Base components
export { Button, buttonVariants } from '@/components/ui/button'
export type { ButtonProps } from '@/components/ui/button'
export { Input } from '@/components/ui/input'
export type { InputProps } from '@/components/ui/input'
export { Textarea } from '@/components/ui/textarea'
export type { TextareaProps } from '@/components/ui/textarea'
export { Label } from '@/components/ui/label'
export { Badge, badgeVariants } from '@/components/ui/badge'
export type { BadgeProps } from '@/components/ui/badge'
export { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
export {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
} from '@/components/ui/card'
export { Switch } from '@/components/ui/switch'
export { Checkbox } from '@/components/ui/checkbox'
export { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
export {
  Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel,
  SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton,
} from '@/components/ui/select'

// Overlays
export {
  Dialog, DialogTrigger, DialogPortal, DialogClose, DialogOverlay,
  DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription,
} from '@/components/ui/dialog'
export {
  Drawer, DrawerTrigger, DrawerClose, DrawerPortal,
  DrawerContent, DrawerHeader, DrawerFooter, DrawerTitle, DrawerDescription,
} from '@/components/ui/drawer'
export {
  Tooltip, TooltipProvider, TooltipTrigger, TooltipContent,
} from '@/components/ui/tooltip'
export { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
export type { TabsVariant } from '@/components/ui/tabs'
export {
  Pagination, PaginationContent, PaginationItem, PaginationLink,
  PaginationPrevious, PaginationNext, PaginationEllipsis,
  paginationRange,
} from '@/components/ui/pagination'
export {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuGroup, DropdownMenuPortal,
  DropdownMenuSub, DropdownMenuRadioGroup, DropdownMenuSubTrigger, DropdownMenuSubContent,
  DropdownMenuContent, DropdownMenuItem, DropdownMenuCheckboxItem, DropdownMenuRadioItem,
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut,
} from '@/components/ui/dropdown-menu'
export {
  Popover, PopoverTrigger, PopoverAnchor, PopoverClose, PopoverContent,
} from '@/components/ui/popover'

// Tables
export {
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui/table'

// Date pickers
export { Calendar, getDateLocale } from '@/components/ui/calendar'
export { DatePicker, defaultDatePresets } from '@/components/ui/date-picker'
export type { DatePickerProps, DatePreset } from '@/components/ui/date-picker'
export {
  DateRangePicker, defaultDateRangePresets,
} from '@/components/ui/date-range-picker'
export type {
  DateRangePickerProps, DateRangePreset,
} from '@/components/ui/date-range-picker'

// Breadcrumbs
export {
  Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage,
  BreadcrumbSeparator, BreadcrumbSeparatorSlash, BreadcrumbEllipsis,
} from '@/components/ui/breadcrumb'

// Toaster
export { Toaster } from '@/components/ui/toaster'

// Higher-level
export { ThemeToggle } from '@/components/theme-toggle'
export { LangSwitcher } from '@/components/lang-switcher'
