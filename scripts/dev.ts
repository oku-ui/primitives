import { execSync } from 'node:child_process'
import { dirname, join, resolve } from 'node:path'
import { watch } from 'chokidar'
import { join as pjoin } from 'pathe'
import { globbySync } from 'globby'
import { rimrafSync } from 'rimraf'

const componentsPath = resolve('packages/components/')
const corePath = resolve('packages/core/')
console.log(componentsPath)

const packages = globbySync(resolve('packages/components'), {
  onlyDirectories: true,
  deep: 1,
  ignore: [
    '**/node_modules/**',
    '**/dist/**',
  ],
})

const core = globbySync(resolve('packages/core'), {
  onlyDirectories: true,
  deep: 1,
  ignore: [
    '**/node_modules',
    '**/dist',
  ],
})

async function deleteAllPackageDists() {
  console.log('deleting dist folders 🔥')
  for await (const path of packages)
    rimrafSync(`${path}/dist`)

  for await (const path of core)
    rimrafSync(`${path}/dist`)
  console.log('finished deleting dist folders ✅')

  console.log('building components 🏗')
  try {
    execSync('pnpm build', { stdio: 'inherit' })
  }
  catch {
    console.log('build problem 🚨')
  }
  console.log('finished building components ✅')

  watchMode()
}

await deleteAllPackageDists()

async function whereComponent(path: string) {
  console.log('starting build 🏗')
  const isComponent = path.includes(join('packages/components'))
  const isCore = path.includes(join('packages/core'))

  if (isComponent) {
    const temp = path.slice(componentsPath.length, path.length)
    execSync(`pnpm --filter @oku-ui/${dirname(pjoin(temp)).split('/')[1]} run build`, { stdio: 'inherit' })
  }

  if (isCore) {
    const temp = path.slice(corePath.length, path.length)
    execSync(`pnpm --filter @oku-ui/${dirname(pjoin(temp)).split('/')[1]} run build`, { stdio: 'inherit' })
  }
  console.log('finished build ✅')
}

function watchMode() {
  watch(resolve('packages'), {
    ignored: [
      '/(^|[\/\\])\../', // ignore dotfiles
      '**/node_modules/**',
      '**/dist/**',
    ],
    ignoreInitial: true,
  }).on('all', async (event, path) => {
    try {
      await whereComponent(path)
    }
    catch {
      console.log('build problem 🚨')
    }
  }).once('ready', () => {
    console.log('watch mode active 🚀')
  }).prependListener('unlinkDir', async (_path) => {
    console.log('deleting dist folders 🔥')
    for await (const path of packages)
      rimrafSync(`${path}/dist`)

    for await (const path of core)
      rimrafSync(`${path}/dist`)
    console.log('finished deleting dist folders ✅')
  })
}
