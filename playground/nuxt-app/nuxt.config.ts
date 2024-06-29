// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    tsConfig: {
      compilerOptions: {
        allowImportingTsExtensions: true,
        noEmit: true,
      },
    },
  },

  $development: {
    debug: true,
    devtools: { enabled: true },
  },
})
