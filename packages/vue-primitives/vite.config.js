'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
const node_fs_1 = require('node:fs')
const node_path_1 = require('node:path')
const node_process_1 = require('node:process')
// import { externalizeDeps } from 'vite-plugin-externalize-deps'
const plugin_vue_1 = require('@vitejs/plugin-vue')
const plugin_vue_jsx_1 = require('@vitejs/plugin-vue-jsx')
const vite_1 = require('vite')
const vite_plugin_dts_1 = require('vite-plugin-dts')
// Функция для рекурсивного поиска всех файлов index.ts в папке src
function findComponentsEntryPoints(dir, baseDir) {
  if (baseDir === void 0) {
    baseDir = ''
  }
  const entries = {}
  const files = node_fs_1.default.readdirSync(dir)
  files.forEach((file) => {
    const fullPath = node_path_1.default.join(dir, file)
    const relativePath = node_path_1.default.join(baseDir, file)
    const stat = node_fs_1.default.statSync(fullPath)
    if (stat.isDirectory()) {
      Object.assign(entries, findComponentsEntryPoints(fullPath, relativePath))
    }
    else if (file === 'index.ts') {
      const name_1 = ''.concat(node_path_1.default.relative('.', node_path_1.default.dirname(fullPath)).replace('src/', ''), '/index')
      entries[name_1] = fullPath
    }
  })
  return entries
}
const componentsDir = node_path_1.default.resolve(__dirname, 'src')
const input = findComponentsEntryPoints(componentsDir)
console.error(input)
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)({
  define: {
    __DEV__: node_process_1.default.env.NODE_ENV !== 'production',
  },
  plugins: [
    // externalizeDeps(),
    (0, plugin_vue_1.default)(),
    (0, plugin_vue_jsx_1.default)(),
    (0, vite_plugin_dts_1.default)({
      outDir: 'dist',
      include: [
        'env.d.ts',
        'src/**/*',
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/**/*.vue',
      ],
      exclude: ['src/**/__tests__/*', 'src/**/stories/*'],
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
    rollupOptions: {
      external: ['vue', '@vue/shared'],
    },
  },
  // resolve: {
  //   alias: {
  //     '~': fileURLToPath(new URL('./src', import.meta.url)),
  //   },
  // },
})
