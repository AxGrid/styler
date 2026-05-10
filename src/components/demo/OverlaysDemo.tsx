import { useState } from 'react'
import { Bell, ChevronDown, CreditCard, Keyboard, LogOut, Plus, Settings, User, UserPlus, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { useI18n } from '@/lib/i18n'
import { Demo } from './Section'

export function OverlaysDemo() {
  const { t } = useI18n()
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Demo label="Modal (Dialog)">
        <div className="flex flex-wrap gap-3">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="primary">{t('btn.openModal')}</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{t('modal.title')}</DialogTitle>
                <DialogDescription>{t('modal.desc')}</DialogDescription>
              </DialogHeader>

              <div className="grid gap-3 py-2">
                <Label htmlFor="confirm-name">Type "confirm" to proceed</Label>
                <Input id="confirm-name" placeholder="confirm" />
              </div>

              <DialogFooter>
                <Button variant="ghost">{t('btn.cancel')}</Button>
                <Button variant="danger">{t('btn.delete')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">Glass example</Button>
            </DialogTrigger>
            <DialogContent className="glass-strong">
              <DialogHeader>
                <DialogTitle>Glassmorphic surface</DialogTitle>
                <DialogDescription>
                  Modal с прозрачным фоном и backdrop-blur. Подходит для inline-форм поверх контента.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button>{t('btn.continue')}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </Demo>

      <Demo label="Drawer">
        <div>
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">{t('btn.openDrawer')}</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{t('drawer.title')}</DrawerTitle>
                <DrawerDescription>{t('drawer.desc')}</DrawerDescription>
              </DrawerHeader>

              <div className="grid gap-4 mt-2">
                <div className="grid gap-1.5">
                  <Label htmlFor="display-name">Display name</Label>
                  <Input id="display-name" defaultValue="Sarah Reynolds" />
                </div>
                <div className="grid gap-1.5">
                  <Label htmlFor="email-d">{t('input.label.email')}</Label>
                  <Input id="email-d" type="email" defaultValue="sarah@ax-styler.dev" />
                </div>
                <div className="flex items-center justify-between rounded-[var(--radius-md)] border border-border p-3">
                  <div className="flex items-start gap-3">
                    <Bell className="mt-0.5 size-4 text-fg-muted" />
                    <div>
                      <div className="text-sm font-medium">{t('switch.notifications')}</div>
                      <div className="text-xs text-fg-muted">Push notifications on this device</div>
                    </div>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <DrawerFooter>
                <Button variant="ghost" onClick={() => setDrawerOpen(false)}>
                  {t('btn.cancel')}
                </Button>
                <Button onClick={() => setDrawerOpen(false)}>{t('btn.save')}</Button>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </Demo>

      <Demo label="Tooltip">
        <div className="flex flex-wrap items-center gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="outline" size="icon" aria-label={t('tooltip.copy')}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent>{t('tooltip.copy')}</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="ghost">Hover me</Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              Подсказка справа с указателем
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <span className="inline-flex h-6 items-center gap-1 rounded-full bg-surface-2 px-2 text-xs font-medium text-fg-muted cursor-help">
                ⌘K
              </span>
            </TooltipTrigger>
            <TooltipContent>Open command palette</TooltipContent>
          </Tooltip>
        </div>
      </Demo>

      <Demo label="Dropdown menu">
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" rightIcon={<ChevronDown />}>Account</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User /> {t('dropdown.profile')}
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings /> {t('dropdown.settings')}
                  <DropdownMenuShortcut>⌘,</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard /> Billing
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>{t('dropdown.team')}</DropdownMenuLabel>
              <DropdownMenuItem>
                <Users /> Team
              </DropdownMenuItem>
              <DropdownMenuItem>
                <UserPlus /> {t('dropdown.invite')}
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard /> {t('dropdown.shortcuts')}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-danger focus:text-danger [&_svg]:!text-danger">
                <LogOut /> {t('dropdown.signout')}
                <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Demo>
    </div>
  )
}
