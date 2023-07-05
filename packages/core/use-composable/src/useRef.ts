import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import { computed, onBeforeMount, ref } from 'vue'

// Source: https://github.com/chakra-ui/chakra-ui-vue-next/blob/develop/packages/utils/src/dom.ts

/**
 * Interface for node provided by template ref
 */

interface RefType<T> extends ComponentPublicInstance {
  $el: T
}

function useRef<T>(): {
  newRef: Ref<RefType<T>>
  $el: ComputedRef<T>
} {
  const refValue = ref()

  onBeforeMount(() => {
    // clear refs before DOM updates
    refValue.value = null
  })

  // ComponentPublicInstance?.$el ?? el
  const returnNewref = computed(() => {
    return (refValue.value)?.$el
  })

  return {
    newRef: refValue as Ref<RefType<T>>,
    $el: returnNewref as ComputedRef<T>,
  }
}

export { useRef }
