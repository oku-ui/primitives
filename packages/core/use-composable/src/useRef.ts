import type { ComponentPublicInstance, Ref } from 'vue'
import { onBeforeMount, onMounted, ref, watch } from 'vue'

// Source: https://github.com/chakra-ui/chakra-ui-vue-next/blob/develop/packages/utils/src/dom.ts

/**
 * Interface for node provided by template ref
 */
export type TemplateRef = Element | ComponentPublicInstance | undefined | null

function useRef<T>(): {
  _ref: (el: TemplateRef | null) => void
  refEl: Ref<T | null>
  innerRef: Ref<T | null>
} {
  const refEl = ref<T | null>(null)

  // Inner ref is used to pass the ref to the component
  const innerRef = ref<T | null>(null)

  onBeforeMount(() => {
    // clear refs before DOM updates
    refEl.value = null
    innerRef.value = null
  })

  onMounted(() => {
    innerRef.value = refEl.value
  })

  watch(
    innerRef,
    (el) => {
      if (refEl.value) {
        refEl.value = {
          ...(refEl.value || {}),
          ...el as any,
        }
      }
      else {
        refEl.value = el
      }
    },
    { immediate: true },
  )
  /**
   * Getter function to bind ref to value
   * @param el Template ref value provided by Vue
   */
  const _ref = (el: TemplateRef | null) => {
    refEl.value = (el as ComponentPublicInstance)?.$el ?? el
  }

  return {
    _ref,
    refEl: refEl as any as Ref<T | null>,
    innerRef: innerRef as any as Ref<T | null>,
  }
}

export { useRef }
