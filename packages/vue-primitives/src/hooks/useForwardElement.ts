import type { MutableRefObject } from './useRef.ts'
import { type ComponentPublicInstance, isRef, type Ref } from 'vue'

export function useForwardElement<T extends HTMLElement = HTMLElement>(elRef: Ref<T | undefined> | MutableRefObject<T | undefined>) {
  function setRef(nodeRef: Element | ComponentPublicInstance | null | undefined) {
    let node: T | undefined = (nodeRef as ComponentPublicInstance)?.$el ?? nodeRef

    if (node && node.nodeType !== 1)
      node = undefined

    if (isRef(elRef))
      elRef.value = node
    else
      elRef.current = node
  }

  return setRef
}
