import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { useTheme } from '@/lib/theme'

/**
 * Toast container. Mount once at the root of the app.
 * Use the `toast()` API from "sonner" anywhere to fire notifications.
 *
 * All visual styling — including type-specific colour identity (success,
 * error, warning, info) — lives in CSS rules targeting `[data-sonner-toast]`
 * in `src/index.css`. Keeping it there avoids fighting sonner's defaults
 * through Tailwind utilities (whose bang-modifier syntax differs across v3/v4)
 * and keeps the type halos in a single place that's easy to retune.
 */
export function Toaster(props: ToasterProps) {
  const { theme } = useTheme()
  return (
    <Sonner
      theme={theme}
      position="top-right"
      offset={20}
      closeButton
      duration={4000}
      {...props}
    />
  )
}
