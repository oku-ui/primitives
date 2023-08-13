/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * ToastClose
 * ----------------------------------------------------------------------------------------------- */

import type { ComponentPropsWithoutRef, ElementType, IPrimitiveProps, InstanceTypeRef, MergeProps, Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

const CLOSE_NAME = 'ToastClose'

type ToastCloseElement = ElementType<'button'>
type PrimitiveButtonProps = ComponentPropsWithoutRef<typeof Primitive.button>
interface ToastCloseProps extends IPrimitiveProps {}

const ToastClose = defineComponent({
  name: CLOSE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, emit, slots }) {
    // const { ...closeProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const {
      scopeToast,
      ...closeProps
    } = toRefs(props)

    const interactiveContext = useToastInteractiveContext(CLOSE_NAME, scopeToast.value)

    // return (
    //   <ToastAnnounceExclude asChild>
    //     <Primitive.button
    //       type="button"
    //       {...closeProps}
    //       ref={forwardedRef}
    //       onClick={composeEventHandlers(props.onClick, interactiveContext.onClose)}
    //     />
    //   </ToastAnnounceExclude>
    // );

    // const originalReturn = () =>

    // return originalReturn
  },
})

type _ToastClose = MergeProps<ToastCloseProps, ToastCloseElement>
type InstanceToastCloseElementType = InstanceTypeRef<typeof ToastClose, _ToastCloseEl>

const OkuToastClose = ToastClose as typeof ToastClose & (new () => { $props: _ToastClose })

export { OkuToastClose }

export type { ToastCloseProps, InstanceToastCloseElementType }
