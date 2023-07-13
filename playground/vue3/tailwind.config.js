/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    '../../packages/**/src/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  presets: [require('../../tailwind.config')],
}
