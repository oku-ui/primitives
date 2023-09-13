export default defineNuxtConfig({
  modules: ['../src/module'],
  primitives: {
    installComponents: {
      'aspect-ratio': true,
      'avatar': true,
    },
  },
  devtools: { enabled: true },
})
