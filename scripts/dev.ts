import { readFileSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { execaCommandSync } from 'execa'

const isCore = process.argv[2].endsWith('core')
let where = 'packages'

if (isCore)
  where = where.concat('/core')
else
  where = where.concat('/components')

const componentName = isCore ? process.argv[3] : process.argv[2]

let turboDependenFilter: string = ''

async function main() {
  const componentFile = resolve(process.cwd(), where, componentName)

  if (readdirSync(componentFile).length === 0) {
    console.error(`${componentName} does not exist`)
    process.exit(1)
  }

  const dependencies = readFileSync(resolve(componentFile, 'package.json'), 'utf-8')
  const packageName = JSON.parse(dependencies).name
  turboDependenFilter = packageName
  // const filteredDependencies = Object.entries(JSON.parse(dependencies).dependencies)
  //   .filter(([name]) => name.startsWith('@oku-ui'))
  //   .filter(([name]) => !turboDependenciesFilter.includes(name))
  //   .map(([name]) => name)
  //   .map(name => `--filter=${name}`)
  //   .join(' ')

  // turboDependenciesFilter = filteredDependencies.concat(` --filter=${packageName}`)
}

await main()
execaCommandSync(`turbo run dev --concurrency=50 --filter=${turboDependenFilter}...`, { stdio: 'inherit' })
