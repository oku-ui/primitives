import { afterEach, describe, expect, it } from 'vitest'
import { enableAutoUnmount } from '@vue/test-utils'

enableAutoUnmount(afterEach)

describe('OkuMenu', () => {
  it('should be OkuMenu', () => {
    expect(true).toBe(true)
  })
})
