import { readFileSync, writeFileSync } from 'node:fs'
import { execSync } from 'node:child_process'
import { globbySync } from 'globby'

// package for reading and writing files

const corePath = 'packages/core'
const componentsPath = 'packages/components'

const packages = globbySync(`${corePath}/*`, { onlyDirectories: true })

const components = globbySync(`${componentsPath}/*`, { onlyDirectories: true })

const selectType = process.argv[2] === 'c' ? components : packages

function updateVersion() {
  selectType.forEach((component) => {
    // readFile package.json
    const file = readFileSync(`${component}/package.json`, 'utf8')

    if (!file)
      return

    // parse package.json
    const packageJson = JSON.parse(file)
    // get args from process.argv
    packageJson.version = process.argv[4]
    // stringify package.json
    const newPackage = JSON.stringify(packageJson, null, 2)
    // writeFile package.json
    writeFileSync(`${component}/package.json`, newPackage)
  })
}

function publishVersion() {
  selectType.forEach((component) => {
    try {
      const goBuild = execSync(`cd ${component} && pnpm build`, { encoding: 'utf-8', stdio: 'inherit' })
      console.log(goBuild)
      const goSync = execSync(`cd ${component} && pnpm publish --access public --no-git-checks`, { encoding: 'utf-8', stdio: 'inherit' })
      console.log(goSync)
    }
    catch (error) {
      console.log(error)
    }
  })
}

const selectMerge = process.argv[3]

switch (selectMerge) {
  case 'update':
    updateVersion()
    break
  case 'publish':
    publishVersion()
    break
  default:
    break
}
