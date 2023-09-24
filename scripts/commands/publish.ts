import { setTimeout } from 'node:timers/promises'
import { defineCommand } from 'citty'
import { group, intro } from '@clack/prompts'
import color from 'picocolors'

export default defineCommand({
  meta: {
    name: 'publish',
    description: 'Oku Primitives CLI Publish',
    version: '0.0.1',
  },
  async run(ctx) {
    console.clear()

    await setTimeout(1000)

    intro(`${color.bgCyan(color.black(' create-app '))}`)

    const project = await group(
      {

      },
    )
  },
})
