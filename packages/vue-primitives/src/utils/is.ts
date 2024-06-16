export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const isNullishOrFalse = <T = any>(val?: T): val is T => val == null || val === false
