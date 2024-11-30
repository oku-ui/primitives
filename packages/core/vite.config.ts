import { execSync } from 'node:child_process'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import pkg from './package.json'

const projectRootDir = resolve(__dirname)

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          hoistStatic: true,
          cacheHandlers: true,
        },
      },
    }),
    vueJsx(),
    dts({
      tsconfigPath: 'tsconfig.build.json',
      exclude: ['src/test/**', 'src/**/stories/**', 'src/**/*.stories.vue'],
      rollupTypes: true,
      afterBuild: async () => {
        console.log('dts afterBuild')
        // pnpm build:plugins
        execSync('pnpm build:plugins', { stdio: 'inherit', cwd: resolve(__dirname, '../plugins') })
        execSync('pnpm generate:plugins', { stdio: 'inherit', cwd: resolve(__dirname, '../plugins') })
        execSync('pnpm lint:fix', { stdio: 'inherit', cwd: resolve(__dirname, '../..') })
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src'),
    },
    dedupe: ['vue', '@vue/runtime-core'],
  },
  build: {
    minify: false,
    target: 'esnext',
    sourcemap: true,
    lib: {
      name: 'oku-ui-primitives',
      formats: ['es'],
      fileName: (format, entryName) => `${entryName}.mjs`,
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        constant: resolve(__dirname, 'src/constant/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // vendor kodlarını gruplayalım
            return 'vendor'
          }
          // src altındaki ana klasörleri ayrı chunk'lara bölelim
          const match = id.match(/[/\\]src[/\\](.*?)[/\\]/)
          if (match && match[1]) {
            return match[1]
          }
        },
        exports: 'named',
        chunkFileNames: '[name].mjs',
        hoistTransitiveImports: true,
        minifyInternalExports: true,
      },
    },
  },
})
