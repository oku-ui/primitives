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
    'nuxt-component-meta',
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
  componentMeta: {
    components: [
      {
        dirs: [{
          path: '~/components/primitives',
          pattern: '**/*.vue',
        }],
      },
    ],
    exclude: [
      '@nuxt/content',
      '@nuxt/ui-templates',
      '@nuxtjs/color-mode',
      '@nuxtjs/mdc',
      'nuxt/dist',
      'nuxt-og-image',
      'nuxt-site-config',
      '@nuxtjs/mdc',
      'node_modules/**/@oku-ui/**',
      '@nuxt/ui',
      '@nuxt/ui-pro',
      '@oku-ui/primitives',
    ],
    metaFields: {
      props: false,
      slots: false,
      events: false,
      exposed: false,
      type: false,
    },
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
  components: {
    dirs: [{
      path: resolve('components/primitives'),
      pattern: '**/*.vue',
      global: true,
      isAsync: true,
    }],
  },
  primitives: {
    // All components install
    installComponents: true,
  },
} as NuxtConfig))
