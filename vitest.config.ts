import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

export default defineConfig({
  plugins: [Vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      'packages/primitives-nuxt/**',
    ],
    include: ['./**/*.test.ts'],
    setupFiles: ['./vitest-setup.ts'],
    globals: true,
    cache: {
      dir: '.vitest-cache',
    },
  },
  resolve: {
    alias: [
      // Components
      {
        find: '@oku-ui/scroll-area',
        replacement: resolve('./packages/components/scroll-area/src'),
      },
      {
        find: '@oku-ui/checkbox',
        replacement: resolve('./packages/components/checkbox/src'),
      },
      {
        find: '@oku-ui/alert-dialog',
        replacement: resolve('./packages/components/alert-dialog/src'),
      },
      {
        find: '@oku-ui/slider',
        replacement: resolve('./packages/components/slider/src'),
      },
      {
        find: '@oku-ui/label',
        replacement: resolve('./packages/components/label/src'),
      },
      {
        find: '@oku-ui/separator',
        replacement: resolve('./packages/components/separator/src'),
      },
      {
        find: '@oku-ui/popover',
        replacement: resolve('./packages/components/popover/src'),
      },
      {
        find: '@oku-ui/toolbar',
        replacement: resolve('./packages/components/toolbar/src'),
      },
      {
        find: '@oku-ui/toast',
        replacement: resolve('./packages/components/toast/src'),
      },
      {
        find: '@oku-ui/toggle',
        replacement: resolve('./packages/components/toggle/src'),
      },
      {
        find: '@oku-ui/toggle-group',
        replacement: resolve('./packages/components/toggle-group/src'),
      },
      {
        find: '@oku-ui/switch',
        replacement: resolve('./packages/components/switch/src'),
      },
      {
        find: '@oku-ui/radio-group',
        replacement: resolve('./packages/components/radio-group/src'),
      },
      {
        find: '@oku-ui/avatar',
        replacement: resolve('./packages/components/avatar/src'),
      },
      {
        find: '@oku-ui/hover-card',
        replacement: resolve('./packages/components/hover-card/src'),
      },
      {
        find: '@oku-ui/collapsible',
        replacement: resolve('./packages/components/collapsible/src'),
      },
      {
        find: '@oku-ui/progress',
        replacement: resolve('./packages/components/progress/src'),
      },
      {
        find: '@oku-ui/tooltip',
        replacement: resolve('./packages/components/tooltip/src'),
      },
      {
        find: '@oku-ui/aspect-ratio',
        replacement: resolve('./packages/components/aspect-ratio/src'),
      },
      {
        find: '@oku-ui/tabs',
        replacement: resolve('./packages/components/tabs/src'),
      },
      {
        find: '@oku-ui/dialog',
        replacement: resolve('./packages/components/dialog/src'),
      },
      {
        find: '@oku-ui/primitives',
        replacement: resolve('./packages/components/primitives/src'),
      },
      {
        find: '@oku-ui/accordion',
        replacement: resolve('./packages/components/accordion/src'),
      },

      // Core
      {
        find: '@oku-ui/menu',
        replacement: resolve('./packages/core/menu/src'),
      },
      {
        find: '@oku-ui/dismissable-layer',
        replacement: resolve('./packages/core/dismissable-layer/src'),
      },
      {
        find: '@oku-ui/roving-focus',
        replacement: resolve('./packages/core/roving-focus/src'),
      },
      {
        find: '@oku-ui/focus-scope',
        replacement: resolve('./packages/core/focus-scope/src'),
      },
      {
        find: '@oku-ui/presence',
        replacement: resolve('./packages/core/presence/src'),
      },
      {
        find: '@oku-ui/direction',
        replacement: resolve('./packages/core/direction/src'),
      },
      {
        find: '@oku-ui/arrow',
        replacement: resolve('./packages/core/arrow/src'),
      },
      {
        find: '@oku-ui/visually-hidden',
        replacement: resolve('./packages/core/visually-hidden/src'),
      },
      {
        find: '@oku-ui/popper',
        replacement: resolve('./packages/core/popper/src'),
      },
      {
        find: '@oku-ui/collection',
        replacement: resolve('./packages/core/collection/src'),
      },
      {
        find: '@oku-ui/slot',
        replacement: resolve('./packages/core/slot/src'),
      },
      {
        find: '@oku-ui/portal',
        replacement: resolve('./packages/core/portal/src'),
      },
      {
        find: '@oku-ui/focus-guards',
        replacement: resolve('./packages/core/focus-guards/src'),
      },
      {
        find: '@oku-ui/use-composable',
        replacement: resolve('./packages/core/use-composable/src'),
      },
      {
        find: '@oku-ui/provide',
        replacement: resolve('./packages/core/provide/src'),
      },
      {
        find: '@oku-ui/primitive',
        replacement: resolve('./packages/core/primitive/src'),
      },
      {
        find: '@oku-ui/utils',
        replacement: resolve('./packages/core/utils/src'),
      },
    ],
  },
})
