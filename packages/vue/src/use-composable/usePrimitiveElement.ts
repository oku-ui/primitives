import { isFunction } from '@vue/shared'
import type { Ref } from 'vue'
import { shallowRef } from 'vue'
import type { MaybeElement, MaybeElementRef } from './unrefElement'

export function usePrimitiveElement<T extends MaybeElement = MaybeElement>(...refs: Array<Ref<T> | ((ref: T) => void)>) {
  const currentElement = shallowRef<T>()

  function setCurrentElement(el: MaybeElementRef<any>) {
    if (!el || !el.$el)
      return

    if (el.$el === currentElement.value)
      return

    currentElement.value = el.$el

    for (const ref of refs) {
      if (isFunction(ref))
        ref(el.$el as any)
      else
        ref.value = el.$el
    }
  }

  return [currentElement, setCurrentElement] as const
}
