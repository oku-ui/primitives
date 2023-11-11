import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'

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
    alias: {
      '@oku-ui/scroll-area': 'packages/components/scroll-area/src',
      '@oku-ui/checkbox': 'packages/components/checkbox/src',
      '@oku-ui/alert-dialog': 'packages/components/alert-dialog/src',
      '@oku-ui/slider': 'packages/components/slider/src',
      '@oku-ui/label': 'packages/components/label/src',
      '@oku-ui/separator': 'packages/components/separator/src',
      '@oku-ui/popover': 'packages/components/popover/src',
      '@oku-ui/toolbar': 'packages/components/toolbar/src',
      '@oku-ui/toast': 'packages/components/toast/src',
      '@oku-ui/toggle': 'packages/components/toggle/src',
      '@oku-ui/toggle-group': 'packages/components/toggle-group/src',
      '@oku-ui/switch': 'packages/components/switch/src',
      '@oku-ui/radio-group': 'packages/components/radio-group/src',
      '@oku-ui/avatar': 'packages/components/avatar/src',
      '@oku-ui/hover-card': 'packages/components/hover-card/src',
      '@oku-ui/collapsible': 'packages/components/collapsible/src',
      '@oku-ui/progress': 'packages/components/progress/src',
      '@oku-ui/tooltip': 'packages/components/tooltip/src',
      '@oku-ui/aspect-ratio': 'packages/components/aspect-ratio/src',
      '@oku-ui/tabs': 'packages/components/tabs/src',
      '@oku-ui/dialog': 'packages/components/dialog/src',
      '@oku-ui/primitives': 'packages/components/primitives/src',
      '@oku-ui/accordion': 'packages/components/accordion/src',
      '@oku-ui/dropdown': 'packages/components/dropdown/src',

      '@oku-ui/menu': 'packages/core/menu/src',
      '@oku-ui/dismissable-layer': 'packages/core/dismissable-layer/src',
      '@oku-ui/roving-focus': 'packages/core/roving-focus/src',
      '@oku-ui/focus-scope': 'packages/core/focus-scope/src',
      '@oku-ui/presence': 'packages/core/presence/src',
      '@oku-ui/direction': 'packages/core/direction/src',
      '@oku-ui/arrow': 'packages/core/arrow/src',
      '@oku-ui/visually-hidden': 'packages/core/visually-hidden/src',
      '@oku-ui/popper': 'packages/core/popper/src',
      '@oku-ui/collection': 'packages/core/collection/src',
      '@oku-ui/slot': 'packages/core/slot/src',
      '@oku-ui/portal': 'packages/core/portal/src',
      '@oku-ui/focus-guards': 'packages/core/focus-guards/src',
      '@oku-ui/use-composable': 'packages/core/use-composable/src',
      '@oku-ui/provide': 'packages/core/provide/src',
      '@oku-ui/primitive': 'packages/core/primitive/src',
      '@oku-ui/utils': 'packages/core/utils/src',
    },
  },
})
