import { defineComponent, h, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import type { PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import { useCallbackRef } from '@oku-ui/use-composable'
import type { ToastImplElement } from './toast-impl'
import type { ToastViewportElement } from './toast-viewport'
import { scopedProps } from './types'

// import type { ScopedPropsInterface } from './types'

/* -------------------------------------------------------------------------------------------------
 * ToastProvider
 * ----------------------------------------------------------------------------------------------- */

export const PROVIDER_NAME = 'ToastProvider'

type ToastElement = ToastImplElement

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection, createCollectionScope } = createCollection<HTMLLIElement, undefined>('Toast')

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
type ToastProviderContextValue = {
  label: Ref<string>
  duration: Ref<number>
  swipeDirection: Ref<SwipeDirection>
  swipeThreshold: Ref<number>
  toastCount: Ref<number>
  viewport: Ref<ToastViewportElement | null>
  onViewportChange(viewport: ToastViewportElement | null): void
  onToastAdd(): void
  onToastRemove(): void
  isFocusedToastEscapeKeyDownRef: Ref<boolean>
  isClosePausedRef: Ref<boolean>
}

// export interface ToastProviderProps extends ScopedPropsInterface<ToastElement> { }

const [createToastContext, createToastScope] = createProvideScope('Toast', [createCollectionScope])
const [ToastProviderProvider, useToastProviderContext] = createToastContext<ToastProviderContextValue>(PROVIDER_NAME)

interface ToastProviderProps extends PrimitiveProps {
  // children?: React.ReactNode
  scopeToast?: Scope
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
  // children: {
  // },
}

const toastProvider = defineComponent({
  name: PROVIDER_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...toastProviderProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { slots }) {
    const {
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      // children,
    } = toRefs(props)

    const viewport = ref<ToastViewportElement | null>(null)
    const toastCount = ref(0)
    const isFocusedToastEscapeKeyDownRef = ref(false)
    const isClosePausedRef = ref(false)

    ToastProviderProvider({
      scope: props.scopeOkuToast,
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      toastCount,
      viewport,
      onViewportChange: () => viewport.value,
      onToastAdd: useCallbackRef(() => toastCount.value++),
      onToastRemove: useCallbackRef(() => toastCount.value--),
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef,
    })

    const originalReturn = () =>
      h(CollectionProvider,
        {
          scope: props.scopeOkuToast,
        },
        [
          h(ToastProviderProvider, slots.default?.()),
        ],
      )

    if (label.value && typeof label.value === 'string' && !label.value.trim())
      throw new Error(`Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`)

    return originalReturn
  },
})

export { useToastProviderContext, createToastScope, createToastContext }

export const OkuToastProvider = toastProvider as typeof toastProvider &
(new () => { $props: Partial<ToastElement> })

export type { ToastElement, ToastProviderProps }
