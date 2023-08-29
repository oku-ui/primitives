import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { scopedToastProps } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastTitle
 * ----------------------------------------------------------------------------------------------- */

const TITLE_NAME = 'OkuToastTitle'

export type ToastTitleIntrinsicElement = ElementType<'div'>
type ToastTitleElement = HTMLDivElement

interface ToastTitleProps extends PrimitiveProps { }

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
    const { ...toastTitleAttrs } = attrs as ToastTitleIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ref: forwardedRef,
          ...toastTitleAttrs,
        },
        {
          default: () => slots.default?.(),
        },
      )
    return originalReturn
  },
})

export const OkuToastTitle = toastTitle as typeof toastTitle &
(new () => { $props: Partial<ToastTitleElement> })

export type { ToastTitleElement, ToastTitleProps }
