import { join } from 'node:path'

export function primitivesPackagesAlias(_path: string, resolve: any) {
  const data = [
    {
      find: '@oku-ui/accordion',
      replacement: resolve(join(_path, 'accordion')),
    },
    {
      find: '@oku-ui/alert-dialog',
      replacement: resolve(join(_path, 'alert-dialog')),
    },
    {
      find: '@oku-ui/arrow',
      replacement: resolve(join(_path, 'arrow')),
    },
    {
      find: '@oku-ui/aspect-ratio',
      replacement: resolve(join(_path, 'aspect-ratio')),
    },
    {
      find: '@oku-ui/avatar',
      replacement: resolve(join(_path, 'avatar')),
    },
    {
      find: '@oku-ui/checkbox',
      replacement: resolve(join(_path, 'checkbox')),
    },
    {
      find: '@oku-ui/collapsible',
      replacement: resolve(join(_path, 'collapsible')),
    },
    {
      find: '@oku-ui/collection',
      replacement: resolve(join(_path, 'collection')),
    },
    {
      find: '@oku-ui/dialog',
      replacement: resolve(join(_path, 'dialog')),
    },
    {
      find: '@oku-ui/direction',
      replacement: resolve(join(_path, 'direction')),
    },
    {
      find: '@oku-ui/dismissable-layer',
      replacement: resolve(join(_path, 'dismissable-layer')),
    },
    {
      find: '@oku-ui/focus-guards',
      replacement: resolve(join(_path, 'focus-guards')),
    },
    {
      find: '@oku-ui/focus-scope',
      replacement: resolve(join(_path, 'focus-scope')),
    },
    {
      find: '@oku-ui/hover-card',
      replacement: resolve(join(_path, 'hover-card')),
    },
    {
      find: '@oku-ui/label',
      replacement: resolve(join(_path, 'label')),
    },
    {
      find: '@oku-ui/menu',
      replacement: resolve(join(_path, 'menu')),
    },
    {
      find: '@oku-ui/popover',
      replacement: resolve(join(_path, 'popover')),
    },
    {
      find: '@oku-ui/popper',
      replacement: resolve(join(_path, 'popper')),
    },
    {
      find: '@oku-ui/portal',
      replacement: resolve(join(_path, 'portal')),
    },
    {
      find: '@oku-ui/presence',
      replacement: resolve(join(_path, 'presence')),
    },
    {
      find: '@oku-ui/primitive',
      replacement: resolve(join(_path, 'primitive')),
    },
    {
      find: '@oku-ui/progress',
      replacement: resolve(join(_path, 'progress')),
    },
    {
      find: '@oku-ui/provide',
      replacement: resolve(join(_path, 'provide')),
    },
    {
      find: '@oku-ui/radio-group',
      replacement: resolve(join(_path, 'radio-group')),
    },
    {
      find: '@oku-ui/roving-focus',
      replacement: resolve(join(_path, 'roving-focus')),
    },
    {
      find: '@oku-ui/scroll-area',
      replacement: resolve(join(_path, 'scroll-area')),
    },
    {
      find: '@oku-ui/separator',
      replacement: resolve(join(_path, 'separator')),
    },
    {
      find: '@oku-ui/slider',
      replacement: resolve(join(_path, 'slider')),
    },
    {
      find: '@oku-ui/slot',
      replacement: resolve(join(_path, 'slot')),
    },
    {
      find: '@oku-ui/switch',
      replacement: resolve(join(_path, 'switch')),
    },
    {
      find: '@oku-ui/tabs',
      replacement: resolve(join(_path, 'tabs')),
    },
    {
      find: '@oku-ui/toast',
      replacement: resolve(join(_path, 'toast')),
    },
    {
      find: '@oku-ui/toggle',
      replacement: resolve(join(_path, 'toggle')),
    },
    {
      find: '@oku-ui/toggle-group',
      replacement: resolve(join(_path, 'toggle-group')),
    },
    {
      find: '@oku-ui/toolbar',
      replacement: resolve(join(_path, 'toolbar')),
    },
    {
      find: '@oku-ui/tooltip',
      replacement: resolve(join(_path, 'tooltip')),
    },
    {
      find: '@oku-ui/use-composable',
      replacement: resolve(join(_path, 'use-composable')),
    },
    {
      find: '@oku-ui/utils',
      replacement: resolve(join(_path, 'utils')),
    },
    {
      find: '@oku-ui/visually-hidden',
      replacement: resolve(join(_path, 'visually-hidden')),
    },
  ]
  return data
}
