import { dirname, resolve } from 'node:path'
import { readdirSync } from 'node:fs'
import type { MarkdownEnv, MarkdownRenderer } from 'vitepress'

// eslint-disable-next-line regexp/no-super-linear-backtracking
export const rawPathRegexp = /^(.+?(?:\.([a-z0-9]+))?)(#[\w-]+)?(?: ?\{(\d+(?:[,-]\d+)*)? ?(\S+)?\})? ?(?:\[(.+)\])?$/

function rawPathToToken(rawPath: string) {
  const [
    filepath = '',
    extension = '',
    region = '',
    lines = '',
    lang = '',
    rawTitle = '',
  ] = (rawPathRegexp.exec(rawPath) || []).slice(1)

  const title = rawTitle || filepath.split('/').pop() || ''

  return { filepath, extension, region, lines, lang, title }
}

export default function (md: MarkdownRenderer) {
  md.core.ruler.after('inline', 'component-preview', (state) => {
    const insertComponentImport = (importString: string) => {
      const index = state.tokens.findIndex(i => i.type === 'html_block' && i.content.match(/<script setup>/g))
      if (index === -1) {
        const importComponent = new state.Token('html_block', '', 0)

        importComponent.content = `<script setup>\n${importString}\n</script>\n`
        state.tokens.splice(0, 0, importComponent)
      }
      else {
        const content = state.tokens[index].content
        state.tokens[index].content = content.replace('</script>', `${importString}\n</script>`)
      }
    }

    // Define the regular expression to match the desired pattern
    const regex = /<ComponentPreview name="([^"]+)" \/>/g

    // Iterate through the Markdown content and replace the pattern
    state.src = state.src.replace(regex, (match, componentName) => {
      const pathName = `../../components/demo/${componentName}`
      insertComponentImport(`import ${componentName} from '${pathName}/tailwind/index.vue'`)

      const index = state.tokens.findIndex(i => i.content.match(regex))

      const { realPath, path: _path } = state.env as MarkdownEnv

      const childFiles = readdirSync(resolve(dirname(realPath ?? _path), pathName), { withFileTypes: false, recursive: true })
      const groupedFiles = childFiles.reduce((prev, curr) => {
        if (typeof curr !== 'string')
          return prev
        if (!curr.includes('/')) {
          prev[curr] = []
        }
        else {
          const folder = curr.split('/')[0]
          prev[folder].push(curr)
        }
        return prev
      }, {} as { [key: string]: string[] })

      state.tokens[index].content = `<ComponentPreview name="${componentName}" files="${encodeURIComponent(JSON.stringify(groupedFiles))}" ><${componentName} />`
      const dummyToken = new state.Token('', '', 0)
      const tokenArray: Array<typeof dummyToken> = []

      Object.entries(groupedFiles).forEach(([key, value]) => {
        const templateStart = new state.Token('html_inline', '', 0)
        templateStart.content = `<template #${key}>`
        tokenArray.push(templateStart)

        value.forEach((file) => {
          const { filepath, extension, lines, lang, title } = rawPathToToken(`@/components/demo/${componentName}/${file}`)
          const resolvedPath = resolve(dirname(realPath ?? _path), `${pathName}/${file}`)

          // Add code tokens for each line
          const token = new state.Token('fence', 'code', 0)
          token.info = `${lang || extension} ${lines ? `{${lines}}` : ''}${
            title ? `[${title}]` : ''
          }`
          token.content = `<<< ${filepath}`
          // @ts-expect-error token.src is for snippets plugin to handle importing snippet
          token.src = [resolvedPath]
          tokenArray.push(token)
        })

        const templateEnd = new state.Token('html_inline', '', 0)
        templateEnd.content = '</template>'
        tokenArray.push(templateEnd)
      })

      const endTag = new state.Token('html_inline', '', 0)
      endTag.content = '</ComponentPreview>'
      tokenArray.push(endTag)

      state.tokens.splice(index + 1, 0, ...tokenArray)

      // Return an empty string to replace the original pattern
      return ''
    })
  })
}
