import antfu from '@antfu/eslint-config'

export default antfu({
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
  },
  ignores: [
    'packages',
  ],
})
