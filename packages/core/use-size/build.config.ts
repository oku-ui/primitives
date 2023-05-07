import { defineBuildConfig } from 'unbuild'

import pkg from './package.json'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
]

export default defineBuildConfig({
  entries: [
    {
      input: './src',
      builder: 'mkdist',
      outDir: './dist',
      format: 'esm',
      declaration: true,
      pattern: ['*.ts', '!*.test.ts'],
    },
  ],
  declaration: true,
  clean: true,
  externals: external,
})
