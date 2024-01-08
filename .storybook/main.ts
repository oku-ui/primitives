import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

const config: StorybookConfig = {
  stories: [
    '../stories/*.mdx',
    `../packages/vue/src/**/stories/*.stories.@(js|jsx|ts|tsx)`,
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
            replacement: resolve('../packages/vue/src/scroll-area'),
          },
          {
            find: '@oku-ui/checkbox',
            replacement: resolve('../packages/vue/src/checkbox'),
          },
          {
            find: '@oku-ui/alert-dialog',
            replacement: resolve('../packages/vue/src/alert-dialog'),
          },
          {
            find: '@oku-ui/slider',
            replacement: resolve('../packages/vue/src/slider'),
          },
          {
            find: '@oku-ui/label',
            replacement: resolve('../packages/vue/src/label'),
          },
          {
            find: '@oku-ui/separator',
            replacement: resolve('../packages/vue/src/separator'),
          },
          {
            find: '@oku-ui/popover',
            replacement: resolve('../packages/vue/src/popover'),
          },
          {
            find: '@oku-ui/toolbar',
            replacement: resolve('../packages/vue/src/toolbar'),
          },
          {
            find: '@oku-ui/toast',
            replacement: resolve('../packages/vue/src/toast'),
          },
          {
            find: '@oku-ui/toggle',
            replacement: resolve('../packages/vue/src/toggle'),
          },
          {
            find: '@oku-ui/toggle-group',
            replacement: resolve('../packages/vue/src/toggle-group'),
          },
          {
            find: '@oku-ui/switch',
            replacement: resolve('../packages/vue/src/switch'),
          },
          {
            find: '@oku-ui/radio-group',
            replacement: resolve('../packages/vue/src/radio-group'),
          },
          {
            find: '@oku-ui/avatar',
            replacement: resolve('../packages/vue/src/avatar'),
          },
          {
            find: '@oku-ui/hover-card',
            replacement: resolve('../packages/vue/src/hover-card'),
          },
          {
            find: '@oku-ui/collapsible',
            replacement: resolve('../packages/vue/src/collapsible'),
          },
          {
            find: '@oku-ui/progress',
            replacement: resolve('../packages/vue/src/progress'),
          },
          {
            find: '@oku-ui/tooltip',
            replacement: resolve('../packages/vue/src/tooltip'),
          },
          {
            find: '@oku-ui/aspect-ratio',
            replacement: resolve('../packages/vue/src/aspect-ratio'),
          },
          {
            find: '@oku-ui/tabs',
            replacement: resolve('../packages/vue/src/tabs'),
          },
          {
            find: '@oku-ui/dialog',
            replacement: resolve('../packages/vue/src/dialog'),
          },
          {
            find: '@oku-ui/primitives',
            replacement: resolve('../packages/vue/src/primitives'),
          },
          {
            find: '@oku-ui/accordion',
            replacement: resolve('../packages/vue/src/accordion'),
          },

          // Core
          {
            find: '@oku-ui/menu',
            replacement: resolve('../packages/vue/src/menu'),
          },
          {
            find: '@oku-ui/dismissable-layer',
            replacement: resolve('../packages/vue/src/dismissable-layer'),
          },
          {
            find: '@oku-ui/roving-focus',
            replacement: resolve('../packages/vue/src/roving-focus'),
          },
          {
            find: '@oku-ui/focus-scope',
            replacement: resolve('../packages/vue/src/focus-scope'),
          },
          {
            find: '@oku-ui/presence',
            replacement: resolve('../packages/vue/src/presence'),
          },
          {
            find: '@oku-ui/direction',
            replacement: resolve('../packages/vue/src/direction'),
          },
          {
            find: '@oku-ui/arrow',
            replacement: resolve('../packages/vue/src/arrow'),
          },
          {
            find: '@oku-ui/visually-hidden',
            replacement: resolve('../packages/vue/src/visually-hidden'),
          },
          {
            find: '@oku-ui/popper',
            replacement: resolve('../packages/vue/src/popper'),
          },
          {
            find: '@oku-ui/collection',
            replacement: resolve('../packages/vue/src/collection'),
          },
          {
            find: '@oku-ui/slot',
            replacement: resolve('../packages/vue/src/slot'),
          },
          {
            find: '@oku-ui/portal',
            replacement: resolve('../packages/vue/src/portal'),
          },
          {
            find: '@oku-ui/focus-guards',
            replacement: resolve('../packages/vue/src/focus-guards'),
          },
          {
            find: '@oku-ui/use-composable',
            replacement: resolve('../packages/vue/src/use-composable'),
          },
          {
            find: '@oku-ui/provide',
            replacement: resolve('../packages/vue/src/provide'),
          },
          {
            find: '@oku-ui/primitive',
            replacement: resolve('../packages/vue/src/primitive'),
          },
          {
            find: '@oku-ui/utils',
            replacement: resolve('../packages/vue/src/utils'),
          },
        ],
      },
    })
  },
}
export default config
