/** @type {import('tailwindcss').Config} */
const { iconsPlugin, getIconCollections } = require('@egoist/tailwindcss-icons')

export default {
  darkMode: 'class',
  content: [
    // './src/runtime/components/html/**/*.vue',
    // './src/runtime/components/**/*.vue',
    // './packages/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    iconsPlugin({
      // Select the icon collections you want to use
      collections: getIconCollections(['ph']),
    }),
  ],
}
