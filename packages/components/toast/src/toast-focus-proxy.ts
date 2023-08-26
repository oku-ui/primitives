import type { PropType } from 'vue'
import { defineComponent, h, toRefs } from 'vue'
import type { VisuallyHiddenElement, VisuallyHiddenIntrinsicElement } from '@oku-ui/visually-hidden'
import { useForwardRef } from '@oku-ui/use-composable'
import OkuVisuallyHidden from '@oku-ui/visually-hidden'
import { primitiveProps } from '@oku-ui/primitive'
import { useToastProviderContext } from './toast-provider'
import { scopedProps } from './types'

const FOCUS_PROXY_NAME = 'ToastFocusProxy'

type FocusProxyElement = VisuallyHiddenElement
type VisuallyHiddenProps = VisuallyHiddenIntrinsicElement
interface FocusProxyProps extends VisuallyHiddenProps {
  onFocusFromOutsideViewport(): void
}

const focusProxyProps = {
  onFocusFromOutsideViewport: {
    type: Function as PropType<() => void>,
    required: true,
  },
}

const toastFocusProxy = defineComponent({
  name: FOCUS_PROXY_NAME,
  components: {
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...focusProxyProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...toastFocusProxyAttrs } = attrs as VisuallyHiddenProps

    const forwardedRef = useForwardRef()

    const { onFocusFromOutsideViewport } = toRefs(props)

    const context = useToastProviderContext(FOCUS_PROXY_NAME, props.scopeOkuToast)

    const originalReturn = () =>
      h(
        OkuVisuallyHidden,
        {
          ...toastFocusProxyAttrs,
          'aria-hidden': true,
          'tabIndex': 0,
          'ref': forwardedRef,
          // Avoid page scrolling when focus is on the focus proxy
          'style': { position: 'fixed' },
          'onFocus': (event: FocusEvent) => {
            const prevFocusedElement = event.relatedTarget as HTMLElement | null
            const isFocusFromOutsideViewport = !context.viewport.value?.contains(prevFocusedElement)
            if (isFocusFromOutsideViewport)
              // eslint-disable-next-line no-unused-expressions
              onFocusFromOutsideViewport.value
          },
        },
      )

    return originalReturn
  },
})

export const OkuToastFocusProxy = toastFocusProxy as typeof toastFocusProxy &
(new () => { $props: Partial<FocusProxyElement> })

export type { FocusProxyElement, FocusProxyProps }
