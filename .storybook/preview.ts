import type { Preview } from "@storybook/vue3";
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { dark, light } from './themes'


const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: { disable: true },
		darkMode: {
			current: 'dark',
			dark,
			light,
			stylePreview: true,
		},
		docs: { theme: dark },
  },
};

export default preview;
