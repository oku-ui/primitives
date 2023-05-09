import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      builder: 'mkdist',
      input: './src/',
      pattern: ['*.ts', '!*.test.ts'],
    },
  ],
  declaration: true,
  clean: true,
})
