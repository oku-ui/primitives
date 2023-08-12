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
    '**/node_modules',
    '**/dist',
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
  execSync('pnpm build', { stdio: 'inherit' })
  console.log('finished building components ✅')

  console.log('watch mode active 🚀')
  watchMode()
}

await deleteAllPackageDists()

function whereComponent(path: string) {
  const isComponent = path.includes(join('packages/components'))
  const isCore = path.includes(join('packages/core'))

  if (isComponent) {
    const temp = path.slice(componentsPath.length, path.length)
    console.time()
    execSync(`pnpm --filter @oku-ui/${dirname(pjoin(temp)).split('/')[1]} run build`, { stdio: 'inherit' })
    console.timeEnd()
  }

  if (isCore) {
    const temp = path.slice(corePath.length, path.length)
    console.time()
    execSync(`pnpm --filter @oku-ui/${dirname(pjoin(temp)).split('/')[1]} run build`, { stdio: 'inherit' })
    console.timeEnd()
  }
}

function watchMode() {
  watch(resolve('packages'), {
    ignored: [
      '/(^|[\/\\])\../', // ignore dotfiles
      '**/node_modules',
      '**/dist',
    ],
    ignoreInitial: true,
  }).on('all', (event, path) => {
    whereComponent(path)
  })
}
