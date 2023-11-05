import antfu from '@antfu/eslint-config'

export default antfu(
  {},
  {
    ignores: [
      'dist',
      '.github',
      'node_modules',
      'public',
      'coverage',
      'storybook-static',
      '.nuxt',
      '*.md',
      '*.d.ts',
      '.nx',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-definitions': 'off',
    },
  },
)
