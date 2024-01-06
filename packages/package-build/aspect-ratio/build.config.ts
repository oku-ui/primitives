import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    { builder: 'mkdist', input: '../../vue/src/packages/aspect-ratio', pattern: ['**/*.css', '!stories/**', '!tests/**'], loaders: ['sass'] },
    { builder: 'mkdist', input: '../../vue/src/packages/aspect-ratio', pattern: ['**/*.vue', '!stories/**', '!tests/**'], loaders: ['vue'] },
    { builder: 'mkdist', input: '../../vue/src/packages/aspect-ratio', pattern: ['**/*.ts', '!stories/**', '!tests/**'], format: 'esm', loaders: ['js'] },
  ],
  clean: true,
  declaration: true,
  externals: ['vue'],
})
