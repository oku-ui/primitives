import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { scopedProps } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastDescription
 * ----------------------------------------------------------------------------------------------- */

const DESCRIPTION_NAME = 'ToastDescription'

export type ToastDescriptionIntrinsicElement = ElementType<'div'>
type ToastDescriptionElement = HTMLDivElement

interface ToastDescriptionProps extends PrimitiveProps {}

const toastDescription = defineComponent({
  name: DESCRIPTION_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...scopedProps,
    ...primitiveProps,
  },
  setup(_props, { attrs, slots }) {
    const { ...toastDescriptionAttrs } = attrs as ToastDescriptionIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ref: forwardedRef,
          ...toastDescriptionAttrs,
        },
        {
          default: () => slots.default?.(),
        },
      )

    return originalReturn
  },
})

export const OkuToastDescription = toastDescription as typeof toastDescription &
(new () => { $props: Partial<ToastDescriptionElement> })

export type { ToastDescriptionElement, ToastDescriptionProps }
