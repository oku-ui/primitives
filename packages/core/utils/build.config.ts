import { defineBuildConfig } from 'unbuild'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineBuildConfig({
  entries: ['./src/index'],
  declaration: true,
  clean: true,
  externals: external,
  rollup: {
    emitCJS: true,
  },
})
