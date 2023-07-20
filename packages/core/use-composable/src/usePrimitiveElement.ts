import { computed, ref } from 'vue'
import { unrefElement } from './unrefElement'

export function usePrimitiveElement() {
  const primitiveElement = ref<HTMLElement>()
  const currentElement = computed(() => unrefElement(primitiveElement))

  return {
    primitiveElement,
    currentElement,
  }
}
