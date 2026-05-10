import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

const minify = process.env.MINIFY === 'true'

const externalIds = [
  'react', 'react-dom',
  'react/jsx-runtime', 'react/jsx-dev-runtime', 'react-dom/client',
  'class-variance-authority', 'clsx', 'tailwind-merge',
  'lucide-react', 'framer-motion', 'sonner', 'vaul',
  'react-day-picker', 'date-fns',
] as const

function isExternal(id: string): boolean {
  if ((externalIds as readonly string[]).includes(id)) return true
  if (id.startsWith('react/') || id.startsWith('react-dom/')) return true
  if (id.startsWith('@radix-ui/')) return true
  if (id.startsWith('date-fns/')) return true
  return false
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
  build: {
    outDir: 'dist-lib',
    emptyOutDir: false,
    cssCodeSplit: false,
    sourcemap: false,
    minify: minify ? true : false,
    lib: {
      entry: path.resolve(__dirname, 'src/ax-styler/index.ts'),
      formats: ['es'],
      fileName: () => (minify ? 'ax-styler.min.js' : 'ax-styler.js'),
      cssFileName: minify ? 'ax-styler.min' : 'ax-styler',
    },
    rollupOptions: {
      external: isExternal,
    },
  },
})
