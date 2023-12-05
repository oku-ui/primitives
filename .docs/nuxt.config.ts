// https://nuxt.com/docs/api/configuration/nuxt-config
import { defu } from 'defu'
import type { NuxtConfig } from 'nuxt/config'

const devConfig = {
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    'nuxt-og-image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@oku-ui/primitives-nuxt',
  ],
  extends: [
    '@nuxt/ui-pro',
  ],
  devtools: { enabled: true },

  routeRules: {
    '/': { redirect: '/primitives' },
  },

  primitives: {
    // All components install
    installComponents: true,
  },
} as NuxtConfig

export default defineNuxtConfig(defu({}, process.env.DEV && devConfig, {
  nitro: {
    prerender: {
      routes: [
        '/primitives',
        '/primitives/getting-started',
      ],
    },
  },
  primitives: {
    // All components install
    installComponents: true,
  },
} as NuxtConfig))
