// @Credit https://github.com/nuxt/nuxt/blob/main/packages/nuxt/src/app/components/route-provider.ts#L39

import type { ComponentPublicInstance } from 'vue'
import { computed, ref } from 'vue'
import { unwrapEl } from './unwrapEl'
import { useForwardRef } from '.'

export function useComponentRef<T = HTMLElement>(forwordEl = false) {
  const componentRef = ref<ComponentPublicInstance>()

  const forword = useForwardRef()
  const currentElement = computed<T>(() => {
    const el = ['#comment', '#text'].includes(componentRef.value?.$el?.nodeName)
      ? unwrapEl(componentRef.value)
      : unwrapEl(componentRef)

    if (el && forwordEl && el instanceof HTMLElement) {
      forword(el)
      return el as T
    }

    // console.log('componentRef.value?.$el.nodeName', test)
    // console.log(componentRef.value?.$el?.nodeName)

    return el as T
  })

  return {
    componentRef,
    currentElement,
  }
}
