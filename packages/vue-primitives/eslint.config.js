import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    'tsconfig.*.json',
  ],
}, {
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
  },
})
