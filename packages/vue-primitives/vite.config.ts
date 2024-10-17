import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'

import { primitivesPackagesAlias } from '../../scripts/output'

const resolve = (val: string) => new URL(val, import.meta.url).pathname

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Pages(),
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
  resolve: {
    alias: [
      ...primitivesPackagesAlias('./src', resolve),
    ],
  },
})
