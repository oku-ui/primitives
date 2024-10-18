#!/usr/bin/env node

import { defineCommand, runMain } from 'citty'

const main = defineCommand({
  meta: {
    name: 'pritimives',
    version: '0.0.0',
    description: 'Oku Primitives',
  },
  subCommands: {
    publish: () => import('./commands/publish').then(m => m.default),
  },
})

runMain(main)
