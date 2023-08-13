/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * ToastAction
 * ----------------------------------------------------------------------------------------------- */

import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, toRefs } from 'vue'
import type { InstanceToastCloseElementType, ToastCloseProps } from './toast-close'

const ACTION_NAME = 'ToastAction'

type ToastActionElement = InstanceToastCloseElementType
interface ToastActionProps extends ToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users
   * who will not be able to navigate to the button easily/quickly.
   * @example <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction>
   * @example <ToastAction altText="Undo (Alt+U)">Undo</ToastAction>
   */
  altText: string
}

const ToastAction = defineComponent({
  name: ACTION_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    altText: {
      type: String,
      required: true,
    },
    asChild: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { attrs, emit, slots }) {
    // const { ...actionProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const { altText, ...actionProps } = toRefs(props)

    // const originalReturn = () =>

    if (!altText)
      return null
    // return (
    //   <ToastAnnounceExclude altText={altText} asChild>
    //     <ToastClose {...actionProps} ref={forwardedRef} />
    //   </ToastAnnounceExclude>
    // );

    // ToastAction.propTypes = {
    //   altText(props) {
    //     if (!props.altText)
    //       return new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``)

    //     return null
    //   },
    // }

    // return originalReturn
  },
})

// type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
// type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

// const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

// export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

// export type { ToastProviderProps, InstanceToastProviderType }
