import { shallowRef } from 'vue'
import type { MaybeElement, MaybeElementRef } from './unrefElement'
import { unrefElement } from './unrefElement'

export function useCurrentElement<T extends MaybeElement = MaybeElement>() {
  const currentElement = shallowRef<T>()

  function setCurrentElement(el: MaybeElementRef<any>) {
    currentElement.value = unrefElement(el) as T
  }

  return [currentElement, setCurrentElement] as const
}
