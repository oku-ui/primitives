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
