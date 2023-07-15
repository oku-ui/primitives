import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Components({
      dirs: [
        resolve(__dirname, './../../packages/components/**/src/stories'),
      ],
      deep: true,
      extensions: ['vue'],
      dts: resolve(__dirname, './src/components.d.ts'),
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),

  ],
})
