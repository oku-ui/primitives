import { resolve } from 'node:path'
import { addComponent, addPlugin, createResolver, defineNuxtModule, logger } from '@nuxt/kit'
import chalk from 'chalk'
import { version } from './../package.json'
import type { ModuleOptions, SelectPackage } from './types'
import { checkForUpdateOf, components, getMainPackageJSON, installPackage } from './utils'

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: '@oku-ui/primitives-nuxt',
    configKey: 'primitives',
    nuxt: '^3.5.0',
  },
  // Default configuration options of the Nuxt module
  defaults: {
    installComponents: {
      checkbox: true,
    },
    splash: true,
  },
  async setup(options, nuxt) {
    const resolver = createResolver(import.meta.url)
    const rootDir = resolve(nuxt.options.rootDir)

    let isInstall = false

    const data = await getMainPackageJSON(nuxt)
    if (data) {
      const { isInstall: install } = await installPackage({
        packageJson: data,
        rootDir,
        installComponents: options.installComponents,
      })
      isInstall = install
    }

    if (isInstall) {
      if (typeof options.installComponents !== 'boolean') {
        Object.keys(options.installComponents).forEach((key: string) => {
          if (Object.prototype.hasOwnProperty.call(options.installComponents, key)) {
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
        })
      }
      else {
        Object.keys(components).forEach((key: string) => {
          components[key as SelectPackage].forEach((component: string) => {
            addComponent({
              name: component,
              export: component,
              filePath: `@oku-ui/${key}`,
            })
          })
        })
      }
    }

    if (options.splash) {
      logger.log('')
      let latestTag = `v${version}`
      try {
        await checkForUpdateOf('@oku-ui/primitives-nuxt', version, nuxt).then((info) => {
          if (info?.needsUpdate)
            latestTag = `v${info.latest}`
        },
        )
      }
      catch (e) {
      }
      logger.log(`${chalk.green('Oku Primitives')} ${chalk.yellow(`v${version}`)} • Oku ${chalk.gray(`by ${chalk.underline('@productdevbook')}`)}`)
      if (latestTag !== `v${version}`)
        logger.log(`${chalk.gray('  ├─ ')}🎉 New version available!${chalk.gray(` Run ${chalk.underline(`pnpm i @oku-ui/primitives-nuxt${latestTag}`)} to update.`)}`)

      logger.log(chalk.dim('  └─ 💖 Like this package? Consider sponsoring me on GitHub https://github.com/sponsors/productdevbook'))
      logger.log('')
    }

    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
