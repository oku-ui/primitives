// Autodoc from inkline.io
// reference: https://github.com/inkline/inkline.io/blob/main/server/plugins/content.ts
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

import glob from 'fast-glob'

const rootDirPath = useRuntimeConfig().nitro
const componentsPath = resolve(rootDirPath.root, 'components')
const primitivesPath = resolve(rootDirPath.root, 'components', 'primitives')

const codeCache = new Map<string, string>()
const codeFilePaths = [
  ...glob.sync(resolve(primitivesPath, '**', '*.vue')),
  ...glob.sync(resolve(primitivesPath, '**', '*.js')),
  ...glob.sync(resolve(primitivesPath, '**', '*.ts')),
]

codeFilePaths.forEach((filePath) => {
  const keyName = filePath.substring(componentsPath.length + 1)
  codeCache.set(keyName, readFileSync(filePath, 'utf-8'))
})

const autodocsRegEx = /<!--\s*Autodocs\s*\{(.+)\}\s*-->/g
const paramsRegEx = /(\w+)="([^"]+)"/g

export default defineNitroPlugin((nitroApp) => {
  // eslint-disable-next-line ts/ban-ts-comment
  // @ts-expect-error
  nitroApp.hooks.hook('content:file:beforeParse', (file) => {
    if (file._id.endsWith('.md')) {
      let match
      let body = file.body

      do {
        match = autodocsRegEx.exec(body)
        if (match) {
          const rawParams = match[1]
          const params = [...rawParams.matchAll(paramsRegEx)].reduce<
            Record<string, string>
          >((acc, [, propertyName, propertyValue]) => {
            acc[propertyName] = propertyValue

            return acc
          }, {})
          const code = codeCache.get(params.src.substring(1))
          const codeBlocka = `\`\`\`${params.lang || 'vue'}\n${code}\n\`\`\``

          if (code?.length)
            body = body.replace(match[0], codeBlocka)
          else
            console.error(`Could not find code for ${params.src}`)
        }
      } while (match)

      file.body = body
    }
  })
})
