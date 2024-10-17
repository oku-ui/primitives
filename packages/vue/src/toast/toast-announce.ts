import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { OkuPortal } from '@oku-ui/portal'
import { primitiveProps } from '@oku-ui/primitive'
import { isClient, reactiveOmit } from '@oku-ui/use-composable'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { defineComponent, Fragment, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { TOAST_NAME, useToastProviderInject } from './share'
import { scopedToastProps } from './types'
import { useNextFrame } from './utils'

export type ToastAnnounceNaviteElement = OkuElement<'div'>
export type ToastAnnounceElement = HTMLDivElement

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
    const {
      scopeOkuToast,
      ...announceProps
    } = toRefs(props)
    const _reactive = reactive(announceProps)
    const reactiveAnnounceProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useToastProviderInject(TOAST_NAME, scopeOkuToast.value)
    const renderAnnounceText = ref<boolean>(false)
    const isAnnounced = ref<boolean>(false)

    // render text content in the next frame to ensure toast is announced in NVDA
    useNextFrame(() => renderAnnounceText.value = true)

    watchEffect((onInvalidate) => {
      if (!isClient)
        return

      const timer = window.setTimeout(() => isAnnounced.value = true, 1000)

      onInvalidate(() => window.clearTimeout(timer))
    })

    return () => isAnnounced.value
      ? null
      : h(OkuPortal, { asChild: true }, {
        default: () => h(OkuVisuallyHidden, {
          ...mergeProps(attrs, reactiveAnnounceProps),
        }, {
          default: () => renderAnnounceText.value && h(Fragment, [
            inject.label.value,
            slots.default?.(),
          ]),
        }),
      })
  },
})

export const OkuToastAnnounce = toastAnnounce as typeof toastAnnounce &
  (new () => { $props: ToastAnnounceNaviteElement })

export type { ToastAnnounceProps }
