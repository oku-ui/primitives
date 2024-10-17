import type { Preview } from '@storybook/vue3'
import { themes } from '@storybook/theming'
import { DocsContainer } from './DocsContainer'
import { dark, light } from './themes'
import './style.css'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    darkMode: {
      current: 'light',
      dark: {
        ...themes.dark,
        ...dark,
      },
      light: {
        ...themes.light,
        ...light,
      },
      stylePreview: true,
    },
    docs: {
      container: DocsContainer,
    },
  },
}

export default preview
