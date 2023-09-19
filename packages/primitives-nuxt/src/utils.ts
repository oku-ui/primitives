import { execSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { logger, useNuxt } from '@nuxt/kit'

import type { ModuleOptions } from '@nuxt/schema'
import consola from 'consola'
import type { PackageJson } from 'pkg-types'
import { readPackageJSON } from 'pkg-types'
import { getPackageInfo } from 'local-pkg'
import type { PackageUpdateInfo } from '@nuxt/devtools'
import semver from 'semver'

export const primitivesPackageNames = [
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

export const components = {
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

export async function getMainPackageJSON(nuxt = useNuxt()) {
  return readPackageJSON(nuxt.options.rootDir)
}

export async function checkForUpdateOf(name: string, current?: string, nuxt = useNuxt()): Promise<PackageUpdateInfo | undefined> {
  try {
    if (!current) {
      const require = createRequire(nuxt.options.rootDir)
      const info = await getPackageInfo(name, { paths: require.resolve.paths(name) || undefined })
      if (!info)
        return
      current = info.packageJson.version
    }

    const packument = await import('pacote').then(r => r.default?.packument || r.packument)
    const manifest = await packument(name)

    const latest = manifest['dist-tags'].latest
    const needsUpdate = latest !== current && semver.lt(current, latest)

    return {
      name,
      current,
      latest,
      needsUpdate,
    }
  }
  catch (e) {
    logger.warn(`Failed to check for update of ${name}:`)
    logger.warn(e)
  }
}

export async function installPackage(settings: {
  packageJson: PackageJson
  rootDir: string
  installComponents: ModuleOptions['installComponents']
}) {
  let isInstall = false

  // Custom package installation
  if (typeof settings.installComponents !== 'boolean') {
    const arrayComponents = Array.from(Object.keys(settings.installComponents))
    const noInstallPackage: string[] = []
    const installedPackage: string[] = []

    for await (const key of arrayComponents) {
      if (
        (settings.packageJson.dependencies && !Object.prototype.hasOwnProperty.call(settings.packageJson.dependencies, `@oku-ui/${key}`))
        ?? (settings.packageJson.devDependencies && !Object.prototype.hasOwnProperty.call(settings.packageJson.devDependencies, `@oku-ui/${key}`))
      )
        noInstallPackage.push(key)
      else
        installedPackage.push(key)
    }

    if (noInstallPackage.length > 0) {
      execSync(`ni ${noInstallPackage.map(key => `@oku-ui/${key}`).join(' ')}`, {
        cwd: settings.rootDir,
        stdio: 'inherit',
      })
      isInstall = true
    }
    else {
      consola.info(`@oku-ui/${installedPackage.join(', @oku-ui/')}${installedPackage.length > 1 ? ' are' : ' is'} already installed`)
      isInstall = true
    }
  }
  // Full package installation
  else {
    if (
      (settings.packageJson.dependencies
         && !Object.prototype.hasOwnProperty.call(settings.packageJson.dependencies, '@oku-ui/primitives')
      )
    ?? (
      settings.packageJson.devDependencies
      && !Object.prototype.hasOwnProperty.call(settings.packageJson.devDependencies, '@oku-ui/primitives')
    )) {
      consola.info('@oku-ui/primitives is not installed')
      execSync('ni @oku-ui/primitives', {
        cwd: settings.rootDir,
        stdio: 'inherit',
      })
      isInstall = true
    }
    else {
      consola.info('@oku-ui/primitives already installed')
      isInstall = true
    }
  }

  return {
    isInstall,
  }
}
