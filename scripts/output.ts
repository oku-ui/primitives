import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const packages = [
  'accordion',
  'alert-dialog',
  'arrow',
  'aspect-ratio',
  'avatar',
  'checkbox',
  'collapsible',
  'collection',
  'dialog',
  'direction',
  'dismissable-layer',
  'focus-guards',
  'focus-scope',
  'hover-card',
  'label',
  'menu',
  'popover',
  'popper',
  'portal',
  'presence',
  'primitive',
  'progress',
  'provide',
  'radio-group',
  'roving-focus',
  'scroll-area',
  'separator',
  'slider',
  'slot',
  'switch',
  'tabs',
  'toast',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
  'use-composable',
  'utils',
  'visually-hidden',
]

export function primitivesPackagesAlias(_path: string, resolve: any) {
  const dd = fileURLToPath(new URL('../packages/vue/src/arrow', import.meta.url))
  console.log('dd', dd, import.meta.url)

  const data = packages.map((pkg) => {
    return {
      find: `@oku-ui/${pkg}`,
      replacement: resolve ? resolve(join(_path, pkg)) : fileURLToPath(new URL(join(_path, pkg), import.meta.url)),
    }
  })

  return data
}
