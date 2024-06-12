import { URL, fileURLToPath } from 'node:url'
import process from 'node:process'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { externalizeDeps } from 'vite-plugin-externalize-deps'
import dts from 'vite-plugin-dts'

// const srcDir = 'src'
// const outDir = 'dist'

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __DEV__: process.env.NODE_ENV !== 'production',
  },
  plugins: [
    externalizeDeps(),
    vue(),
    vueJsx(),
    dts({
      copyDtsFiles: true,
      outDir: [
        'dist',
      ],
      // exclude: ['**/stories'],
      tsconfigPath: 'tsconfig.app.json',
      // include: ['src/index.ts'],
      // exclude: ['src/ignore'],
      // staticImport: true,
      rollupTypes: true,
      // insertTypesEntry: true,
      compilerOptions: {
        declarationMap: true,
      },
    }),
  ],
  build: {
    minify: false,
    sourcemap: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      formats: ['es'],
      // the proper extensions will be added
      // fileName: 'esm/[name]',
      // fileName: (format) => {
      //   if (format === 'cjs')
      //     return 'cjs/[name].cjs'
      //   return 'esm/[name].js'
      // },
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue'],
      output: {
        // Указываем директорию для вывода, сохраняя структуру модулей
        dir: 'dist',
        // Включаем сохранение структуры модулей
        preserveModules: true,
        // Опционально, можно настроить формат имен файлов
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]',

        // preserveModules: true,
      },
    },
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})

// export default mergeConfig(
//   config,
//   tanstackBuildConfig({
//     entry: './src/index.ts',
//     srcDir: './src',
//     tsconfigPath: './tsconfig.app.json',
//   }),
// )
