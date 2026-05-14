import build from '@hono/vite-build/node'
import devServer from '@hono/vite-dev-server'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: ['better-sqlite3'],
      output: {
        entryFileNames: '[name].js',
        format: 'es'
      }
    }
  },
  plugins: [
    build({
      entry: 'src/index.tsx',
      rollupOptions: {
        external: ['better-sqlite3'],
        output: {
          entryFileNames: 'index.js',
          format: 'es'
        }
      }
    }),
    devServer({
      entry: 'src/index.tsx'
    })
  ]
})
