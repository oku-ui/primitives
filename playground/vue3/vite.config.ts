import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'

import { defineConfig } from 'vite'
import Pages from 'vite-plugin-pages'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
    Components({
      dirs: [
        resolve(__dirname, './../../packages/components/**/*Demo.vue'),
        resolve(__dirname, './../../packages/core/**/*Demo.vue'),
      ],
      extensions: ['vue'],
      globs: ['**/*Demo.vue'],
      dts: resolve(__dirname, './src/components.d.ts'),
    }),
    AutoImport({
      imports: ['vue', 'vue-router'],
      dts: 'src/auto-imports.d.ts',
    }),

  ],
})
