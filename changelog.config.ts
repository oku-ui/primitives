import type { ChangelogConfig } from 'changelogen'

function getDefaultConfig() {
  return <Partial<ChangelogConfig>>{
    types: {
      version: { title: '🔖 Version', semver: 'patch' },
      feat: { title: '🚀 Enhancements', semver: 'minor' },
      perf: { title: '🔥 Performance', semver: 'patch' },
      fix: { title: '🩹 Fixes', semver: 'patch' },
      refactor: { title: '💅 Refactors', semver: 'patch' },
      docs: { title: '📖 Documentation', semver: 'patch' },
      build: { title: '📦 Build', semver: 'patch' },
      types: { title: '🌊 Types', semver: 'patch' },
      chore: { title: '🏡 Chore' },
      examples: { title: '🏀 Examples' },
      test: { title: '✅ Tests' },
      style: { title: '🎨 Styles' },
      ci: { title: '🤖 CI' },
    },
    repo: {
      repo: 'oku-ui/primitives',
      provider: 'github',
      domain: 'github.com',
      token: process.env.GITHUB_TOKEN,
    },
  }
}

export default getDefaultConfig
