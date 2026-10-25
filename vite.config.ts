import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  base: './',
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
