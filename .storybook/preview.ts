import './style.css'
import { themes } from '@storybook/theming';
import type { Preview } from '@storybook/vue3'
import { dark, light } from './themes'
import { DocsContainer } from './DocsContainer';


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
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
      container: DocsContainer
    },
  },
};

export default preview;