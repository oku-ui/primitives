'use strict'
const __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
  if (pack || arguments.length === 2) {
    for (let i = 0, l = from.length, ar; i < l; i++) {
      if (ar || !(i in from)) {
        if (!ar)
          ar = Array.prototype.slice.call(from, 0, i)
        ar[i] = from[i]
      }
    }
  }
  // eslint-disable-next-line no-undef
  return to.concat(ar || Array.prototype.slice.call(from))
}
Object.defineProperty(exports, '__esModule', { value: true })
const node_url_1 = require('node:url')
const config_1 = require('vitest/config')
const vite_config_ts_1 = require('./vite.config.ts')

exports.default = (0, config_1.mergeConfig)(vite_config_ts_1.default, (0, config_1.defineConfig)({
  test: {
    environment: 'jsdom',
    exclude: __spreadArray(__spreadArray([], config_1.configDefaults.exclude, true), ['e2e/**'], false),
    root: (0, node_url_1.fileURLToPath)(new URL('./', import.meta.url)),
  },
}))
