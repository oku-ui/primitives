import antfu from '@antfu/eslint-config'

export default antfu(
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
      '.vitest-cache',
      '__snapshots__',
      '.docs',
      'packages/core/src/index.ts',
    ],
  },
  {
    rules: {
      'node/prefer-global/process': 'off',
      'ts/consistent-type-definitions': 'off',
      'ts/no-unused-expressions': 'off',
      '@typescript-eslint/prefer-interface': 'off',
    },
  },
  {
    files: [
      '**/*.vue',
    ],
    rules: {
      'import/first': 'off',
      'import/order': 'off',
      'vue/block-tag-newline': 'off',
    },
  },
)
