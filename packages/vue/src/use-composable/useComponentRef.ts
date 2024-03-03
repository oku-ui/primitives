// @Credit https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/route-provider.ts#L39

import type { ComponentPublicInstance } from 'vue'
import { computed, ref } from 'vue'
import { unrefElement, useForwardRef } from '.'

export function useComponentRef<T = HTMLElement>(forwardEl = false) {
  const componentRef = ref<ComponentPublicInstance>()

  const forward = useForwardRef()

  const currentElement = computed<T>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    const el = ['#text', '#comment'].includes(componentRef.value?.$el.nodeName) ? componentRef.value?.$el.nextElementSibling : unrefElement(componentRef)

    if (el && forwardEl && el instanceof HTMLElement) {
      forward(el)
      return el as T
    }

    return el as T
  })

  return {
    componentRef,
    currentElement,
  }
}
