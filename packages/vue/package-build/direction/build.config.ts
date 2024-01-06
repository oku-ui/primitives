import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../src/packages/direction', pattern: ['**/*.css'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../src/packages/direction', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../src/packages/direction', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
