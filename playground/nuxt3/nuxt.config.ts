import { resolve } from 'node:path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
  components: {
    dirs: [
      resolve(__dirname, './../../packages/components/label/src/stories'),
    ],
  },
})
