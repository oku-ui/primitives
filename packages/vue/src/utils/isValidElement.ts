import type { VNode } from 'vue'

// @credit: headlessui
export function isValidElement(input: VNode): boolean {
  if (input == null)
    return false // No children
  if (typeof input.type === 'string')
    return true // 'div', 'span', ...
  if (typeof input.type === 'object')
    return true // Other components
  if (typeof input.type === 'function')
    return true // Built-ins like Transition

  return false // Comments, strings, ...
}
