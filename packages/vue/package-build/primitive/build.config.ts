import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../src/packages/primitive', pattern: ['**/*.css'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../src/packages/primitive', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../src/packages/primitive', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
