/**
 * @link https://storybook.js.org/docs/react/configure/theming
 */
import { create } from '@storybook/theming'

export const light = create({
  base: 'light',

  colorPrimary: '#3A6380',
  colorSecondary: '#427898',

  // UI
  appBg: '#fff',
  appContentBg: '#f3f2f8',
  appBorderColor: '#e4e1ef',
  appBorderRadius: 3,

  // Typography
  fontBase:
    '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Noto Sans\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\'',
  // fontCode: 'monospace',

  // Text colors
  textColor: '#1c1b1f',
  textInverseColor: '#f2f2f3',

  // Toolbar default and active colors
  barTextColor: '#1c1b1f',
  barSelectedColor: '#5F95B3',
  barBg: '#f3f2f8',

  // Form colors
  inputBg: '#f3f2f8',
  inputBorder: '#e4e1ef',
  inputTextColor: '#666',
  inputBorderRadius: 6,

  //   brandTitle: 'Oku',
  // brandUrl: 'http://localhost:3000',
  // brandTarget: '_self',
  brandImage: 'https://raw.githubusercontent.com/oku-ui/static/main/logo/logo-dark.svg',
})

export const dark = create({
  base: 'dark',

  colorPrimary: '#427898',
  colorSecondary: '#5F95B3',

  // UI
  appBg: '#1c1b1f',
  appContentBg: '#24232a',
  appBorderColor: '#33313a',
  appBorderRadius: 3,

  // Typography
  fontBase:
    '-apple-system, BlinkMacSystemFont, \'Segoe UI\', \'Noto Sans\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\'',
  // fontCode: 'monospace',

  // Text colors
  textColor: '#f2f2f3',
  textInverseColor: '#1c1b1f',

  // Toolbar default and active colors
  barTextColor: '#f2f2f3',
  barSelectedColor: '#5F95B3',
  barBg: '#24232a',

  // Form colors
  inputBg: '#24232a',
  inputBorder: '#33313a',
  inputTextColor: '#858585',
  inputBorderRadius: 6,

  brandTitle: 'Oku',
  // brandUrl: 'http://localhost:3000',
  // brandTarget: '_self',
  brandImage: 'https://raw.githubusercontent.com/oku-ui/static/main/logo/logo-white.svg',
})
