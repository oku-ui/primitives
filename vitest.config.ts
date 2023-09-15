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
    alias: {
      '@oku-ui/arrow': './packages/components/arrow/src',
      '@oku-ui/popper': './packages/components/popper/src',
      '@oku-ui/portal': './packages/components/portal/src',
    },
  },
})
