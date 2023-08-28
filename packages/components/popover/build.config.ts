import { defineBuildConfig } from 'unbuild'

const isClean = (process.env.CLEAN || 'false') === 'true'
export default defineBuildConfig({
  // If entries is not provided, will be automatically inferred from package.json
  entries: [
    './src/index',
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
