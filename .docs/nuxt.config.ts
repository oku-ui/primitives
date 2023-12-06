// https://nuxt.com/docs/api/configuration/nuxt-config
import { defu } from 'defu'
import type { NuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

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
  components: {
    dirs: [{
      path: '~/components/primitives',
      pattern: '**/*.vue',
      global: true,
      isAsync: true,
    }],
  },
} as NuxtConfig

export default defineNuxtConfig(defu({}, process.env.DEV && devConfig, {
  nitro: {
    prerender: {
      ignore: [
        '/primitives',
      ],
    },
  },
  components: {
    dirs: [
      {
        path: resolve('components/primitives'),
        pattern: '**/*.vue',
        isAsync: true,
        global: true,
      },
      {
        path: resolve('components'),
      },
    ],
  },
  runtimeConfig: {
    nitro: {
      root: resolve('./'),
    },
  },
  primitives: {
    // All components install
    installComponents: true,
  },
} as NuxtConfig))
