import process from 'node:process'
// import { externalizeDeps } from 'vite-plugin-externalize-deps'

import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { globbySync } from 'globby'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
  },
  plugins: [
    // externalizeDeps(),
    vue(),
    vueJsx(),
    dts({
      outDir: 'dist',
      exclude: ['src/**/__tests__/*', 'src/**/stories/*'],
      compilerOptions: {
        composite: false,
        declaration: true,
        declarationMap: true,
      },
      tsconfigPath: 'tsconfig.app.json',
    }),
  ],
  build: {
    copyPublicDir: false,
    minify: false,
    sourcemap: true,
    lib: {
      name: 'radix',
      formats: ['es'],
      entry: [
        ...globbySync('src/**/*.ts', { ignore: [
          '**/__tests__/**',
          '**/stories/**',
          '**/*.stories.ts',
        ] }),
        'src/index.ts',
      ],
    },
    target: 'esnext',
    rollupOptions: {
      output: {
        esModule: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        entryFileNames: '[name].mjs',
      },
      external: [
        'vue',
        '@vue/shared',
        '@floating-ui/dom',
        '@floating-ui/utils',
        '@floating-ui/vue',
        'aria-hidden',
      ],
    },
  },
  resolve: {
    alias: {
      '@oku-ui': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // resolve: {
  //   alias: {
  //     '~': fileURLToPath(new URL('./src', import.meta.url)),
  //   },
  // },
})
