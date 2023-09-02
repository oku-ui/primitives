import { defineBuildConfig } from 'unbuild'

const isClean = (process.env.CLEAN || 'false') === 'true'
export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      outDir: './dist/',
      declaration: true,
      pattern: ['**/!(*.test|*.stories).ts'],
    },
  ],
  clean: isClean,
})
