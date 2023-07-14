/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx,vue}',
    '../../packages/**/src/**/*.vue',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
