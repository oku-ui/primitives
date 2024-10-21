import fs from 'node:fs'

import path from 'node:path'
import process from 'node:process'
// import { externalizeDeps } from 'vite-plugin-externalize-deps'

import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

// Функция для рекурсивного поиска всех файлов index.ts в папке src
function findComponentsEntryPoints(dir: string, baseDir = '') {
  const entries: Record<string, string> = {}
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const relativePath = path.join(baseDir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      Object.assign(entries, findComponentsEntryPoints(fullPath, relativePath))
    }
    else if (file === 'index.ts') {
      const name = `${path.relative('.', path.dirname(fullPath)).replace('src/', '')}/index`
      entries[name] = fullPath
    }
  })

  return entries
}

const componentsDir = path.resolve(__dirname, 'src')
const input = findComponentsEntryPoints(componentsDir)
console.error(input)

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
      entry: input,
    },
    target: 'esnext',
    rollupOptions: {
      external: ['vue', '@vue/shared'],
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
