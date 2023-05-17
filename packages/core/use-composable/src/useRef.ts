import type { ComponentPublicInstance, Ref } from 'vue'
import { onBeforeUpdate, ref, watch } from 'vue'

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
  const innerRef = ref<T | null>(null)
  // const nodeRef = ref<ComponentPublicInstance>()

  onBeforeUpdate(() => {
    // clear refs before DOM updates
    refEl.value = null
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
