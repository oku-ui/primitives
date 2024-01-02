import { Fragment, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { isClient, reactiveOmit } from '@oku-ui/use-composable'
import { OkuVisuallyHidden } from '@oku-ui/visually-hidden'
import { OkuPortal } from '@oku-ui/portal'
import { useNextFrame } from './utils'
import { TOAST_ANNOUNCE_NAME, TOAST_NAME, scopeToastProps, toastAnnounceProps, useToastProviderInject } from './props'

const toastAnnounce = defineComponent({
  name: TOAST_ANNOUNCE_NAME,
  components: {
    OkuPortal,
    OkuVisuallyHidden,
  },
  inheritAttrs: false,
  props: {
    ...toastAnnounceProps.props,
    ...scopeToastProps,
  },
  emits: toastAnnounceProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuToast,
      ...announceProps
    } = toRefs(props)

    const _reactive = reactive(announceProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

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

    return () => [isAnnounced.value
      ? null
      : h(OkuPortal, {
        asChild: true,
      }, () => h(OkuVisuallyHidden, {
        ...mergeProps(attrs, otherProps),
      }, () => renderAnnounceText.value && h(Fragment, [
        inject.label.value,
        slots.default?.(),
      ]))),
    ]
  },
})

// export const OkuToastAnnounce = toastAnnounce as typeof toastAnnounce & (new () => { $props: ToastAnnounceNaviteElement })
export const OkuToastAnnounce = toastAnnounce
