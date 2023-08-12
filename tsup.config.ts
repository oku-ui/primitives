import { resolve } from 'node:path'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const packages = [
  {
    name: '@oku-ui/utils',
    path: resolve(__dirname, 'packages', 'core', 'utils'),
  },
  {
    name: '@oku-ui/use-composable',
    path: resolve(__dirname, 'packages', 'core', 'use-composable'),
  },
  {
    name: '@oku-ui/slot',
    path: resolve(__dirname, 'packages', 'components', 'slot'),
  },
  {
    name: '@oku-ui/primitive',
    path: resolve(__dirname, 'packages', 'core', 'primitive'),
  },
]

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig((options) => {
  // return [
  //   {
  //     ...options,
  //     entryPoints: ['src/index.ts'],
  //     external,
  //     dts: true,
  //     clean: true,
  //     outDir: './dist',
  //     target: 'node16',
  //     format: ['esm'],
  //     outExtension: () => ({ js: '.mjs' }),
  //   },
  // ]

  return packages.map(pkg => ({
    ...options,
    entryPoints: [`${pkg.path}/src/index.ts`],
    dts: true,
    clean: true,
    outDir: `${pkg.path}/dist`,
    target: 'node16',
    format: ['esm'],
    outExtension: () => ({ js: '.mjs' }),
    onSuccess: async () => {
      // wait for dts to be generated
      await new Promise(resolve => setTimeout(resolve, 5000))
    },
  }))
})
