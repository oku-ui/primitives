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
      fileName: (_, name) => `${name}.mjs`,
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
      },
    },
    rollupOptions: {
      external: [
        ...Object.keys(pkg.dependencies ?? {}),
        ...Object.keys(pkg.peerDependencies ?? {}),
      ],
      output: {
        manualChunks: (id) => {
          // Daha basit chunk stratejisi
          const chunks = id.match(/[/\\]src[/\\](.*?)[/\\]/)
          return chunks ? chunks[1] : null
        },
        exports: 'named',
        chunkFileNames: '[name].mjs',
        assetFileNames: 'index.css',
        hoistTransitiveImports: false,
        minifyInternalExports: true,
      },
    },

  },
  // Ön yükleme optimizasyonu
  optimizeDeps: {
    include: ['vue'],
  },
})
