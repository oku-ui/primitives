import type { ComponentPublicInstance } from 'vue'
import type { VNodeRef } from './typeUtils'

export function getElFromTemplateRef<T extends HTMLElement>(nodeRef: VNodeRef) {
  let node: T | undefined = (nodeRef as ComponentPublicInstance)?.$el ?? nodeRef

  if (node && node.nodeType !== 1)
    node = undefined

  return node
}
