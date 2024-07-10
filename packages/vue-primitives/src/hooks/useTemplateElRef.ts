import type { Ref } from 'vue'

export function useTemplateElRef<T = HTMLElement>(elRef: Ref<T>) {
  function setRef(nodeRef: any) {
    const node = nodeRef?.$el

    if (elRef.value === node)
      return

    elRef.value = node
  }

  return setRef
}
