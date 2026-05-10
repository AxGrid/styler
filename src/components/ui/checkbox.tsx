import { forwardRef } from 'react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Checkbox = forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      'peer size-4 shrink-0 rounded-[var(--radius-xs)] border border-border-strong bg-bg-elevated',
      'transition-[background-color,border-color,box-shadow] duration-200 ease-[var(--ease-smooth)]',
      'focus-visible:outline-none focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]',
      'disabled:cursor-not-allowed disabled:opacity-50',
      'data-[state=checked]:bg-accent data-[state=checked]:border-accent data-[state=checked]:text-accent-fg',
      'data-[state=checked]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_4px_14px_-2px_color-mix(in_oklab,var(--brand-500)_45%,transparent)]',
      'data-[state=indeterminate]:bg-accent data-[state=indeterminate]:border-accent data-[state=indeterminate]:text-accent-fg',
      'data-[state=indeterminate]:[box-shadow:0_0_0_3px_color-mix(in_oklab,var(--brand-500)_22%,transparent),0_4px_14px_-2px_color-mix(in_oklab,var(--brand-500)_45%,transparent)]',
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
      {props.checked === 'indeterminate' ? <Minus className="size-3" /> : <Check className="size-3" strokeWidth={3} />}
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName
