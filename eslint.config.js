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
      'sort-imports': 'off',
      'import/no-duplicates': 'off',
      'import/order': 'off',
      'vue/block-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
      'vue/block-tag-newline': 'off',
      'vue/component-api-style': ['error', ['script-setup']],
      'vue/component-tags-order': ['error', {
        order: ['script', 'template', 'style'],
      }],
    },
  },
)
