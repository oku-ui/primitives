import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../src/packages/collection', pattern: ['**/*.css'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../src/packages/collection', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../src/packages/collection', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
