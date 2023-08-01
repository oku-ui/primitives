import { type VNode } from 'vue'
import { OkuSlottable } from './slot'

type AnyProps = Record<string, any>

export function isValidVNodeElement(input: any): boolean {
  return (
    input
    && (typeof input.type === 'string'
      || typeof input.type === 'object'
      || typeof input.type === 'function')
  )
}

export function isSlottable(child: VNode): child is VNode {
  return (
    isValidVNodeElement(child)
    && (child.type === OkuSlottable)
  )
}
