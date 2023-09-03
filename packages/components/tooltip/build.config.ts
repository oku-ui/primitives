import { defineBuildConfig } from 'unbuild'

const isClean = (process.env.CLEAN || 'false') === 'true'
export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      pattern: ['**/!(*.test|*.stories).ts'],
    },
  ],
  declaration: true,
  clean: isClean,
})
