import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
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
    const { ...toastCloseAttrs } = attrs as ToastCloseNaviteElement

    const forwardedRef = useForwardRef()

    const interactiveContext = useToastInteractiveInject(CLOSE_NAME, props.scopeOkuToast)

    return () => h(OkuToastAnnounceExclude,
      { asChild: true },
      {
        default: () => h(Primitive.button,
          {
            type: 'button',
            ...toastCloseAttrs,
            ref: forwardedRef,
            onClick: composeEventHandlers<MouseEvent>((event) => {
              emit('click', event)
            }, () => {
              interactiveContext.onClose()
            }),
          },
          {
            default: () => slots.default?.(),
          },
        ),
      },
    )
  },
})

export const OkuToastClose = toastClose as typeof toastClose &
(new () => { $props: ToastCloseNaviteElement })
