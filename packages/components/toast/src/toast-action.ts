import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { OkuToastClose } from './toast-close'
import { TOAST_ACTION_NAME, toastActionProps } from './props'
import type { ToastActionNativeElement } from './props'

const toastAction = defineComponent({
  name: TOAST_ACTION_NAME,
  components: {
    OkuToastAnnounceExclude,
    OkuToastClose,
  },
  inheritAttrs: false,
  props: toastActionProps.props,
  emits: toastActionProps.emits,
  setup(props, { attrs, slots }) {
    const { altText, ...actionProps } = toRefs(props)

    const _reactive = reactive(actionProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    // if (!altText.value)
    //   throw new Error(`Missing prop \`altText\` expected on \`${ACTION_NAME}\``)

    return () => {
      if (!altText.value)
        return null

      return h(OkuToastAnnounceExclude, {
        altText: altText.value,
        asChild: true,
      }, () => h(OkuToastClose, {
        ...mergeProps(attrs, otherProps, emits),
        ref: forwardedRef,
      }, () => slots.default?.()))
    }
  },
})

export const OkuToastAction = toastAction as typeof toastAction & (new () => { $props: ToastActionNativeElement })
