import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
  ],
  server: {
    fs: {
      // Allow serving files from two level up to the project root
      allow: ['..'],
    },
  },
  build: {
    watch: {
      include: ['../components/**'],
    },
  },
  resolve: {
    alias: [
      // Components
      {
        find: '@oku-ui/slot',
        replacement: resolve('./src/packages/slot'),
      },
    ],
  },
})
