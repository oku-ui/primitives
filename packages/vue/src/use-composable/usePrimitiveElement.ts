import { shallowRef } from 'vue'
import type { MaybeElement, MaybeElementRef } from './unrefElement'

export function usePrimitiveElement<T extends MaybeElement = MaybeElement>() {
  const currentElement = shallowRef<T>()

  function setCurrentElement(el: MaybeElementRef<any>) {
    if (!el || !el.$el)
      return

    if (el.$el === currentElement.value)
      return

    currentElement.value = el.$el
  }

  return [currentElement, setCurrentElement] as const
}
