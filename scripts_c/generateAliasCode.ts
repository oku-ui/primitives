/* eslint-disable no-console */
import * as fs from 'node:fs'

function generateAliasCode(directory: string): string {
  const folders: string[] = collectFolderNames(directory)

  const aliasCode = folders.map(folder => ({
    find: `@oku-ui/${folder}`,
    replacement: folder,
  }))

  return `
import { join } from 'node:path';

export function primitivesPackagesAlias(_path: string, resolve: any) {
  const data = [\n${aliasCode.map(formatAliasEntry).join(',\n')} \n ];
  return data;
}
`.trim()

  function formatAliasEntry(entry: { find: string, replacement: string }): string {
    return ` {
    find: '${entry.find}',
    replacement: resolve(join(_path, '${entry.replacement}')),
}`
  }
}

function collectFolderNames(directory: string): string[] {
  const folders: string[] = []
  const files = fs.readdirSync(directory)

  for (const file of files) {
    const filePath = `${directory}/${file}`
    if (fs.statSync(filePath).isDirectory())
      folders.push(file)
  }

  return folders
}

function writeToFile(filePath: string, content: string): void {
  fs.writeFileSync(filePath, content)
}

// Specify the directory where you want to collect folder names
const directory: string = 'packages/vue/src'

// Generate alias code based on folder names
const aliasCode: string = generateAliasCode(directory)

// Specify the path for the output file
const outputFile: string = 'scripts/output.ts'

// Write the generated code to a file
writeToFile(outputFile, aliasCode)

// Change tsconfig.json paths

async function updateTsConfigPaths(
  tsconfig: string,
  writePath: string,
) {
  const tsConfig = await import(tsconfig).then(tsConfig => tsConfig.default).catch(() => ({}))

  collectFolderNames(directory).forEach((folder) => {
    tsConfig.compilerOptions ??= {}
    tsConfig.compilerOptions.paths ??= {}
    tsConfig.compilerOptions.paths[`@oku-ui/${folder}`] = [`${writePath}/${folder}`]
  },
  )

  fs.writeFileSync(tsconfig, JSON.stringify(tsConfig, null, 2))

  console.log(tsConfig)
}
const tsconfigs = [
  {
    path: 'packages/vue/tsconfig.json',
    writePath: 'src',
  },
]

for (const tsconfig of tsconfigs)
  updateTsConfigPaths(tsconfig.path, tsconfig.writePath)

async function updatePackageJson(
  packageJson: string,
  version: string,
  overwrite = false,
) {
  const packageJsonData = await import(packageJson).then(packageJson => packageJson.default).catch(() => ({}))

  collectFolderNames(directory).forEach((folder) => {
    packageJsonData.devDependencies ??= {}
    packageJsonData.devDependencies[`@oku-ui/${folder}`] = version

    if (overwrite) {
      packageJsonData.pnpm ??= {}
      packageJsonData.pnpm.overrides ??= {}
      packageJsonData.pnpm.overrides[`@oku-ui/${folder}`] = version
    }
  },
  )

  fs.writeFileSync(packageJson, JSON.stringify(packageJsonData, null, 2))

  console.log(packageJsonData)
}

const packageJsons = [
  {
    path: 'playground/vue3/package.json',
    version: 'latest',
  },
  {
    path: 'playground/nuxt3/package.json',
    version: 'latest',
  },
  {
    path: 'package.json',
    version: 'workspace:^',
    overwrite: true,
  },
]

for (const packageJson of packageJsons)
  updatePackageJson(packageJson.path, packageJson.version)
