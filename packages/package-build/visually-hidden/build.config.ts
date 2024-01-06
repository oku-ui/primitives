import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../vue/src/packages/visually-hidden', pattern: ['**/*.css'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../vue/src/packages/visually-hidden', pattern: ['**/*.vue'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../vue/src/packages/visually-hidden', pattern: ['**/*.ts'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
