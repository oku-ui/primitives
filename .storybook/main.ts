import type { StorybookConfig } from "@storybook/vue3-vite";
import {globbySync} from "globby"
const config: StorybookConfig = {
  stories: globbySync(['../stories/*.mdx', `../**/*.stories.@(js|jsx|ts|tsx)`, "!../**/node_modules/**/*"], { cwd: "./.storybook" }),
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "storybook-dark-mode"
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

     return config
  }
};
export default config;
