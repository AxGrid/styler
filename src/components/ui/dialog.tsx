import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal
export const DialogClose = DialogPrimitive.Close

export const DialogOverlay = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      'fixed inset-0 z-50 bg-overlay backdrop-blur-md',
      'data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

// Named max-widths so callers pick a size via a prop instead of fighting
// tailwind-merge. `max-w-lg` (base) and a caller's `md:max-w-6xl` live in
// different variant groups, so merge keeps BOTH and the winner depends on CSS
// order — that's why width overrides used to need `!`. Pass `size` instead, or
// drop an unprefixed `max-w-*` in className (that one merges correctly).
const dialogSizes = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
  '2xl': 'max-w-6xl',
  // 95% of the viewport, capped so ultrawide screens don't stretch absurdly.
  full: 'max-w-[min(95vw,1600px)]',
} as const

export const DialogContent = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & {
    showClose?: boolean
    size?: keyof typeof dialogSizes
  }
>(({ className, children, showClose = true, size = 'md', ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed left-1/2 top-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4',
        dialogSizes[size],
        'rounded-[var(--radius-xl)] border border-border bg-bg-elevated p-6',
        // Layered shadow: deep ambient + subtle brand-tinted halo so the
        // modal feels like it's lit from the page accent, not just floating.
        '[box-shadow:var(--shadow-xl),0_0_0_1px_color-mix(in_oklab,var(--brand-500)_8%,transparent),0_24px_64px_-12px_color-mix(in_oklab,var(--brand-500)_22%,transparent)]',
        'duration-300 ease-[var(--ease-smooth)]',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0',
        'data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95',
        'data-[state=open]:slide-in-from-bottom-2 data-[state=closed]:slide-out-to-bottom-2',
        className
      )}
      {...props}
    >
      {children}
      {showClose && (
        <DialogClose
          className={cn(
            'absolute right-4 top-4 inline-flex size-8 items-center justify-center rounded-[var(--radius-sm)]',
            'text-fg-muted hover:bg-surface hover:text-fg',
            'transition-colors focus-visible:outline-none',
            'focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]'
          )}
        >
          <X className="size-4" />
          <span className="sr-only">Close</span>
        </DialogClose>
      )}
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

export function DialogHeader({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn('flex flex-col gap-1.5 text-left pr-8', className)} {...props} />
}

export function DialogFooter({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

export const DialogTitle = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn('text-lg font-semibold tracking-tight text-fg', className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

export const DialogDescription = forwardRef<
  React.ComponentRef<typeof DialogPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={cn('text-sm text-fg-muted leading-relaxed', className)}
    {...props}
  />
))
DialogDescription.displayName = DialogPrimitive.Description.displayName
