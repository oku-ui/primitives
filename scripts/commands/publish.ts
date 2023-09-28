import { setTimeout } from 'node:timers/promises'
import { readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { execSync } from 'node:child_process'
import { exit } from 'node:process'
import { defineCommand } from 'citty'
import type { MultiSelectOptions } from '@clack/prompts'
import { intro, isCancel, multiselect, outro, select } from '@clack/prompts'
import color from 'picocolors'
import { globbySync } from 'globby'

export default defineCommand({
  meta: {
    name: 'publish',
    description: 'Oku Primitives CLI Publish',
    version: '0.0.1',
  },
  async run() {
    const corePath = 'packages/core'
    const componentsPath = 'packages/components'
    const corePackages = globbySync(`${corePath}/*`, { onlyDirectories: true, cwd: process.cwd() })
    const components = globbySync(`${componentsPath}/*`, { onlyDirectories: true, cwd: process.cwd() })

    console.clear()

    await setTimeout(1000)

    intro(`${color.bgCyan(color.black(' create-app '))}`)

    const type = await select({
      message: 'Pick a folder',
      initialValue: 'ts',
      maxItems: 5,
      options: [
        { value: 'component', name: 'Components Package' },
        { value: 'core', name: 'Core Package' },
      ],
    })

    if (isCancel(type)) {
      outro('Commit cancelled')
      return
    }

    let _packages: string[] = []
    let _tags: 'alpha' | 'beta' | 'rc' | 'latest' = 'latest'

    if (type === 'component') {
      const { selectPackages, selectedTags } = await commandsPackages(components)
      console.log(selectPackages)
      _packages = selectPackages
      _tags = selectedTags
    }

    if (type === 'core') {
      const { selectPackages, selectedTags } = await commandsPackages(corePackages)
      console.log(selectPackages)
      _packages = selectPackages
      _tags = selectedTags
    }
    const wherePublish = await select({
      message: 'Publish package?',
      initialValue: 'ts',
      maxItems: 5,
      options: [
        { value: 'no', name: 'No' },
        { value: 'npm', name: 'NPM' },
      ],
    })

    if (isCancel(wherePublish)) {
      outro('Commit cancelled')
      return
    }

    if (wherePublish === 'npm') {
      for await (const component of _packages) {
        const file = readFileSync(resolve(`${component}/package.json`), 'utf8')
        const packageJson = JSON.parse(file)
        const pkversion = packageJson.version
        const isAlphaBetaRc = pkversion.includes('alpha') || pkversion.includes('beta') || pkversion.includes('rc')
        if (isAlphaBetaRc) {
          if (_tags === 'alpha') {
            execSync(`cd ${component} && pnpm build && pnpm publish --access public --no-git-checks --tag alpha`, {
              stdio: 'inherit',
            })
          }

          if (_tags === 'beta') {
            execSync(`cd ${component} && pnpm build && pnpm publish --access public --no-git-checks --tag beta`, {
              stdio: 'inherit',
            })
          }

          if (_tags === 'rc') {
            execSync(`cd ${component} && pnpm build && pnpm publish --access public --no-git-checks --tag rc`, {
              stdio: 'inherit',
            })
          }
        }

        if (_tags === 'latest') {
          execSync(`cd ${component} && pnpm build && pnpm publish --access public --no-git-checks`, {
            stdio: 'inherit',
          })
        }

        outro(`🎉  ${color.bgCyan(color.black(' Publish '))}  🎉`)
      }
    }
  },
})

async function commandsPackages(npmPackages: string[]): Promise<{
  selectPackages: string[]
  selectedTags: 'alpha' | 'beta' | 'rc' | 'latest'
}> {
  const selectPackages: string[] = []

  const which = await select({
    message: 'Pick a',
    initialValue: 'ts',
    maxItems: 5,
    options: [
      { value: 'all', name: 'All Components' },
      { value: 'single', name: 'Select Component' },
    ],
  })

  if (isCancel(which)) {
    outro('Commit cancelled')
    exit(0)
  }

  if (which === 'all')
    selectPackages.push(...npmPackages)

  if (which === 'single') {
    const options = npmPackages.map((component) => {
      const name = component.split('/')[2]
      return { value: component, label: name }
    }) as MultiSelectOptions<any, string>['options']

    const seletedComponent = await multiselect({
      message: 'Pick selects components',
      options,
    }) as string[]

    if (isCancel(seletedComponent))
      outro('Commit cancelled')

    selectPackages.push(...seletedComponent)
  }

  const version = await select({
    message: 'Pick a version',
    initialValue: 'ts',
    maxItems: 5,
    options: [
      { value: 'patch', label: 'Patch - v0.0.1' },
      { value: 'minor', label: 'Minor - v0.1.0' },
      { value: 'major', label: 'Major - v1.0.0' },
      { value: 'latest', label: 'v0.1.0-alpha.0 -> v0.1.0' },
    ],
  })

  if (isCancel(version)) {
    outro('Commit cancelled')
    exit(0)
  }

  let selectedTags: 'alpha' | 'beta' | 'rc' | 'latest' = 'latest'

  if (version !== 'patch' && version !== 'latest') {
    const selectTags = await select({
      message: 'Add tags?',
      initialValue: 'ts',
      maxItems: 5,
      options: [
        { value: 'alpha', label: 'Alpha' },
        { value: 'beta', label: 'Beta' },
        { value: 'rc', label: 'RC' },
        { value: 'latest', label: 'Latest' },
      ],
    })

    if (isCancel(selectedTags)) {
      outro('Commit cancelled')
      exit(0)
    }

    selectedTags = selectTags as 'alpha' | 'beta' | 'rc' | 'latest'
  }

  for await (const component of selectPackages) {
    const file = readFileSync(resolve(`${component}/package.json`), 'utf8')

    const packageJson = JSON.parse(file)
    const pkversion = packageJson.version

    const regex = /(\d+\.\d+\.\d+)(?:-.+)?/
    const result = pkversion.match(regex) as RegExpMatchArray

    if (version === 'patch') {
      // 1.7.3-alpha.0 -> 1.7.3-alpha.1 or 1.7.3 -> 1.7.4
      packageJson.version = packageJson.version.replace(/(\d+\.\d+\.\d+)(?:-([a-zA-Z]+\.\d+))?/, (match: any, versionPart: any, alphaPart: any) => {
        if (alphaPart) {
          const alphaNumber = Number.parseInt(alphaPart.split('.')[1])
          return `${versionPart}-${alphaPart.split('.')[0]}.${alphaNumber + 1}`
        }
        else {
          const versionNumbers = versionPart.split('.').map(Number)
          versionNumbers[2] += 1
          if (versionNumbers[2] === 10) {
            versionNumbers[1] += 1
            versionNumbers[2] = 0
          }
          return versionNumbers.join('.')
        }
      })
    }
    if (version === 'minor') {
      // 1.7.3-alpha.0 -> 1.8.0
      packageJson.version = result[1].replace(regex, (match, p1) => {
        const [major, minor, _patch] = p1.split('.').map(Number)
        return `${major}.${minor + 1}.0`
      })
    }
    if (version === 'major') {
      // 1.7.3-alpha.0 -> 2.0.0
      packageJson.version = result[1].replace(regex, (match, p1) => {
        const [major, _minor, _patch] = p1.split('.').map(Number)
        return `${major + 1}.${0}.0`
      })
    }

    selectedTags === 'alpha' && (packageJson.version += '-alpha.0')
    selectedTags === 'beta' && (packageJson.version += '-beta.0')
    selectedTags === 'rc' && (packageJson.version += '-rc.0')

    if (selectedTags === 'latest' || version === 'latest') {
      const regex = /(\d+\.\d+\.\d+)(?:-.+)?/
      const result = packageJson.version.match(regex) as RegExpMatchArray
      packageJson.version = result[1]
    }

    const newPackage = JSON.stringify(packageJson, null, 2)
    writeFileSync(`${component}/package.json`, newPackage)
  }

  for await (const component of selectPackages) {
    const file = readFileSync(resolve(`${component}/package.json`), 'utf8')

    // diff version
    const newVersion = JSON.parse(file).version
    const oldPackageJson = execSync(`git show HEAD:${component}/package.json 2>/dev/null`).toString()
    const oldVersion = JSON.parse(oldPackageJson).version
    console.log(`old version: ${oldVersion} -> new version: ${newVersion}`)
  }

  return {
    selectPackages,
    selectedTags,
  }
}
