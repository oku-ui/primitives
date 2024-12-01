import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vitest/config'
import { primitivesPackagesAlias } from './scripts_c/output'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
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
      ...primitivesPackagesAlias('./packages/core/src', resolve),
    ],
  },
})
