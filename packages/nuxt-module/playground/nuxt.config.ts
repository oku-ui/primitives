export default defineNuxtConfig({
  modules: ['../src/module'],
  // installComponents: {
  //   'aspect-ratio': true,
  //   'avatar': true,
  // },
  primitives: {
    installComponents: true,
  },
  devtools: { enabled: true },
})
