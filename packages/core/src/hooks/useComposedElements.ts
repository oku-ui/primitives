import type { ComponentPublicInstance } from 'vue'

export function useComposedElements<T extends HTMLElement = HTMLElement>(cb: (el: T | undefined) => void) {
  function setRef(nodeRef: any) {
    let node: T | undefined = (nodeRef as ComponentPublicInstance)?.$el ?? nodeRef

    if (node && node.nodeType !== 1)
      node = undefined

    cb(node)
  }

  return setRef
}
