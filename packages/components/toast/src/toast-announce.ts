import { Fragment, defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { OkuPortal } from '@oku-ui/portal'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { TOAST_NAME, useToastProviderInject } from './share'
import { useNextFrame } from './utils'
import { scopedToastProps } from './types'

export type ToastAnnounceIntrinsicElement = ElementType<'div'>
type ToastAnnounceElement = HTMLDivElement

interface ToastAnnounceProps extends PrimitiveProps {}

const ANNOUNCE_NAME = 'OkuToastAnnounce'

const toastAnnounceProps = {
  props: {
    ...primitiveProps,
  },
}

const toastAnnounce = defineComponent({
  name: ANNOUNCE_NAME,
  components: {
    OkuPortal,
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...toastAnnounceProps.props,
    ...scopedToastProps,
  },
  setup(props, { attrs, slots }) {
    const { ...toastAnnounceAttrs } = attrs

    const {
      scopeOkuToast,
    } = toRefs(props)

    const inject = useToastProviderInject(TOAST_NAME, scopeOkuToast.value)
    const renderAnnounceText = ref<boolean>(false)
    const isAnnounced = ref<boolean>(false)

    // render text content in the next frame to ensure toast is announced in NVDA
    useNextFrame(() => renderAnnounceText.value = true)

    watchEffect((onInvalidate) => {
      const timer = window.setTimeout(() => isAnnounced.value = true, 1000)

      onInvalidate(() => window.clearTimeout(timer))
    })

    return () => isAnnounced.value
      ? null
      : h(OkuPortal,
        { asChild: true },
        {
          default: () => h(OkuVisuallyHidden,
            {
              ...toastAnnounceAttrs,
            },
            {
              default: () => renderAnnounceText.value && h(Fragment,
                [
                  inject.label.value,
                  slots.default?.(),
                ],
              ),
            },
          ),
        },
      )
  },
})

export const OkuToastAnnounce = toastAnnounce as typeof toastAnnounce &
(new () => { $props: Partial<ToastAnnounceElement> })

export type { ToastAnnounceElement, ToastAnnounceProps }
