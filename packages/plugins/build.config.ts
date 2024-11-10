import fs from 'node:fs'
import { resolve } from 'node:path'

import { defineBuildConfig } from 'unbuild'
import { dependencies } from './package.json'

async function renameMtsToTs(file: string) {
  const files = fs.readdirSync(file)

  for (const f of files) {
    if (f.endsWith('.mts')) {
      const mts = resolve(file, f)
      const ts = mts.replace(/\.mts$/, '.ts')

      try {
        fs.renameSync(mts, ts)

        if (fs.existsSync(mts)) {
          fs.unlinkSync(mts)
        }
      }
      catch (err) {
        console.error('Error renaming or removing file:', err)
      }
    }
  }
}

export default defineBuildConfig([
  {
    name: 'Nuxt module',
    entries: ['./src/nuxt/index.ts'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
    hooks: {
      'build:done': async ({ options }) => {
        const file = resolve(options.outDir, 'nuxt')
        await renameMtsToTs(file)
      },
    },
  },
  {
    name: 'Unplugin-vue-component Resolver',
    entries: ['./src/resolver/index.ts'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
    hooks: {
      'build:done': async ({ options }) => {
        const file = resolve(options.outDir, 'resolver')
        await renameMtsToTs(file)
      },
    },
  },
  {
    name: 'Namespaced',
    entries: ['./src/namespaced/index.ts'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
    hooks: {
      'build:done': async ({ options }) => {
        const file = resolve(options.outDir, 'namespaced')
        await renameMtsToTs(file)
      },
    },
  },
])
