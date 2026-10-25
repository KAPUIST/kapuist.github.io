import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import remarkGfm from 'remark-gfm'

export default defineConfig({
  base: './',
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          // Keep the renderer and chart engine separately cacheable, and lazy.
          groups: [
            { name: 'chart-renderer', test: /node_modules\/zrender\//, priority: 20 },
            { name: 'chart-engine', test: /node_modules\/echarts\//, priority: 10 },
          ],
        },
      },
    },
  },
  plugins: [
    { enforce: 'pre', ...mdx({ remarkPlugins: [remarkGfm] }) },
    react({ include: /\.(jsx|js|mdx|md|tsx|ts)$/ }),
  ],
})
