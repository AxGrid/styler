import { forwardRef } from 'react'
import * as SwitchPrimitive from '@radix-ui/react-switch'
import { cn } from '@/lib/utils'

export const Switch = forwardRef<
  React.ComponentRef<typeof SwitchPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitive.Root
    ref={ref}
    className={cn(
      'peer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full',
      'border border-transparent',
      'transition-[background-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
      'focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=unchecked]:bg-surface-2',
      'data-[state=checked]:bg-accent',
      'data-[state=checked]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_6px_18px_-3px_color-mix(in_oklab,var(--brand-500)_50%,transparent)]',
      className
    )}
    {...props}
  >
    <SwitchPrimitive.Thumb
      className={cn(
        'pointer-events-none block size-5 rounded-full bg-white shadow-md ring-0',
        'transition-transform',
        'data-[state=unchecked]:translate-x-0.5',
        'data-[state=checked]:translate-x-[22px]'
      )}
    />
  </SwitchPrimitive.Root>
))
Switch.displayName = SwitchPrimitive.Root.displayName
