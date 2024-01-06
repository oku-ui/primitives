import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    dir: 'packages/nuxt-module',
    coverage: {
      provider: 'v8',
      include: ['packages/nuxt/src'],
      reporter: ['text', 'json-summary', 'json', 'html'],
    },
  },
})
