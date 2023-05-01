/**
 * @link https://storybook.js.org/docs/react/configure/theming
 */
import { create } from '@storybook/theming'

export const light = create({
  base: 'light',

  colorPrimary: '#646cff',
  colorSecondary: '#454ce1',

  // UI
  appBg: '#fff',
  appContentBg: '#f3f2f8',
  appBorderColor: '#e4e1ef',
  appBorderRadius: 3,

  // Typography
  fontBase:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  // fontCode: 'monospace',

  // Text colors
  textColor: '#1c1b1f',
  textInverseColor: '#f2f2f3',

  // Toolbar default and active colors
  barTextColor: '#1c1b1f',
  barSelectedColor: '#647dee',
  barBg: '#f3f2f8',

  // Form colors
  inputBg: '#f3f2f8',
  inputBorder: '#e4e1ef',
  inputTextColor: '#666',
  inputBorderRadius: 6,

  brandTitle: 'Oku',
  // brandUrl: 'http://localhost:3000',
  // brandTarget: '_self',
  brandImage: 'https://raw.githubusercontent.com/uno-ui/uno-ui/main/assets/logo.svg',
})

export const dark = create({
  base: 'dark',

  colorPrimary: '#7f53ac',
  colorSecondary: '#647dee',

  // UI
  appBg: '#1c1b1f',
  appContentBg: '#24232a',
  appBorderColor: '#33313a',
  appBorderRadius: 3,

  // Typography
  fontBase:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Noto Sans', Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji'",
  // fontCode: 'monospace',

  // Text colors
  textColor: '#f2f2f3',
  textInverseColor: '#1c1b1f',

  // Toolbar default and active colors
  barTextColor: '#f2f2f3',
  barSelectedColor: '#647dee',
  barBg: '#24232a',

  // Form colors
  inputBg: '#24232a',
  inputBorder: '#33313a',
  inputTextColor: '#858585',
  inputBorderRadius: 6,

  brandTitle: 'Oku',
  // brandUrl: 'http://localhost:3000',
  // brandTarget: '_self',
})