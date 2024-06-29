export const isDef = <T = any>(val?: T): val is T => typeof val !== 'undefined'
export const isPropFalsy = <T = any>(val?: T): val is T => val == null || val === false
