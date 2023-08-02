// Source: https://github.com/element-plus/element-plus/blob/dev/packages/utils/vue/refs.ts

import type { ComponentPublicInstance, Ref } from 'vue'

import {
  isFunction,
} from '@vue/shared'

export type RefSetter = (
  el: Element | ComponentPublicInstance | undefined
) => void

export function useComposedRefs(...refs: (Ref<HTMLElement | undefined | null | ComponentPublicInstance> | RefSetter)[]) {
  return (el: Element | ComponentPublicInstance | null) => {
    refs.forEach((ref) => {
      if (isFunction(ref))
        ref(el as Element | ComponentPublicInstance)
      else
        ref.value = el as HTMLElement | undefined
    })
  }
}
