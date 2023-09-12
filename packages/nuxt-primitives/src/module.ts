import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { addComponent, addPlugin, createResolver, defineNuxtModule } from '@nuxt/kit'

import consola from 'consola'

const packages = [
  'aspect-ratio',
  'avatar',
  'checkbox',
  'collapsible',
  'dialog',
  'hover-card',
  'label',
  'popover',
  'progress',
  'radio-group',
  'separator',
  'slider',
  'switch',
  'tabs',
  'toast',
  'toggle',
  'toggle-group',
  'toolbar',
  'tooltip',
]

type SelectPackage = 'aspect-ratio' |
'avatar' |
'checkbox' |
'collapsible' |
'dialog' |
'hover-card' |
'label' |
'popover' |
'progress' |
'radio-group' |
'separator' |
'slider' |
'switch' |
'tabs' |
'toast' |
'toggle' |
'toggle-group' |
'toolbar' |
'tooltip'

const components = {
  'aspect-ratio': ['OkuAspectRatio'],
  'avatar': ['OkuAvatar', 'OkuAvatarFallback', 'OkuAvatarImage'],
  'checkbox': ['OkuCheckbox', 'OkuCheckboxIndicator'],
  'collapsible': ['OkuCollapsible', 'OkuCollapsibleContent', 'OkuCollapsibleTrigger'],
  'dialog': ['OkuDialog', 'OkuDialogClose', 'OkuDialogContent', 'OkuDialogDescription', 'OkuDialogOverlay', 'OkuDialogPortal', 'OkuDialogTitle', 'OkuDialogTrigger'],
  'hover-card': ['OkuHoverCard', 'OkuHoverCardArrow', 'OkuHoverCardContent', 'OkuHoverCardPortal', 'OkuHoverCardTrigger'],
  'label': ['OkuLabel'],
  'popover': ['OkuPopover', 'OkuPopoverArrow', 'OkuPopoverClose', 'OkuPopoverContent', 'OkuPopoverPortal', 'OkuPopoverTrigger'],
  'progress': ['OkuProgress', 'OkuProgressIndicator'],
  'radio-group': ['OkuRadioGroup', 'OkuRadioGroupIndicator', 'OkuRadioGroupItem'],
  'separator': ['OkuSeparator'],
  'slider': ['OkuSlider', 'OkuSliderRange', 'OkuSliderThumb', 'OkuSliderTrack'],
  'switch': ['OkuSwitch', 'OkuSwitchThumb'],
  'tabs': ['OkuTabs', 'OkuTabsContent', 'OkuTabsList', 'OkuTabsTrigger'],
  'toast': ['OkuToast', 'OkuToastAction', 'OkuToastDescription', 'OkuToastProvider', 'OkuToastTitle', 'OkuToastViewport'],
  'toggle': ['OkuToggle'],
  'toggle-group': ['OkuToggleGroup', 'OkuToggleGroupItem'],
  'toolbar': ['OkuToolbar', 'OkuToolbarButton', 'OkuToolbarLink', 'OkuToolbarSeparator', 'OkuToolbarToggleGroup'],
  'tooltip': ['OkuTooltip', 'OkuTooltipArrow', 'OkuTooltipContent', 'OkuTooltipPortal', 'OkuTooltipProvider', 'OkuTooltipTrigger'],
}

// Module options TypeScript interface definition
export interface ModuleOptions {
  /**
   * Select which primitives to include
   * @default {}
   * @example
   * ```ts
   * installComponents: {
   *  'aspect-ratio': true,
   *  'avatar': true,
   *  'checkbox': true,
   *  'collapsible': true,
   *  }
   * ```
   *
   */
  installComponents: {
    [key in SelectPackage]?: boolean
  }
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/nuxt-primitives',
    configKey: 'primitives',
    nuxt: '^3.7.0',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    installComponents: {
    },
  },
  setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const rootDir = resolve(nuxt.options.rootDir)

    let isInstall = false
    const data = readFileSync(resolve(rootDir, 'package.json'), 'utf-8')
    if (data) {
      const packageJson = JSON.parse(data)

      if (typeof packageJson === 'object') {
        Object.keys(options.installComponents).forEach((key: string) => {
          if (Object.prototype.hasOwnProperty.call(options.installComponents, key)) {
            if (options.installComponents[key as SelectPackage]) {
              if (packages.includes(key)) {
                if (packageJson.dependencies && Object.prototype.hasOwnProperty.call(packageJson.dependencies, `@oku-ui/${key}`)) {
                  consola.info(`@oku-ui/${key} already installed`)
                  isInstall = true
                }
                else if (packageJson.devDependencies && Object.prototype.hasOwnProperty.call(packageJson.devDependencies, `@oku-ui/${key}`)) {
                  consola.info(`@oku-ui/${key} already installed`)
                  isInstall = true
                }
                else {
                  consola.info(`@oku-ui/${key} is not installed`)
                  execSync(`ni install @oku-ui/${key}`, {
                    cwd: rootDir,
                    stdio: 'inherit',
                  })
                  isInstall = true
                }
              }
              else {
                consola.info(`@oku-ui/${key} is not a valid package`)
                throw new Error(`@oku-ui/${key} is not a valid package`)
              }
            }
          }
        })
      }
    }

    addPlugin(resolver.resolve('./runtime/plugin'))

    if (isInstall) {
      options.installComponents && Object.keys(options.installComponents).forEach((key: string) => {
        if (Object.prototype.hasOwnProperty.call(options.installComponents, key)) {
          if (options.installComponents[key as SelectPackage]) {
            if (components[key as SelectPackage]) {
              components[key as SelectPackage].forEach((component: string) => {
                addComponent({
                  name: component,
                  export: component,
                  filePath: `@oku-ui/${key}`,
                })
              })
            }
          }
        }
      })
    }
  },
})
