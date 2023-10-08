import { afterEach, describe, expect } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'
import { it } from 'node:test'

enableAutoUnmount(afterEach)

describe('OkuMenu', () => {
  it('should be OkuMenu', () => {
    expect(true).toBe(true)
  })
})
