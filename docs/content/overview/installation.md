# Installation

A quick tutorial to walk through installing the packages, as well as the supported plugins.

## Installing the package

<a href="https://www.npmjs.com/package/@oku-ui/primitives" target="__blank"><img alt="NPM Downloads" src="https://img.shields.io/npm/dm/@oku-ui/primitives?flat&colorA=002438&colorB=41c399"></a>

<InstallationTabs value="oku-primitives" />

## Nuxt modules

Oku Primitives offers Nuxt modules support.

In `nuxt.config.ts`, simply add `@oku-ui/primitives/nuxt` into the modules, and it will auto-imports all the components for you.

```ts
export default defineNuxtConfig({
  modules: ['@oku-ui/primitives/nuxt'],
})
```

## unplugin-vue-components

Oku Primitives also has resolver for the popular [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components).

In `vite.config.ts`, import `@oku-ui/primitives/resolver`, and configure as such and it will auto-imports all the components from Oku Primitives.

```ts{2,10  }
import Components from 'unplugin-vue-components/vite'
import OkuPrimitivesResolver from '@oku-ui/primitives/resolver'

export default defineConfig({
  plugins: [
    vue(),
    Components({
      dts: true,
      resolvers: [
        OkuPrimitivesResolver()

        // OkuPrimitivesResolver({
        //   prefix: '' // use the prefix option to add Prefix to the imported components
        // })
      ],
    }),
  ],
})
```
