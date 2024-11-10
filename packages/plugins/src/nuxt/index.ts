import type { } from '@nuxt/schema' // workaround for TS bug with "phantom" deps

import { addComponent, defineNuxtModule } from '@nuxt/kit'
import { components as allComponents } from '@oku-ui/primitives/constant'

export interface ModuleOptions {
  components: Partial<Record<keyof typeof allComponents, boolean>> | boolean
  prefix: string
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/nuxt',
    configKey: 'oku-ui-primitives',
    compatibility: {
      nuxt: '>=3.14',
    },
  },
  defaults: {
    prefix: '',
    components: true,
  },
  setup(options) {
    function getComponents() {
      if (typeof options.components === 'object') {
        return Object.entries(allComponents)
          .filter(([name]) => (options.components as Record<string, boolean>)[name])
          .flatMap(([_, components]) => components)
      }

      if (options.components)
        return Object.values(allComponents).flat()

      return []
    }

    for (const component of getComponents()) {
      addComponent({
        name: `${options.prefix}${component}`,
        export: component,
        filePath: '@oku-ui/primitives',
      })
    }
  },
})
