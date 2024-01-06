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
        replacement: resolve('./src/packages/scroll-area'),
      },
      {
        find: '@oku-ui/checkbox',
        replacement: resolve('./src/packages/checkbox'),
      },
      {
        find: '@oku-ui/alert-dialog',
        replacement: resolve('./src/packages/alert-dialog'),
      },
      {
        find: '@oku-ui/slider',
        replacement: resolve('./src/packages/slider'),
      },
      {
        find: '@oku-ui/label',
        replacement: resolve('./src/packages/label'),
      },
      {
        find: '@oku-ui/separator',
        replacement: resolve('./src/packages/separator'),
      },
      {
        find: '@oku-ui/popover',
        replacement: resolve('./src/packages/popover'),
      },
      {
        find: '@oku-ui/toolbar',
        replacement: resolve('./src/packages/toolbar'),
      },
      {
        find: '@oku-ui/toast',
        replacement: resolve('./src/packages/toast'),
      },
      {
        find: '@oku-ui/toggle',
        replacement: resolve('./src/packages/toggle'),
      },
      {
        find: '@oku-ui/toggle-group',
        replacement: resolve('./src/packages/toggle-group'),
      },
      {
        find: '@oku-ui/switch',
        replacement: resolve('./src/packages/switch'),
      },
      {
        find: '@oku-ui/radio-group',
        replacement: resolve('./src/packages/radio-group'),
      },
      {
        find: '@oku-ui/avatar',
        replacement: resolve('./src/packages/avatar'),
      },
      {
        find: '@oku-ui/hover-card',
        replacement: resolve('./src/packages/hover-card'),
      },
      {
        find: '@oku-ui/collapsible',
        replacement: resolve('./src/packages/collapsible'),
      },
      {
        find: '@oku-ui/progress',
        replacement: resolve('./src/packages/progress'),
      },
      {
        find: '@oku-ui/tooltip',
        replacement: resolve('./src/packages/tooltip'),
      },
      {
        find: '@oku-ui/aspect-ratio',
        replacement: resolve('./src/packages/aspect-ratio'),
      },
      {
        find: '@oku-ui/tabs',
        replacement: resolve('./src/packages/tabs'),
      },
      {
        find: '@oku-ui/dialog',
        replacement: resolve('./src/packages/dialog'),
      },
      {
        find: '@oku-ui/primitives',
        replacement: resolve('./src/packages/primitives'),
      },
      {
        find: '@oku-ui/accordion',
        replacement: resolve('./src/packages/accordion'),
      },

      // Core
      {
        find: '@oku-ui/menu',
        replacement: resolve('./src/packages/menu'),
      },
      {
        find: '@oku-ui/dismissable-layer',
        replacement: resolve('./src/packages/dismissable-layer'),
      },
      {
        find: '@oku-ui/roving-focus',
        replacement: resolve('./src/packages/roving-focus'),
      },
      {
        find: '@oku-ui/focus-scope',
        replacement: resolve('./src/packages/focus-scope'),
      },
      {
        find: '@oku-ui/presence',
        replacement: resolve('./src/packages/presence'),
      },
      {
        find: '@oku-ui/direction',
        replacement: resolve('./src/packages/direction'),
      },
      {
        find: '@oku-ui/arrow',
        replacement: resolve('./src/packages/arrow'),
      },
      {
        find: '@oku-ui/visually-hidden',
        replacement: resolve('./src/packages/visually-hidden'),
      },
      {
        find: '@oku-ui/popper',
        replacement: resolve('./src/packages/popper'),
      },
      {
        find: '@oku-ui/collection',
        replacement: resolve('./src/packages/collection'),
      },
      {
        find: '@oku-ui/slot',
        replacement: resolve('./src/packages/slot'),
      },
      {
        find: '@oku-ui/portal',
        replacement: resolve('./src/packages/portal'),
      },
      {
        find: '@oku-ui/focus-guards',
        replacement: resolve('./src/packages/focus-guards'),
      },
      {
        find: '@oku-ui/use-composable',
        replacement: resolve('./src/packages/use-composable'),
      },
      {
        find: '@oku-ui/provide',
        replacement: resolve('./src/packages/provide'),
      },
      {
        find: '@oku-ui/primitive',
        replacement: resolve('./src/packages/primitive'),
      },
      {
        find: '@oku-ui/utils',
        replacement: resolve('./src/packages/utils'),
      },
    ],
  },
})
