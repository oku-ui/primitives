import path, { resolve } from 'node:path'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// https://github.com/qmhc/vite-plugin-dts
import dtsPlugin from 'vite-plugin-dts'

// https://github.com/sxzz/unplugin-vue-macros
import VueMacros from 'unplugin-vue-macros/vite'

import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
]
export default defineConfig({
  plugins: [
    dtsPlugin({
      outputDir: ['./dist/types'],
      cleanVueFileName: false,
    }),
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    target: 'modules',
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: externals,
    },
  },
})
