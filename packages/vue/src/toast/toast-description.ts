import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
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
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeOkuToast, ...descriptionProps } = toRefs(props)

    const _reactive = reactive(descriptionProps)
    const reactiveDescriptionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)
    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, {
      ...mergeProps(attrs, reactiveDescriptionProps),
      ref: forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

export const OkuToastDescription = toastDescription as typeof toastDescription &
  (new () => { $props: ToastDescriptionNaviteElement })
