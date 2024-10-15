import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { globbySync } from 'globby'

const components = globbySync('./packages/components/**/src/stories/*Demo.vue', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/node_modules/@oku-ui/**'],
  deep: 4,
})
const componentsJson = components.map((component) => {
  return {
    name: component.split('/').pop()!.replace('.vue', ''),
    // AlertDialogDemo -> alert-dialog -> /alert-dialog
    path: `/${component.split('/').pop()!.replace('.vue', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/-demo$/, '')}`,
  }
})

const core = globbySync('./packages/core/**/src/stories/*Demo.vue', {
  ignore: ['**/node_modules/**', '**/dist/**', '**/node_modules/@oku-ui/**'],
  deep: 4,
})

const coreJson = core.map((component) => {
  return {
    name: component.split('/').pop()!.replace('.vue', ''),
    // AlertDialogDemo -> alert-dialog -> /alert-dialog
    path: `/${component.split('/').pop()!.replace('.vue', '').replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^-/, '').replace(/-demo$/, '')}`,
  }
})

const mergedJson = [...componentsJson, ...coreJson]

writeFileSync(resolve('./playground/vue3/src/components.json'), JSON.stringify(mergedJson, null, 2), {
  encoding: 'utf-8',
  mode: 0o666,
})

writeFileSync(resolve('./playground/nuxt3/components.json'), JSON.stringify(mergedJson, null, 2), {
  encoding: 'utf-8',
  mode: 0o666,
})

for (const component of mergedJson) {
  writeFileSync(resolve(`./playground/vue3/src/pages${component.path}.vue`), `<template>
  <div><${component.name} allshow /></div>
</template>
`)
  writeFileSync(resolve(`./playground/nuxt3/pages${component.path}.vue`), `<template>
  <div><${component.name} allshow /></div>
</template>
`)
}
