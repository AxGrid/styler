import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export const buttonVariants = cva(
  [
    'group/btn relative inline-flex items-center justify-center gap-2 select-none whitespace-nowrap',
    'font-medium tracking-tight',
    'rounded-[var(--radius-md)]',
    'transition-[background-color,color,box-shadow,transform,filter] duration-200',
    'ease-[var(--ease-smooth)]',
    'focus-visible:outline-none',
    'focus-visible:[box-shadow:0_0_0_2px_var(--bg),0_0_0_4px_var(--ring)]',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:size-4 [&_svg]:shrink-0',
  ].join(' '),
  {
    variants: {
      variant: {
        // Primary — gradient + brand-tinted glow + lift on hover, press on click.
        // The `before` overlay creates a subtle internal highlight that brightens
        // on hover for a "lit from above" feel without a second background image.
        primary: [
          'text-accent-fg',
          '[background-image:var(--grad-brand)]',
          '[box-shadow:var(--shadow-brand-md)]',
          'hover:[box-shadow:var(--shadow-brand-lg)]',
          'hover:-translate-y-px hover:brightness-[1.04]',
          'active:translate-y-0 active:scale-[0.98]',
          'active:[background-image:var(--grad-brand-pressed)]',
          'active:[box-shadow:var(--shadow-brand-sm)]',
          'before:absolute before:inset-0 before:rounded-[inherit] before:pointer-events-none',
          'before:[background:linear-gradient(180deg,color-mix(in_oklab,white_22%,transparent)_0%,transparent_45%)]',
          'before:opacity-70 hover:before:opacity-100 before:transition-opacity',
        ].join(' '),
        secondary: [
          'text-fg',
          '[background-image:var(--grad-surface)]',
          'border border-border shadow-xs',
          'hover:bg-surface-hover hover:border-border-strong hover:shadow-sm',
          'hover:-translate-y-px',
          'active:translate-y-0 active:scale-[0.98]',
        ].join(' '),
        outline: [
          'bg-transparent text-fg border border-border',
          'hover:bg-surface hover:border-border-strong',
          'active:scale-[0.98]',
        ].join(' '),
        ghost: [
          'bg-transparent text-fg',
          'hover:bg-surface',
          'active:scale-[0.98]',
        ].join(' '),
        danger: [
          'text-danger-fg',
          '[background-image:linear-gradient(180deg,color-mix(in_oklab,white_8%,var(--danger))_0%,var(--danger)_50%,color-mix(in_oklab,black_8%,var(--danger))_100%)]',
          '[box-shadow:inset_0_1px_0_0_color-mix(in_oklab,white_28%,transparent),0_6px_16px_-4px_color-mix(in_oklab,var(--danger)_45%,transparent)]',
          'hover:[box-shadow:inset_0_1px_0_0_color-mix(in_oklab,white_32%,transparent),0_12px_28px_-6px_color-mix(in_oklab,var(--danger)_55%,transparent)]',
          'hover:-translate-y-px hover:brightness-[1.04]',
          'active:translate-y-0 active:scale-[0.98]',
        ].join(' '),
        link: [
          'bg-transparent text-accent underline-offset-4',
          'hover:underline px-0 h-auto',
        ].join(' '),
      },
      size: {
        sm: 'h-8 px-3 text-[13px]',
        md: 'h-10 px-4 text-sm',
        lg: 'h-12 px-6 text-base',
        icon: 'h-10 w-10 p-0',
      },
    },
    defaultVariants: { variant: 'primary', size: 'md' },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild, loading, disabled, leftIcon, rightIcon, children, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : 'button'
    // Slot requires a single React element child. When `asChild` is used,
    // hand the user's element through untouched and rely on them for inner layout.
    const content = asChild
      ? children
      : (
        <>
          {loading ? <Loader2 className="animate-spin" /> : leftIcon}
          {/* The label sits above the ::before highlight overlay. */}
          <span className="relative inline-flex items-center gap-2">{children}</span>
          {!loading && rightIcon}
        </>
      )
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </Comp>
    )
  }
)
Button.displayName = 'Button'
