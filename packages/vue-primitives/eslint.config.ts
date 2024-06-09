import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'import/extensions': ['error', 'always'],
  },
  ignores: [
    'packages',
  ],
})
