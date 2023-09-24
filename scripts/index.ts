#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'pritimives',
    version: '0.0.0',
    description: 'Oku Primitives',
  },
  args: {
    publish: {
      type: 'boolean',
      description: 'Add component',
    },
  },
  subCommands: {
    publish: () => import('./commands/publish').then(m => m.default),
  },
  run({ args }) {

  },
})

runMain(main)
