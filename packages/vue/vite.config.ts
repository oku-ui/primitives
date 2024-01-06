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
        find: '@oku-ui/scroll-area',
        replacement: resolve('./src/scroll-area'),
      },
      {
        find: '@oku-ui/checkbox',
        replacement: resolve('./src/checkbox'),
      },
      {
        find: '@oku-ui/alert-dialog',
        replacement: resolve('./src/alert-dialog'),
      },
      {
        find: '@oku-ui/slider',
        replacement: resolve('./src/slider'),
      },
      {
        find: '@oku-ui/label',
        replacement: resolve('./src/label'),
      },
      {
        find: '@oku-ui/separator',
        replacement: resolve('./src/separator'),
      },
      {
        find: '@oku-ui/popover',
        replacement: resolve('./src/popover'),
      },
      {
        find: '@oku-ui/toolbar',
        replacement: resolve('./src/toolbar'),
      },
      {
        find: '@oku-ui/toast',
        replacement: resolve('./src/toast'),
      },
      {
        find: '@oku-ui/toggle',
        replacement: resolve('./src/toggle'),
      },
      {
        find: '@oku-ui/toggle-group',
        replacement: resolve('./src/toggle-group'),
      },
      {
        find: '@oku-ui/switch',
        replacement: resolve('./src/switch'),
      },
      {
        find: '@oku-ui/radio-group',
        replacement: resolve('./src/radio-group'),
      },
      {
        find: '@oku-ui/avatar',
        replacement: resolve('./src/avatar'),
      },
      {
        find: '@oku-ui/hover-card',
        replacement: resolve('./src/hover-card'),
      },
      {
        find: '@oku-ui/collapsible',
        replacement: resolve('./src/collapsible'),
      },
      {
        find: '@oku-ui/progress',
        replacement: resolve('./src/progress'),
      },
      {
        find: '@oku-ui/tooltip',
        replacement: resolve('./src/tooltip'),
      },
      {
        find: '@oku-ui/aspect-ratio',
        replacement: resolve('./src/aspect-ratio'),
      },
      {
        find: '@oku-ui/tabs',
        replacement: resolve('./src/tabs'),
      },
      {
        find: '@oku-ui/dialog',
        replacement: resolve('./src/dialog'),
      },
      {
        find: '@oku-ui/primitives',
        replacement: resolve('./src/primitives'),
      },
      {
        find: '@oku-ui/accordion',
        replacement: resolve('./src/accordion'),
      },

      // Core
      {
        find: '@oku-ui/menu',
        replacement: resolve('./src/menu'),
      },
      {
        find: '@oku-ui/dismissable-layer',
        replacement: resolve('./src/dismissable-layer'),
      },
      {
        find: '@oku-ui/roving-focus',
        replacement: resolve('./src/roving-focus'),
      },
      {
        find: '@oku-ui/focus-scope',
        replacement: resolve('./src/focus-scope'),
      },
      {
        find: '@oku-ui/presence',
        replacement: resolve('./src/presence'),
      },
      {
        find: '@oku-ui/direction',
        replacement: resolve('./src/direction'),
      },
      {
        find: '@oku-ui/arrow',
        replacement: resolve('./src/arrow'),
      },
      {
        find: '@oku-ui/visually-hidden',
        replacement: resolve('./src/visually-hidden'),
      },
      {
        find: '@oku-ui/popper',
        replacement: resolve('./src/popper'),
      },
      {
        find: '@oku-ui/collection',
        replacement: resolve('./src/collection'),
      },
      {
        find: '@oku-ui/slot',
        replacement: resolve('./src/slot'),
      },
      {
        find: '@oku-ui/portal',
        replacement: resolve('./src/portal'),
      },
      {
        find: '@oku-ui/focus-guards',
        replacement: resolve('./src/focus-guards'),
      },
      {
        find: '@oku-ui/use-composable',
        replacement: resolve('./src/use-composable'),
      },
      {
        find: '@oku-ui/provide',
        replacement: resolve('./src/provide'),
      },
      {
        find: '@oku-ui/primitive',
        replacement: resolve('./src/primitive'),
      },
      {
        find: '@oku-ui/utils',
        replacement: resolve('./src/utils'),
      },
    ],
  },
})
