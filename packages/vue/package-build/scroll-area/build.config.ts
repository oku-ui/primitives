import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../src/packages/scroll-area', pattern: ['**/*.css'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../src/packages/scroll-area', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../src/packages/scroll-area', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
