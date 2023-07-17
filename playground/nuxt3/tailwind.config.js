/** @type {import('tailwindcss').Config} */
export default {
  content: [
    '../../packages/**/src/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../../tailwind.config')],
}
