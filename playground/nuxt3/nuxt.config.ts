import { writeFileSync } from 'node:fs'
import { addComponent } from '@nuxt/kit'
import { globbySync } from 'globby'
import { resolve } from 'pathe'

const components = globbySync('../../packages/components/**/src/stories/*Demo.vue', {
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

const core = globbySync('../../packages/core/**/src/stories/*Demo.vue', {
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

writeFileSync(resolve('./components.json'), JSON.stringify(mergedJson, null, 2))

// pages/avatar.vue
// <template>
//   <div>
//     <LabelDemo />
//   </div>
// </template>

for await (const component of mergedJson)
  writeFileSync(resolve(`./pages${component.path}.vue`), `<template><div><${component.name} /></div></template>`)

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    async () => {
      if (components.length > 0) {
        components.forEach((component) => {
          // LabelDemo.vue -> LabelDemo
          addComponent({ filePath: resolve(component), name: component.split('/').pop()!.replace('.vue', ''), priority: 1 })
        })
      }
      if (core.length > 0) {
        core.forEach((component) => {
          // LabelDemo.vue -> LabelDemo
          addComponent({ filePath: resolve(component), name: component.split('/').pop()!.replace('.vue', ''), priority: 1 })
        })
      }
    },
  ],
})
