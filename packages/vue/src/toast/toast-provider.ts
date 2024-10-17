import type { PropType } from 'vue'
import type { SwipeDirection, ToastNativeElement } from './share'

import type { ToastViewportElement } from './toast-viewport'
import { defineComponent, h, ref, toRefs } from 'vue'
import { CollectionProvider, PROVIDER_NAME, toastProviderProvider } from './share'
import { scopedToastProps } from './types'

export interface ToastProviderProps {
  /**
   * An author-localized label for each toast. Used to help screen reader users
   * associate the interruption with a toast.
   * @defaultValue 'Notification'
   */
  label?: string
  /**
   * Time in milliseconds that each toast should remain visible for.
   * @defaultValue 5000
   */
  duration?: number
  /**
   * Direction of pointer swipe that should close the toast.
   * @defaultValue 'right'
   */
  swipeDirection?: SwipeDirection
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold?: number
}

const toastProviderProps = {
  props: {
    label: {
      type: String as PropType<string>,
      default: 'Notification',
    },
    duration: {
      type: Number as PropType<number>,
      default: 5000,
    },
    swipeDirection: {
      type: String as PropType<SwipeDirection>,
      default: 'right',
    },
    swipeThreshold: {
      type: Number as PropType<number>,
      default: 50,
    },
  },
}

const toastProvider = defineComponent({
  name: PROVIDER_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...toastProviderProps.props,
    ...scopedToastProps,
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
      onViewportChange(_viewport: ToastViewportElement) {
        viewport.value = _viewport
      },
      onToastAdd: () => {
        toastCount.value++
      },
      onToastRemove: () => {
        toastCount.value--
      },
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef,
    })

    return () => {
      if (label.value && typeof label.value === 'string' && !label.value.trim())
        throw new Error(`Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`)

      return h(CollectionProvider, {
        scope: scopeOkuToast.value,
      }, slots)
    }
  },
})

export const OkuToastProvider = toastProvider as typeof toastProvider &
  (new () => { $props: ToastNativeElement })
