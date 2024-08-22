export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const isPropFalsy = <T = any>(val?: T): val is T => val == null || val === false

export function isNumber(value: unknown): value is number {
  return typeof value === 'number'
}

export function isFunction(value: unknown): value is Function {
  return typeof value === 'function'
}
