import { addComponent } from '@nuxt/kit'
import { globbySync } from 'globby'
import { resolve } from 'pathe'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@unocss/nuxt',
    async () => {
      const components = globbySync('../../packages/components/**/src/stories/*.@(vue)')
      if (components.length > 0) {
        components.forEach((component) => {
          // LabelDemo.vue -> LabelDemo
          addComponent({ filePath: resolve(component), name: component.split('/').pop()!.replace('.vue', '') })
        })
      }
    },
  ],
  css: [
    '@unocss/reset/tailwind.css',
  ],
})
