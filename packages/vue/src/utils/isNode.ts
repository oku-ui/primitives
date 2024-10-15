/* eslint-disable ts/prefer-literal-enum-member */

import type { RendererNode, VNode } from 'vue'

export enum ShapeFlags {
  ELEMENT = 1,
  FUNCTIONAL_COMPONENT = 1 << 1,
  STATEFUL_COMPONENT = 1 << 2,
  TEXT_CHILDREN = 1 << 3,
  ARRAY_CHILDREN = 1 << 4,
  SLOTS_CHILDREN = 1 << 5,
  TELEPORT = 1 << 6,
  SUSPENSE = 1 << 7,
  COMPONENT_SHOULD_KEEP_ALIVE = 1 << 8,
  COMPONENT_KEPT_ALIVE = 1 << 9,
  COMPONENT = ShapeFlags.STATEFUL_COMPONENT | ShapeFlags.FUNCTIONAL_COMPONENT,
}

export function isElementRoot(vnode: VNode) {
  if (!vnode)
    return
  return (
    vnode.shapeFlag & (ShapeFlags.COMPONENT | ShapeFlags.ELEMENT)
    || vnode.type === Comment // potential v-if branch switch
  )
}

export function isElement(node: RendererNode | null) {
  return node && node.nodeType === ShapeFlags.ELEMENT
}
export function isComment(node: RendererNode | null) {
  return node && node.nodeType === ShapeFlags.TEXT_CHILDREN
}
export function isFragmentStart(node: RendererNode | null) {
  return isComment(node) && node?.data === '['
}
export function isFragmentEnd(node: RendererNode | null) {
  return isComment(node) && node?.data === ']'
}
