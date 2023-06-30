import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import type { Preview } from "@storybook/vue3";
import './public/globals.css'
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
		darkMode: {
			current: 'dark',
			dark,
			light,
			stylePreview: true,
		},
		docs: { theme: light },
    backgrounds: {
      default: "light",
      values: [
        {
          name: "light",
          value: "#ffff",
        },
        {
          name: "dark",
          value: "#1111",
        },
      ],
  },
  },
};

export default preview;
