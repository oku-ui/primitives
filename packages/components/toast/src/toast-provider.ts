import { defineComponent, h, ref, toRefs } from 'vue'
import { CollectionProvider, TOAST_PROVIDER_NAME, scopeToastProps, toastProviderProps, toastProviderProvider } from './props'
import type { ToastViewportElement } from './props'

const toastProvider = defineComponent({
  name: TOAST_PROVIDER_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...toastProviderProps.props,
    ...scopeToastProps,
  },
  setup(props, { slots }) {
    const {
      scopeOkuToast,
      label,
      duration,
      swipeDirection,
      swipeThreshold,
    } = toRefs(props)

    const viewport = ref<ToastViewportElement | null>(null)
    const toastCount = ref(0)
    const isFocusedToastEscapeKeyDownRef = ref(false)
    const isClosePausedRef = ref(false)

    toastProviderProvider({
      scope: scopeOkuToast.value,
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      toastCount,
      viewport,
      onViewportChange: _viewport => viewport.value = _viewport,
      onToastAdd: () => toastCount.value++,
      onToastRemove: () => toastCount.value--,
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef,
    })

    // if (label.value && typeof label.value === 'string' && !label.value.trim())
    //   throw new Error(`Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`)

    return () => h(CollectionProvider, {
      scope: scopeOkuToast.value,
    }, () => slots.default?.())
  },
})

// export const OkuToastProvider = toastProvider as typeof toastProvider & (new () => { $props: ToastNativeElement })
export const OkuToastProvider = toastProvider
