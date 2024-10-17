// Source: https://github.com/element-plus/element-plus/blob/dev/packages/utils/vue/refs.ts

import type { ComponentPublicInstance, Ref } from 'vue'

import { isValidElement } from '@oku-ui/utils'
import {
  isFunction,
} from '@vue/shared'

type TemplateRef = Element | ComponentPublicInstance | null | undefined

export type RefSetter = (ref: TemplateRef) => void

export function useComposedRefs(...refs: Array<Ref<TemplateRef> | RefSetter>) {
  return (el: Element | ComponentPublicInstance | null | undefined) => {
    if (!el)
      return

    if (isValidElement(el as any)) {
      if ((el as unknown as ComponentPublicInstance)?.$el)
        return
    }

    for (const ref of refs) {
      if (isFunction(ref))
        ref(el as any)
      else
        ref.value = el
    }
  }
}
