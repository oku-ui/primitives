import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'

export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
  ],
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['./**/*.test.ts'],
    setupFiles: ['./vitest-setup.ts'],
  },
})
