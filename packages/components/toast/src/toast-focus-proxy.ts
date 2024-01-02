import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { TOAST_FOCUS_PROXY_NAME, focusProxyProps, scopeToastProps, useToastProviderInject } from './props'
import type { FocusProxyNativeElement } from './props'

const toastFocusProxy = defineComponent({
  name: TOAST_FOCUS_PROXY_NAME,
  components: {
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...focusProxyProps.props,
    ...scopeToastProps,
  },
  emits: focusProxyProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { scopeOkuToast, ...proxyProps } = toRefs(props)

    const _reactive = reactive(proxyProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const inject = useToastProviderInject(TOAST_FOCUS_PROXY_NAME, scopeOkuToast.value)

    return () => h(OkuVisuallyHidden, {
      'aria-hidden': true,
      'tabIndex': 0,
      ...mergeProps(attrs, otherProps, emits),
      'ref': forwardedRef,
      // Avoid page scrolling when focus is on the focus proxy
      'style': { position: 'fixed' },
      'onFocus': (event) => {
        const prevFocusedElement = event.relatedTarget as HTMLElement | null
        const isFocusFromOutsideViewport = !inject.viewport.value?.contains(prevFocusedElement)
        if (isFocusFromOutsideViewport)
          emit('focusFromOutsideViewport')
      },
    }, () => slots.default?.())
  },
})

export const OkuToastFocusProxy = toastFocusProxy as typeof toastFocusProxy & (new () => { $props: FocusProxyNativeElement })
