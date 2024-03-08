// @Credit https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/route-provider.ts#L39

import type { ComponentPublicInstance } from 'vue'
import { computed, ref } from 'vue'
import { unwrapEl } from './unwrapEl'

export function useComponentRef<T = HTMLElement>() {
  const componentRef = ref<ComponentPublicInstance>()

  const currentElement = computed<T>(() => {
    // $el could be text/comment for non-single root normal or text root, thus we retrieve the nextElementSibling
    const el = ['#text', '#comment'].includes(componentRef.value?.$el?.nodeName)
      ? unwrapEl(componentRef.value)
      : unwrapEl(componentRef)

    return el as T
  })

  return {
    componentRef,
    currentElement,
  }
}
