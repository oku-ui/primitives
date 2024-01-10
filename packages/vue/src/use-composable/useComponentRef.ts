// @Credit https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/route-provider.ts#L39

import type { ComponentPublicInstance } from 'vue'
import { computed, ref } from 'vue'
import { unrefElement, useForwardRef } from '.'

export function useComponentRef<T = HTMLElement>() {
  const componentRef = ref<ComponentPublicInstance>()
  const forword = useForwardRef()
  const currentElement = computed<T>(() => {
    const el = ['#comment', '#text'].includes(componentRef.value?.$el?.nodeName)
      ? componentRef.value?.$el
      : unrefElement(componentRef)
    if (el)
      forword(el)
    // console.log('componentRef.value?.$el.nodeName', test)
    // console.log(componentRef.value?.$el?.nodeName)

    return el
  })

  return {
    componentRef,
    currentElement,
  }
}
