import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import TwoslashFloatingVue from '@shikijs/vitepress-twoslash/client'

import '@shikijs/twoslash/style-rich.css'
import '@shikijs/vitepress-twoslash/style.css'
import 'floating-vue/dist/style.css'

// https://vitepress.dev/guide/custom-theme
import { h } from 'vue'
import Announcement from '../components/Announcement.vue'
import ComponentPreview from '../components/ComponentPreview.vue'
import EmbedIframe from '../components/EmbedIframe.vue'
import HomePage from '../components/HomePage.vue'
import HomePageDemo from '../components/HomePageDemo.vue'
import InstallationTabs from '../components/InstallationTabs.vue'
import LayoutShowcase from '../layouts/showcase.vue'
import 'vitepress/dist/client/theme-default/styles/components/vp-doc.css'
import './style.css'
import './tailwind.postcss'

const regex = /\/(\w+)\.vue/
const baseModules = import.meta.glob('../../components/*.vue', { eager: true })
const tableModules = import.meta.glob('../../components/tables/*.vue', { eager: true })

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      'home-hero-info-before': () => h(Announcement),
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
      'home-features-after': () => h('div', [h(HomePageDemo), h(HomePage)]),
    })
  },
  enhanceApp({ app }) {
    for (const path in baseModules)
      app.component(path.match(regex)?.[1] ?? '', (baseModules[path] as any)?.default)

    for (const path in tableModules)
      app.component(path.match(regex)?.[1] ?? '', (tableModules[path] as any)?.default)

    app.component('Showcase', LayoutShowcase)
    app.component('EmbedIframe', EmbedIframe)
    app.component('ComponentPreview', ComponentPreview)
    app.component('InstallationTabs', InstallationTabs)
    app.use(TwoslashFloatingVue)

  },
} satisfies Theme
