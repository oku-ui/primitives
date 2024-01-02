import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuToastAnnounceExclude } from './toast-announce-exclude'
import { TOAST_CLOSE_NAME, scopeToastProps, toastCloseProps, useToastInteractiveInject } from './props'
import type { ToastCloseEmits, ToastCloseNativeElement } from './props'

const toastClose = defineComponent({
  name: TOAST_CLOSE_NAME,
  components: {
    OkuToastAnnounceExclude,
  },
  inheritAttrs: false,
  props: {
    ...toastCloseProps.props,
    ...scopeToastProps,
  },
  emits: toastCloseProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { scopeOkuToast, ...closeProps } = toRefs(props)

    const _reactive = reactive(closeProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const interactiveInject = useToastInteractiveInject(TOAST_CLOSE_NAME, scopeOkuToast.value)

    return () => h(OkuToastAnnounceExclude, {
      asChild: true,
    }, () => h(Primitive.button, {
      type: 'button',
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      onClick: composeEventHandlers<ToastCloseEmits['click'][0]>((event) => {
        emit('click', event)
      }, () => interactiveInject.onClose()),
    }, () => slots.default?.()))
  },
})

export const OkuToastClose = toastClose as typeof toastClose & (new () => { $props: ToastCloseNativeElement })
