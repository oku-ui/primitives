import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { scopedToastProps } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastTitle
 * ----------------------------------------------------------------------------------------------- */

const TITLE_NAME = 'OkuToastTitle'

export type ToastTitleNaviteElement = OkuElement<'div'>
export type ToastTitleElement = HTMLDivElement

export interface ToastTitleProps extends PrimitiveProps { }

const toastTitle = defineComponent({
  name: TITLE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...scopedToastProps,
    ...primitiveProps,
  },
  setup(_props, { attrs, slots }) {
    const { ...toastTitleAttrs } = attrs as ToastTitleNaviteElement

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ref: forwardedRef,
        ...toastTitleAttrs,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

export const OkuToastTitle = toastTitle as typeof toastTitle &
(new () => { $props: ToastTitleNaviteElement })
