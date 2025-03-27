import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import { primitivesPackagesAlias } from '../scripts_c/output.ts'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

const config: StorybookConfig = {
  stories: [
    '../stories/*.mdx',
    '../packages/core/src/**/stories/*.stories.@(js|jsx|mjs|ts|tsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      // TODO: ReferenceError: clamp is not defined
      // docgen: {
      //   plugin: 'vue-component-meta',
      //   tsconfig: 'tsconfig.app.json',
      // },
    },
  },
  docs: {
    autodocs: 'tag',
  },
  viteFinal(config) {
    return mergeConfig(config, {
      define: { 'process.env': {} },
      resolve: {
        alias: [
          ...primitivesPackagesAlias('../packages/core/src', resolve),
        ],
      },
    })
  },
}
export default config
