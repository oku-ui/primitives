import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import { primitivesPackagesAlias } from '../scripts/output'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

const config: StorybookConfig = {
  stories: [
    '../stories/*.mdx',
    '../packages/vue-primitives/src/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
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
          ...primitivesPackagesAlias('../packages/vue-primitives/src', resolve),
        ],
      },
    })
  },
}
export default config
