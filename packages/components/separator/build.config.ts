import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      pattern: ['**/!(*.test|*.stories).ts'],
    },
  ],
  declaration: true,
})
