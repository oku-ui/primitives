import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

const config: StorybookConfig = {
  stories: [
    '../stories/*.mdx',
    `../packages/vue/src/packages/**/stories/*.stories.@(js|jsx|ts|tsx)`,
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      define: { 'process.env': {} },
      resolve: {
        alias: [
          // Components
          {
            find: '@oku-ui/scroll-area',
            replacement: resolve('../packages/vue/src/packages/scroll-area'),
          },
          {
            find: '@oku-ui/checkbox',
            replacement: resolve('../packages/vue/src/packages/checkbox'),
          },
          {
            find: '@oku-ui/alert-dialog',
            replacement: resolve('../packages/vue/src/packages/alert-dialog'),
          },
          {
            find: '@oku-ui/slider',
            replacement: resolve('../packages/vue/src/packages/slider'),
          },
          {
            find: '@oku-ui/label',
            replacement: resolve('../packages/vue/src/packages/label'),
          },
          {
            find: '@oku-ui/separator',
            replacement: resolve('../packages/vue/src/packages/separator'),
          },
          {
            find: '@oku-ui/popover',
            replacement: resolve('../packages/vue/src/packages/popover'),
          },
          {
            find: '@oku-ui/toolbar',
            replacement: resolve('../packages/vue/src/packages/toolbar'),
          },
          {
            find: '@oku-ui/toast',
            replacement: resolve('../packages/vue/src/packages/toast'),
          },
          {
            find: '@oku-ui/toggle',
            replacement: resolve('../packages/vue/src/packages/toggle'),
          },
          {
            find: '@oku-ui/toggle-group',
            replacement: resolve('../packages/vue/src/packages/toggle-group'),
          },
          {
            find: '@oku-ui/switch',
            replacement: resolve('../packages/vue/src/packages/switch'),
          },
          {
            find: '@oku-ui/radio-group',
            replacement: resolve('../packages/vue/src/packages/radio-group'),
          },
          {
            find: '@oku-ui/avatar',
            replacement: resolve('../packages/vue/src/packages/avatar'),
          },
          {
            find: '@oku-ui/hover-card',
            replacement: resolve('../packages/vue/src/packages/hover-card'),
          },
          {
            find: '@oku-ui/collapsible',
            replacement: resolve('../packages/vue/src/packages/collapsible'),
          },
          {
            find: '@oku-ui/progress',
            replacement: resolve('../packages/vue/src/packages/progress'),
          },
          {
            find: '@oku-ui/tooltip',
            replacement: resolve('../packages/vue/src/packages/tooltip'),
          },
          {
            find: '@oku-ui/aspect-ratio',
            replacement: resolve('../packages/vue/src/packages/aspect-ratio'),
          },
          {
            find: '@oku-ui/tabs',
            replacement: resolve('../packages/vue/src/packages/tabs'),
          },
          {
            find: '@oku-ui/dialog',
            replacement: resolve('../packages/vue/src/packages/dialog'),
          },
          {
            find: '@oku-ui/primitives',
            replacement: resolve('../packages/vue/src/packages/primitives'),
          },
          {
            find: '@oku-ui/accordion',
            replacement: resolve('../packages/vue/src/packages/accordion'),
          },

          // Core
          {
            find: '@oku-ui/menu',
            replacement: resolve('../packages/vue/src/packages/menu'),
          },
          {
            find: '@oku-ui/dismissable-layer',
            replacement: resolve('../packages/vue/src/packages/dismissable-layer'),
          },
          {
            find: '@oku-ui/roving-focus',
            replacement: resolve('../packages/vue/src/packages/roving-focus'),
          },
          {
            find: '@oku-ui/focus-scope',
            replacement: resolve('../packages/vue/src/packages/focus-scope'),
          },
          {
            find: '@oku-ui/presence',
            replacement: resolve('../packages/vue/src/packages/presence'),
          },
          {
            find: '@oku-ui/direction',
            replacement: resolve('../packages/vue/src/packages/direction'),
          },
          {
            find: '@oku-ui/arrow',
            replacement: resolve('../packages/vue/src/packages/arrow'),
          },
          {
            find: '@oku-ui/visually-hidden',
            replacement: resolve('../packages/vue/src/packages/visually-hidden'),
          },
          {
            find: '@oku-ui/popper',
            replacement: resolve('../packages/vue/src/packages/popper'),
          },
          {
            find: '@oku-ui/collection',
            replacement: resolve('../packages/vue/src/packages/collection'),
          },
          {
            find: '@oku-ui/slot',
            replacement: resolve('../packages/vue/src/packages/slot'),
          },
          {
            find: '@oku-ui/portal',
            replacement: resolve('../packages/vue/src/packages/portal'),
          },
          {
            find: '@oku-ui/focus-guards',
            replacement: resolve('../packages/vue/src/packages/focus-guards'),
          },
          {
            find: '@oku-ui/use-composable',
            replacement: resolve('../packages/vue/src/packages/use-composable'),
          },
          {
            find: '@oku-ui/provide',
            replacement: resolve('../packages/vue/src/packages/provide'),
          },
          {
            find: '@oku-ui/primitive',
            replacement: resolve('../packages/vue/src/packages/primitive'),
          },
          {
            find: '@oku-ui/utils',
            replacement: resolve('../packages/vue/src/packages/utils'),
          },
        ],
      },
    })
  },
}
export default config
