import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { useToastInteractiveContext } from './toast-impl'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { scopedProps } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastClose
 * ----------------------------------------------------------------------------------------------- */

const CLOSE_NAME = 'OkuToastClose'

export type ToastCloseIntrinsicElement = ElementType<'button'>
type ToastCloseElement = HTMLButtonElement

interface ToastCloseProps extends PrimitiveProps {}

const toastClose = defineComponent({
  name: CLOSE_NAME,
  components: {
    OkuToastAnnounceExclude,
  },
  inheritAttrs: false,
  props: {
    ...scopedProps,
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
  },
  setup(props, { attrs, emit }) {
    const { ...toastCloseAttrs } = attrs as ToastCloseIntrinsicElement

    const forwardedRef = useForwardRef()

    const interactiveContext = useToastInteractiveContext(CLOSE_NAME, props.scopeOkuToast)

    const originalReturn = () =>
      h(
        OkuToastAnnounceExclude,
        { asChild: true },
        [
          h(
            Primitive.button,
            {
              type: 'button',
              ...toastCloseAttrs,
              ref: forwardedRef,
              // onClick: (event) => {
              //   composeEventHandlers(props.onClick, interactiveContext.onClose)(event)
              // },
              onClick: composeEventHandlers<MouseEvent>((event) => {
                emit('click', event)
              }, () => {
                interactiveContext.onClose()
              }),
            },
          ),
        ],
      )

    return originalReturn
  },
})

export const OkuToastClose = toastClose as typeof toastClose &
(new () => { $props: Partial<ToastCloseElement> })

export type { ToastCloseElement, ToastCloseProps }
