import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      pattern: ['**', '!stories'],
      declaration: true,
    },
  ],
})
