import autoprefixer from 'autoprefixer'
import tailwind from 'tailwindcss'
import { defineConfig, postcssIsolateStyles } from 'vitepress'
import { version } from '../../package.json'
import { teamMembers } from './contributors'
import {
  discord,
  font,
  github,
  ogImage,
  ogUrl,
  okuPrimitivesDescription,
  okuPrimitivesName,
  releases,
} from './meta'
import ComponentPreviewPlugin from './plugins/ComponentPreview'
import InstallationTabsPlugin from './plugins/InstallationTabs'

function BadgeHTML(text: string, translucent = false) {
  return `<div class="inline-flex items-center rounded-full border px-2.5 py-0.5 ml-2 mt-1 text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-green8 ${translucent ? 'bg-opacity-30' : ''} text-white">
${text}
</div>
`
}

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: okuPrimitivesName,
  description: okuPrimitivesDescription,
  lastUpdated: true,
  cleanUrls: true,
  metaChunk: true,
  head: [
    ['meta', { name: 'theme-color', content: '#00C38A' }],
    ['link', { rel: 'icon', href: '/logo.png' }],
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    [
      'meta',
      { name: 'author', content: `${teamMembers.map(c => c.name).join(', ')} and ${okuPrimitivesName} contributors` },
    ],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'vue, nuxt, component-library, radix, radix-vue, typescript, oku primitives',
      },
    ],
    ['meta', { property: 'og:title', content: okuPrimitivesName }],
    ['meta', { property: 'og:description', content: okuPrimitivesDescription }],
    ['meta', { property: 'og:url', content: ogUrl }],
    ['meta', { property: 'og:image', content: ogImage }],
    ['meta', { name: 'twitter:title', content: okuPrimitivesName }],
    ['meta', { name: 'twitter:description', content: okuPrimitivesDescription }],
    ['meta', { name: 'twitter:image', content: ogImage }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['link', { rel: 'preload', as: 'style', onload: 'this.onload=null;this.rel=\'stylesheet\'', href: font }],
    ['noscript', {}, `<link rel="stylesheet" crossorigin="anonymous" href="${font}" />`],
    ['link', { rel: 'mask-icon', href: '/logo.svg', color: '#ffffff' }],
    ['link', { rel: 'apple-touch-icon', href: '/apple-touch-icon.png', sizes: '180x180' }],
    [
      'script',
      {
        'async': true,
        'defer': true,
        'data-domain': 'primitives.oku-ui.com',
        'src': 'https://rapor.vucod.com/js/script.js',
      },
    ],
  ],
  sitemap: {
    hostname: ogUrl,
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Docs', link: '/overview/getting-started.html' },
      { text: 'Showcase', link: '/showcase' },
      {
        text: `v${version}`,
        items: [
          {
            text: 'Release Notes ',
            link: releases,
          },
        ],
      },
    ],
    outline: {
      level: [2, 3],
    },
    logo: '/logo.svg',

    sidebar: [
      {
        text: 'Overview',
        collapsed: false,
        items: [
          { text: 'Introduction', link: '/overview/introduction' },
          { text: 'Getting Started', link: '/overview/getting-started' },
          { text: 'Installation', link: '/overview/installation' },
          { text: 'Accessibility', link: '/overview/accessibility' },
          { text: 'Releases', link: '/overview/releases' },
        ],
      },
      {
        text: 'Guides',
        collapsed: false,
        items: [
          { text: 'Styling', link: '/guides/styling' },
          { text: 'Animation/Transition', link: '/guides/animation' },
          { text: 'Composition', link: '/guides/composition' },
          { text: 'Server side rendering', link: '/guides/server-side-rendering' },
          { text: 'Internationalization (RTL)', link: '/guides/i18n' },
        ],
      },
      {
        text: 'Components',
        collapsed: false,
        items: [
          { text: 'Accordion', link: '/components/accordion' },
          { text: 'Alert Dialog', link: '/components/alert-dialog' },
          { text: 'Aspect Ratio', link: '/components/aspect-ratio' },
          { text: 'Avatar', link: '/components/avatar' },
          { text: 'Checkbox', link: '/components/checkbox' },
          { text: 'Collapsible', link: '/components/collapsible' },
          { text: 'Context Menu', link: '/components/context-menu' },
          { text: 'Dialog', link: '/components/dialog' },
          { text: 'Dropdown Menu', link: '/components/dropdown-menu' },
          { text: 'Hover Card', link: '/components/hover-card' },
          { text: 'Label', link: '/components/label' },
          { text: 'Menubar', link: '/components/menubar' },
          // { text: 'Navigation Menu', link: '/components/navigation-menu' },
          { text: 'Popover', link: '/components/popover' },
          { text: 'Progress', link: '/components/progress' },
          { text: 'Radio Group', link: '/components/radio-group' },
          { text: 'Scroll Area', link: '/components/scroll-area' },
          // { text: 'Select', link: '/components/select' },
          { text: 'Slider', link: '/components/slider' },
          { text: 'Switch', link: '/components/switch' },
          { text: 'Tabs', link: '/components/tabs' },
          { text: 'Toast', link: '/components/toast' },
          { text: 'Toggle', link: '/components/toggle' },
          { text: 'Toggle Group', link: '/components/toggle-group' },
          { text: 'Toolbar', link: '/components/toolbar' },
          { text: 'Tooltip', link: '/components/tooltip' },
        ],
      },
      {
        text: 'Utilities',
        collapsed: false,
        items: [
          { text: 'Config Provider', link: '/utilities/config-provider' },
          { text: 'Visually Hidden', link: '/utilities/visually-hidden' },
          { text: 'Primitive', link: '/utilities/primitive' },
          { text: 'Slot', link: '/utilities/slot' },
          { text: 'useId', link: '/utilities/use-id' },
          { text: 'useDateFormatter', link: '/utilities/use-date-formatter' },
          { text: 'useEmitAsProps', link: '/utilities/use-emit-as-props' },
          { text: 'useForwardExpose', link: '/utilities/use-forward-expose' },
          { text: 'useForwardProps', link: '/utilities/use-forward-props' },
          { text: 'useForwardPropsEmits', link: '/utilities/use-forward-props-emits' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'discord', link: discord },
      { icon: 'github', link: github },
    ],

    search: {
      provider: 'local',
    },
    editLink: {
      pattern: 'https://github.com/oku-ui/primitives/edit/main/docs/content/:path',
    },
    // carbonAds: {
    //   code: 'CW7DV27J',
    //   placement: 'wwwoku-uicom',
    // },
  },
  srcDir: 'content',
  appearance: 'dark',
  markdown: {
    theme: 'material-theme-palenight',

    preConfig(md) {
      md.use(ComponentPreviewPlugin)
      md.use(InstallationTabsPlugin)
    },
  },
  transformPageData(pageData) {
    if (pageData.frontmatter.sidebar != null)
      return
    // hide sidebar on showcase page
    pageData.frontmatter.sidebar = pageData.frontmatter.layout !== 'showcase'
  },
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwind(),
          autoprefixer(),
          postcssIsolateStyles({ includeFiles: [/vp-doc\.css/] }),
        ],
      },
    },
  },
})
