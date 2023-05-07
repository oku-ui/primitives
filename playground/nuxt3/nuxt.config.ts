import { resolve } from 'node:path'
import { addComponent, addVitePlugin, addWebpackPlugin } from '@nuxt/kit'
import { globbySync } from 'globby'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
     (_, nuxt) => {
      const components = globbySync('../../packages/components/**/src/stories/*.@(vue)')
      if (components.length > 0) {
        components.forEach((component) => {
          // LabelDemo.vue -> LabelDemo
          addComponent({filePath: component, name: component.split('/').pop()!.replace('.vue', '')})
        })
      }
    },
    '@unocss/nuxt',
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ]

})
