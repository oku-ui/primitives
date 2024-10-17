import type { ToastCloseElement, ToastCloseNaviteElement, ToastCloseProps } from './toast-close'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { OkuToastClose, toastCloseProps } from './toast-close'
import { scopedToastProps } from './types'

const ACTION_NAME = 'OkuToastAction'

export type ToastActionNaviteElement = ToastCloseNaviteElement
export type ToastActionElement = ToastCloseElement

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
    const { altText, ...actionProps } = toRefs(props)

    const _reactive = reactive(actionProps)
    const reactiveActionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => {
      if (!altText.value)
        throw new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``)

      if (!altText.value)
        return null

      return h(OkuToastAnnounceExclude, {
        altText: altText.value,
        asChild: true,
      }, {
        default: () => h(OkuToastClose, {
          ...mergeProps(attrs, reactiveActionProps),
          ref: forwardedRef,
        }, {
          default: () => slots.default?.(),
        }),
      })
    }
  },
})

export const OkuToastAction = toastAction as typeof toastAction &
  (new () => { $props: ToastActionNaviteElement })

export type { ToastActionProps }
