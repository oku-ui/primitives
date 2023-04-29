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
      include: ['./src/**/*.ts', './src/**/*.tsx', './src/**/*.vue'],
      skipDiagnostics: false, //  Whether to skip type diagnostics
      // aliasesExclude: ['./alert.vue'], // Exclude files from type generation
      staticImport: true, // Whether to generate static import
      outputDir: ['./dist/types'], // Output directory
      // insertTypesEntry: true, // Whether to insert a type entry
      cleanVueFileName: false, // Whether to convert '.vue.d.ts' filenames to '.d.ts'
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
