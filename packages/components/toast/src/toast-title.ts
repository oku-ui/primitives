import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
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
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeOkuToast, ...titleProps } = toRefs(props)

    const _reactive = reactive(titleProps)
    const reactiveTitleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)
    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, {
      ...mergeProps(attrs, reactiveTitleProps),
      ref: forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

export const OkuToastTitle = toastTitle as typeof toastTitle &
  (new () => { $props: ToastTitleNaviteElement })
