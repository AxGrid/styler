import { forwardRef } from 'react'
import type { TextareaHTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, invalid, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={cn(
          'w-full min-h-24 rounded-[var(--radius-md)] border bg-bg-elevated px-3 py-2.5',
          'text-sm text-fg shadow-xs outline-none resize-y',
          'placeholder:text-fg-subtle',
          'transition-[box-shadow,border-color] duration-200 ease-[var(--ease-smooth)]',
          'focus-visible:[box-shadow:var(--shadow-focus)]',
          'disabled:cursor-not-allowed disabled:opacity-50',
          invalid
            ? 'border-danger focus-visible:[box-shadow:var(--shadow-focus-danger)]'
            : 'border-border focus-visible:border-accent hover:border-border-strong',
          className
        )}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'
