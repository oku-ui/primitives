import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { globbySync } from 'globby'

const components = globbySync('../components', {
  onlyDirectories: true,
  deep: 1,
  ignore: ['**/node_modules'],
  absolute: true,
})

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      dirs: [
        ...components.map(component => `${component}/src`),
      ],
      extensions: ['vue', 'ts'],
      include: [/\.vue$/, /\.vue\?vue/, /\.ts$/],
      deep: true,
      exclude: [/node_modules/, /\.git/],
    }),
  ],
  server: {
    fs: {
      // Allow serving files from two level up to the project root
      allow: ['..'],
    },
  },
  build: {
    watch: {
      include: ['../components/**'],
    },
  },
})
