import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { scopedToastProps } from './types'

const DESCRIPTION_NAME = 'OkuToastDescription'

export type ToastDescriptionNaviteElement = OkuElement<'div'>
export type ToastDescriptionElement = HTMLDivElement

export interface ToastDescriptionProps extends PrimitiveProps {}

const toastDescription = defineComponent({
  name: DESCRIPTION_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...scopedToastProps,
    ...primitiveProps,
  },
  setup(_props, { attrs, slots }) {
    const { ...toastDescriptionAttrs } = attrs as ToastDescriptionNaviteElement

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div,
      {
        ref: forwardedRef,
        ...toastDescriptionAttrs,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

export const OkuToastDescription = toastDescription as typeof toastDescription &
(new () => { $props: ToastDescriptionNaviteElement })
