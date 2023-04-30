import type { StorybookConfig } from "@storybook/vue3-vite";
import Unocss from 'unocss/vite'

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../packages/components/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/vue3-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  viteFinal(config) {
      config.plugins = config.plugins || []
      config.plugins.push(
        Unocss()
      )

     return config
  }
};
export default config;
