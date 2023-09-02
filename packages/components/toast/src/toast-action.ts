import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import { OkuToastClose, toastCloseProps } from './toast-close'
import type { ToastCloseIntrinsicElement, ToastCloseProps } from './toast-close'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { scopedToastProps } from './types'

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
  props: {
    altText: {
      type: String,
      required: true,
    },
    ...toastCloseProps.props,
  },
  emits: {
    ...toastCloseProps.emits,
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
    ...toastActionProps.props,
    ...scopedToastProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const { altText } = toRefs(props)

    if (!altText.value)
      return null

    return () => {
      if (!altText.value)
        throw new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``)

      return h(
        OkuToastAnnounceExclude,
        {
          altText: altText.value,
          asChild: true,
        },
        {
          default: () => h(
            OkuToastClose,
            {
              ...attrs,
              ref: forwardedRef,
            },
            {
              default: () => slots.default?.(),
            },
          ),
        },
      )
    }
  },
})

export const OkuToastAction = toastAction as typeof toastAction &
(new () => { $props: Partial<ToastActionElement> })

export type { ToastActionElement, ToastActionProps }
