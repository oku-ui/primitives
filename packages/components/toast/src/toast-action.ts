import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuToastClose } from './toast-close'
import type { ToastCloseIntrinsicElement, ToastCloseProps } from './toast-close'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { scopedProps } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastAction
 * ----------------------------------------------------------------------------------------------- */

const ACTION_NAME = 'OkuToastAction'

type ToastActionElement = ToastCloseIntrinsicElement

interface ToastActionProps extends ToastCloseProps {
  /**
   * A short description for an alternate way to carry out the action. For screen reader users
   * who will not be able to navigate to the button easily/quickly.
   * @example <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction>
   * @example <ToastAction altText="Undo (Alt+U)">Undo</ToastAction>
   */
  altText: string
}

const toastActionProps = {
  altText: {
    type: String,
    required: true,
  },
  asChild: {
    type: Boolean,
    default: false,
  },
}

const toastAction = defineComponent({
  name: ACTION_NAME,
  components: {
    OkuToastAnnounceExclude,
    OkuToastClose,
  },
  inheritAttrs: false,
  props: {
    ...toastActionProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    // const { ...toastActionAttrs } = attrs as ToastActionElement

    const forwardedRef = useForwardRef()

    const { altText } = toRefs(props)

    if (!altText.value)
      return null

    const originalReturn = () =>
      h(
        OkuToastAnnounceExclude,
        {
          altText: altText.value,
          asChild: true,
        },
        [
          h(
            OkuToastClose,
            {
              ...attrs,
              ref: forwardedRef,
            },
          ),
        ],
      )

    if (!altText.value)
      throw new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``)

    return originalReturn
  },
})

export const OkuToastAction = toastAction as typeof toastAction &
(new () => { $props: Partial<ToastActionElement> })

export type { ToastActionElement, ToastActionProps }
