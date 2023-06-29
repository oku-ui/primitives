import type { ComponentPublicInstance, ComputedRef, Ref } from 'vue'
import { computed, onBeforeMount, ref } from 'vue'

// Source: https://github.com/chakra-ui/chakra-ui-vue-next/blob/develop/packages/utils/src/dom.ts

/**
 * Interface for node provided by template ref
 */
export type TemplateRef = Element | ComponentPublicInstance | undefined | null

function useRef<T>(): {
  newRef: Ref<T | null>
  $el: ComputedRef<TemplateRef>
} {
  const refValue = ref<T | null>(null)

  onBeforeMount(() => {
    // clear refs before DOM updates
    refValue.value = null
  })

  // ComponentPublicInstance?.$el ?? el
  const returnNewref = computed(() => {
    return (refValue.value as ComponentPublicInstance)?.$el ?? refValue.value
  })

  return {
    newRef: refValue as any as Ref<T | null>,
    $el: returnNewref,
  }
}

export { useRef }
