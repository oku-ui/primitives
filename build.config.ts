import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './packages/core/primitive/src',
      builder: 'mkdist',
      outDir: './packages/core/primitive/dist',
      format: 'esm',
      declaration: true,
      pattern: ['*.ts', '!*.test.ts'],
    },
    {
      input: './packages/components/aspect-ratio/src',
      builder: 'mkdist',
      outDir: './packages/components/aspect-ratio/dist',
      format: 'esm',
      declaration: true,
    },
  ],
  declaration: true,
  clean: true,
  externals: ['vue'],
})
