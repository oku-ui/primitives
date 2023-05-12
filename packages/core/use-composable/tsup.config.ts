import type { Options } from 'tsup'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default <Options>{
  entryPoints: ['src/index.ts'],
  outDir: 'dist',
  target: 'node16',
  format: ['esm', 'cjs'],
  clean: true,
  dts: true,
  external,
}
