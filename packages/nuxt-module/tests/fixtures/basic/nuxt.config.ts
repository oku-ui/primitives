// 1. Create a Nuxt application to be used as a "fixture"
import MyModule from '../../../src/module'

export default defineNuxtConfig({
  ssr: true,
  modules: [
    MyModule,
  ],
})
