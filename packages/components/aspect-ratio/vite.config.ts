import path from 'node:path'

import Vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

// https://github.com/sxzz/unplugin-vue-macros
// @ts-expect-error - Missing types?
import VueMacros from 'unplugin-vue-macros/vite'

import * as pkg from './package.json'

const externals = [
  ...Object.keys(pkg.peerDependencies || {}),
  ...Object.keys(pkg.dependencies || {}),
]
export default defineConfig({
  plugins: [
    VueMacros({
      plugins: {
        vue: Vue(),
      },
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: externals,
    },
  },
})
