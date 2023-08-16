import { defineConfig } from 'tsup'
import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig((options) => {
  return [
    {
      ...options,
      entryPoints: ['src/index.ts'],
      external,
      dts: true,
      clean: true,
      target: 'esnext',
      format: ['esm'],
      outExtension: () => ({ js: '.mjs' }),
    },
  ]
})
