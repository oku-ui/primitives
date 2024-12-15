import type { Components } from '../../../core/src/constant'
import { writeFileSync } from 'node:fs'
import { components } from '../../../core/src/constant'

const excludedComponent = ['primitive', 'visuallyHidden']
const filteredComponent = Object.keys(components).filter(i => !excludedComponent.includes(i)) as Components[]
const flattenComponents = Object.entries(components)
  .filter(([key]) => !excludedComponent.includes(key)) // excludedComponent'e göre filtreleme
  .flatMap(([, values]) => values)

const namespaced = filteredComponent.map((curr: Components) => {
  const key = curr.charAt(0).toUpperCase() + curr.slice(1)
  const tmp: Record<string, string> = {}

  const values = components[curr]
  values.forEach((val: string) => {
    const truncated = val.replace(key, '')
    if (truncated)
      tmp[truncated] = val
  })

  if (Object.keys(tmp).length === 0) {
    return `export { ${key} }`
  }
  else {
    return `export const ${key} = {\n${
      Object.keys(tmp).map((k) => { return `  ${k}: ${tmp[k]},\n` }).join('')
    }}  as {\n${Object.keys(tmp).map((k) => {
      return `  ${k}: typeof ${tmp[k]}\n`
    }).join('')}}`
  }
})

const template = `
import { ${flattenComponents} } from '@oku-ui/primitives'

${namespaced.map(component => component).join('\n\n')}
`

writeFileSync('src/namespaced/index.ts', template, 'utf-8')
