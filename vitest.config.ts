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
        replacement: resolve('./packages/package-build/scroll-area/tests'),
      },
      {
        find: '@oku-ui/checkbox',
        replacement: resolve('./packages/package-build/checkbox/tests'),
      },
      {
        find: '@oku-ui/alert-dialog',
        replacement: resolve('./packages/package-build/alert-dialog/tests'),
      },
      {
        find: '@oku-ui/slider',
        replacement: resolve('./packages/package-build/slider/tests'),
      },
      {
        find: '@oku-ui/label',
        replacement: resolve('./packages/package-build/label/tests'),
      },
      {
        find: '@oku-ui/separator',
        replacement: resolve('./packages/package-build/separator/tests'),
      },
      {
        find: '@oku-ui/popover',
        replacement: resolve('./packages/package-build/popover/tests'),
      },
      {
        find: '@oku-ui/toolbar',
        replacement: resolve('./packages/package-build/toolbar/tests'),
      },
      {
        find: '@oku-ui/toast',
        replacement: resolve('./packages/package-build/toast/tests'),
      },
      {
        find: '@oku-ui/toggle',
        replacement: resolve('./packages/package-build/toggle/tests'),
      },
      {
        find: '@oku-ui/toggle-group',
        replacement: resolve('./packages/package-build/toggle-group/tests'),
      },
      {
        find: '@oku-ui/switch',
        replacement: resolve('./packages/package-build/switch/tests'),
      },
      {
        find: '@oku-ui/radio-group',
        replacement: resolve('./packages/package-build/radio-group/tests'),
      },
      {
        find: '@oku-ui/avatar',
        replacement: resolve('./packages/package-build/avatar/tests'),
      },
      {
        find: '@oku-ui/hover-card',
        replacement: resolve('./packages/package-build/hover-card/tests'),
      },
      {
        find: '@oku-ui/collapsible',
        replacement: resolve('./packages/package-build/collapsible/tests'),
      },
      {
        find: '@oku-ui/progress',
        replacement: resolve('./packages/package-build/progress/tests'),
      },
      {
        find: '@oku-ui/tooltip',
        replacement: resolve('./packages/package-build/tooltip/tests'),
      },
      {
        find: '@oku-ui/aspect-ratio',
        replacement: resolve('./packages/package-build/aspect-ratio/tests'),
      },
      {
        find: '@oku-ui/tabs',
        replacement: resolve('./packages/package-build/tabs/tests'),
      },
      {
        find: '@oku-ui/dialog',
        replacement: resolve('./packages/package-build/dialog/tests'),
      },
      {
        find: '@oku-ui/primitives',
        replacement: resolve('./packages/package-build/primitives/tests'),
      },
      {
        find: '@oku-ui/accordion',
        replacement: resolve('./packages/package-build/accordion/tests'),
      },

      // Core
      {
        find: '@oku-ui/menu',
        replacement: resolve('./packages/package-build/menu/tests'),
      },
      {
        find: '@oku-ui/dismissable-layer',
        replacement: resolve('./packages/package-build/dismissable-layer/tests'),
      },
      {
        find: '@oku-ui/roving-focus',
        replacement: resolve('./packages/package-build/roving-focus/tests'),
      },
      {
        find: '@oku-ui/focus-scope',
        replacement: resolve('./packages/package-build/focus-scope/tests'),
      },
      {
        find: '@oku-ui/presence',
        replacement: resolve('./packages/package-build/presence/tests'),
      },
      {
        find: '@oku-ui/direction',
        replacement: resolve('./packages/package-build/direction/tests'),
      },
      {
        find: '@oku-ui/arrow',
        replacement: resolve('./packages/package-build/arrow/tests'),
      },
      {
        find: '@oku-ui/visually-hidden',
        replacement: resolve('./packages/package-build/visually-hidden/tests'),
      },
      {
        find: '@oku-ui/popper',
        replacement: resolve('./packages/package-build/popper/tests'),
      },
      {
        find: '@oku-ui/collection',
        replacement: resolve('./packages/package-build/collection/tests'),
      },
      {
        find: '@oku-ui/slot',
        replacement: resolve('./packages/package-build/slot/tests'),
      },
      {
        find: '@oku-ui/portal',
        replacement: resolve('./packages/package-build/portal/tests'),
      },
      {
        find: '@oku-ui/focus-guards',
        replacement: resolve('./packages/package-build/focus-guards/tests'),
      },
      {
        find: '@oku-ui/use-composable',
        replacement: resolve('./packages/package-build/use-composable/tests'),
      },
      {
        find: '@oku-ui/provide',
        replacement: resolve('./packages/package-build/provide/tests'),
      },
      {
        find: '@oku-ui/primitive',
        replacement: resolve('./packages/package-build/primitive/tests'),
      },
      {
        find: '@oku-ui/utils',
        replacement: resolve('./packages/package-build/utils/tests'),
      },
    ],
  },
})
