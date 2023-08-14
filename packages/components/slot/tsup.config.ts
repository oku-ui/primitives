import process from 'node:process'
import { defineConfig } from 'tsup'
import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

const isClean = (process.env.CLEAN as unknown as number) !== 0

export default defineConfig((options) => {
  return [
    {
      ...options,
      entryPoints: ['src/index.ts'],
      external,
      dts: true,
      clean: isClean,
      target: 'esnext',
      format: ['esm'],
      outExtension: () => ({ js: '.mjs' }),
    },
  ]
})
