import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import type { VisuallyHiddenElement, VisuallyHiddenNaviteElement } from '@oku-ui/visually-hidden'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuVisuallyHidden, visuallyHiddenProps } from '@oku-ui/visually-hidden'
import { useToastProviderInject } from './share'
import { scopedToastProps } from './types'

const FOCUS_PROXY_NAME = 'OkuToastFocusProxy'

export type FocusProxyNativeElement = VisuallyHiddenNaviteElement
export type FocusProxyElement = VisuallyHiddenElement
export type VisuallyHiddenProps = VisuallyHiddenNaviteElement

export interface FocusProxyProps extends VisuallyHiddenProps {
}

export interface FocusProxyPropsEmits {
  focusFromOutsideViewport: []
}

const focusProxyProps = {
  props: {
    ...visuallyHiddenProps.props,
  },
  emits: {
    focusFromOutsideViewport: () => true,
    ...visuallyHiddenProps.emits,
  },
}

const toastFocusProxy = defineComponent({
  name: FOCUS_PROXY_NAME,
  components: {
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...focusProxyProps.props,
    ...scopedToastProps,
  },
  emits: focusProxyProps.emits,
  setup(props, { attrs, emit, slots }) {
    const { scopeOkuToast, ...proxyProps } = toRefs(props)
    const _reactive = reactive(proxyProps)
    const reactiveProxyProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useToastProviderInject(FOCUS_PROXY_NAME, scopeOkuToast.value)

    return () => h(OkuVisuallyHidden, {
      'aria-hidden': true,
      'tabIndex': 0,
      ...mergeProps(attrs, reactiveProxyProps),
      'ref': forwardedRef,
      // Avoid page scrolling when focus is on the focus proxy
      'style': { position: 'fixed' },
      'onFocus': (event: FocusEvent) => {
        const prevFocusedElement = event.relatedTarget as HTMLElement | null
        const isFocusFromOutsideViewport = !inject.viewport.value?.contains(prevFocusedElement)
        if (isFocusFromOutsideViewport)
          emit('focusFromOutsideViewport')
      },
    }, slots)
  },
})

export const OkuToastFocusProxy = toastFocusProxy as typeof toastFocusProxy &
(new () => { $props: FocusProxyNativeElement })
