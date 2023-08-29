import type { PropType } from 'vue'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { OkuPortal } from '@oku-ui/portal'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import type { ElementType } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { useToastProviderInject } from './toast-provider'
import { TOAST_NAME } from './toast'
import { useNextFrame } from './utils'
import type { ScopedPropsInterface } from './types'
import { scopedProps } from './types'

export type ToastAnnounceIntrinsicElement = ElementType<'div'>
type ToastAnnounceElement = HTMLDivElement

interface ToastAnnounceProps extends Omit<HTMLDivElement, 'children'>, ScopedPropsInterface<{ children: string[] }> {}

const ANNOUNCE_NAME = 'OkuToastAnnounce'

const toastAnnounceProps = {
  children: {
    type: Array as PropType<string[]>,
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
    ...toastAnnounceProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...toastAnnounceAttrs } = attrs
    // as ToastAnnounceIntrinsicElement

    const {
      children,
    } = toRefs(props)

    const inject = useToastProviderInject(TOAST_NAME, props.scopeOkuToast)
    const renderAnnounceText = ref<boolean>(false)
    const isAnnounced = ref<boolean>(false)

    // render text content in the next frame to ensure toast is announced in NVDA
    useNextFrame(() => renderAnnounceText.value = true)

    // cleanup after announcing
    watchEffect((onInvalidate) => {
      const timer = window.setTimeout(() => isAnnounced.value = true, 1000)
      onInvalidate(() => window.clearTimeout(timer))
    })

    const originalReturn = () =>
      isAnnounced.value
        ? null
        : h(
          OkuPortal,
          { asChild: true },
          [
            h(
              OkuVisuallyHidden,
              {
                ...toastAnnounceAttrs,
              },
              {
                default: () => renderAnnounceText.value ? [inject.label, children.value] : null,
              },
            ),
          ],
        )

    return originalReturn
  },
})

export const OkuToastAnnounce = toastAnnounce as typeof toastAnnounce &
(new () => { $props: Partial<ToastAnnounceElement> })

export type { ToastAnnounceElement, ToastAnnounceProps }
