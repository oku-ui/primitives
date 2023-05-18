import type { ChangelogConfig } from 'changelogen'

const changelogConfig: ChangelogConfig = {
  types: {
    version: { title: '🔖 Version', semver: 'patch' },
    feat: { title: '🚀 Enhancements', semver: 'minor' },
    perf: { title: '🔥 Performance', semver: 'patch' },
    fix: { title: '🩹 Fixes', semver: 'patch' },
    refactor: { title: '💅 Refactors', semver: 'patch' },
    docs: { title: '📖 Documentation', semver: 'patch' },
    build: { title: '📦 Build', semver: 'patch' },
    types: { title: '🌊 Types', semver: 'patch' },
    chore: { title: '🏡 Chora' },
    examples: { title: '🏀 Examples' },
    test: { title: '✅ Tests' },
    style: { title: '🎨 Styles' },
    ci: { title: '🤖 CI' },
  },
  cwd: process.cwd(),
  from: '',
  to: '',
  output: 'CHANGELOG.md',
  scopeMap: {},
  tokens: {
    github:
            process.env.CHANGELOGEN_TOKENS_GITHUB
            || process.env.GITHUB_TOKEN
            || process.env.GH_TOKEN,
  },
  templates: {
    commitMessage: 'chore(release): v{{newVersion}}',
    tagMessage: 'v{{newVersion}}',
    tagBody: 'v{{newVersion}}',
  },
}

export default changelogConfig
