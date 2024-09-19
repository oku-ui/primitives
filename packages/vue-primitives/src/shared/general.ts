// Is

export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const isPropFalsy = <T = any>(val?: T): val is T => val == null || val === false

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

// eslint-disable-next-line ts/no-unsafe-function-type
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}

// Array

export function arrayify<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value]
}

/**
 * Wraps an array around itself at a given start index
 * Example: `wrapArray(['a', 'b', 'c', 'd'], 2) === ['c', 'd', 'a', 'b']`
 */
export function wrapArray<T>(array: T[], startIndex: number) {
  const ret: T[] = []

  for (let i = 0; i < array.length; i++) {
    ret.push(array[(startIndex + i) % array.length]!)
  }

  return ret
}

// Number

export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value))
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount
  return Math.round(value * rounder) / rounder
}

export function getDecimalCount(value: number) {
  return (String(value).split('.')[1] || '').length
}
