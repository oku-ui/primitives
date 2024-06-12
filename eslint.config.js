import antfu from '@antfu/eslint-config'

export default antfu({
  ignores: [
    '.vscode',
    'packages/',
  ],
}, {
  rules: {
    'import/extensions': ['error', 'ignorePackages'],
  },
})
