// https://nuxt.com/docs/api/configuration/nuxt-config
import { defu } from 'defu'
import type { NuxtConfig } from 'nuxt/config'
import { createResolver } from '@nuxt/kit'

const { resolve } = createResolver(import.meta.url)

const routeRules = {
  '/primitives/getting-started': { redirect: '/primitives/getting-started/introduction', prerender: false },
  '/primitives/community': { redirect: '/primitives/community/getting-help', prerender: false },
}

const devConfig = {
  ssr: false,
  modules: [
    '@nuxt/content',
    '@nuxt/ui',
    // 'nuxt-og-image',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@oku-ui/primitives-nuxt',
  ],
  extends: [
    '@nuxt/ui-pro',
  ],
  devtools: { enabled: false },

  routeRules: {
    '/': { redirect: '/primitives' },
    ...routeRules,
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
  ssr: false,
  nitro: {
    prerender: {
      crawlLinks: true,
    },
  },
  routeRules: {
    ...routeRules,
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
