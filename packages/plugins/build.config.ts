import { defineBuildConfig } from 'unbuild'
import { dependencies } from './package.json'

export default defineBuildConfig([
  {
    name: 'Nuxt Module',
    entries: ['./src/nuxt/index'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
  },
  {
    name: 'Unplugin Vue Component Resolver',
    entries: ['./src/resolver/index'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
  },
  {
    name: 'Namespaced',
    entries: ['./src/namespaced/index'],
    outDir: '../core/dist',
    clean: false,
    declaration: 'node16',
    externals: [
      ...Object.keys(dependencies),
    ],
  },
])
