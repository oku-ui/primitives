import { describe, expect, it } from 'vitest'
import { findNextItem, wrapArray } from '../src/utils'

describe('findNextItem', () => {
  const items = [
    { textValue: 'apple' },
    { textValue: 'banana' },
    { textValue: 'cherry' },
  ]

  it('should find the next item in the list', () => {
    const currentItem = { textValue: 'banana' }
    const result = findNextItem(items, 'c', currentItem)
    expect(result).toEqual({ textValue: 'cherry' })
  })

  it('should handle repeated characters', () => {
    const currentItem = { textValue: 'banana' }
    const result = findNextItem(items, 'aaa', currentItem)
    expect(result).toEqual({ textValue: 'apple' })
  })

  it('should return undefined if no next item is found', () => {
    const currentItem = { textValue: 'cherry' }
    const result = findNextItem(items, 'z', currentItem)
    expect(result).toBeUndefined()
  })

  it('should handle case-insensitive search', () => {
    const currentItem = { textValue: 'banana' }
    const result = findNextItem(items, 'C', currentItem)
    expect(result).toEqual({ textValue: 'cherry' })
  })
})

describe('wrapArray', () => {
  const array = [1, 2, 3, 4, 5]

  it('should wrap the array from the specified start index', () => {
    const startIndex = 2
    const result = wrapArray(array, startIndex)
    expect(result).toEqual([3, 4, 5, 1, 2])
  })

  it('should handle wrapping when the startIndex is greater than array length', () => {
    const startIndex = 7
    const result = wrapArray(array, startIndex)
    expect(result).toEqual([3, 4, 5, 1, 2])
  })

  it('should handle wrapping when the startIndex is negative', () => {
    const startIndex = -2
    const result = wrapArray(array, startIndex)
    expect(result).toEqual([undefined, undefined, 1, 2, 3])
  })

  it('should return an empty array if the input array is empty', () => {
    const emptyArray: number[] = []
    const startIndex = 2
    const result = wrapArray(emptyArray, startIndex)
    expect(result).toEqual([])
  })

  it('should return the same array if the startIndex is 0', () => {
    const startIndex = 0
    const result = wrapArray(array, startIndex)
    expect(result).toEqual(array)
  })
})
