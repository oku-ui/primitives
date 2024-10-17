import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { useToastInteractiveInject } from './share'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { scopedToastProps } from './types'

const CLOSE_NAME = 'OkuToastClose'

export type ToastCloseNaviteElement = OkuElement<'button'>
export type ToastCloseElement = HTMLButtonElement

export interface ToastCloseProps extends PrimitiveProps {}

export type ToastCloseEmits = {
  click: [event: MouseEvent]
}

export const toastCloseProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
}

const toastClose = defineComponent({
  name: CLOSE_NAME,
  components: {
    OkuToastAnnounceExclude,
  },
  inheritAttrs: false,
  props: {
    ...scopedToastProps,
    ...toastCloseProps.props,
  },
  emits: toastCloseProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { scopeOkuToast, ...closeProps } = toRefs(props)

    const _reactive = reactive(closeProps)
    const reactiveCloseProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const interactiveContext = useToastInteractiveInject(CLOSE_NAME, scopeOkuToast.value)

    return () => h(OkuToastAnnounceExclude, { asChild: true }, {
      default: () => h(Primitive.button, {
        type: 'button',
        ...mergeProps(attrs, reactiveCloseProps),
        ref: forwardedRef,
        onClick: composeEventHandlers<MouseEvent>((event) => {
          emit('click', event)
        }, () => {
          interactiveContext.onClose()
        }),
      }, {
        default: () => slots.default?.(),
      }),
    })
  },
})

export const OkuToastClose = toastClose as typeof toastClose &
  (new () => { $props: ToastCloseNaviteElement })
