import { resolve } from 'node:path'
import { describe, expect, it } from 'vitest'
import { setup } from '@nuxt/test-utils'

describe('module', async () => {
  await setup({
    rootDir: resolve(__dirname, '../playground'),
    build: true,
  })

  it('should purge classes', async () => {
    // const ctx = useTestContext()
    expect(true).toBe(true)
  })
})
