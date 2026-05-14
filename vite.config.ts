import build from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  },
  plugins: [
    build({
      entry: 'src/index.tsx',
    }),
    devServer({
      entry: 'src/index.tsx'
    })
  ]
})