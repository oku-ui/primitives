import { defineConfig } from 'tsup'
import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineConfig((options) => {
  return [
    {
      entryPoints: ['src/index.ts'],
      external,
      dts: true,
      outDir: './dist',
      target: 'es2022',
      format: ['esm'],
      outExtension: () => ({ js: '.mjs' }),
    },
  ]
})
