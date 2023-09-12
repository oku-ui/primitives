export default defineNuxtConfig({
  modules: ['../src/module'],
  primitives: {
    installComponents: {
      'aspect-ratio': true,
      'hover-card': true,

    },
  },
  devtools: { enabled: true },
})
