/* eslint-disable unused-imports/no-unused-vars */
import { defineComponent, ref, toRefs } from 'vue'
import type { PropType, Ref } from 'vue'
import type { IPrimitiveProps, InstanceTypeRef, MergeProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { useForwardRef } from '@oku-ui/use-composable'
import { createCollection } from '@oku-ui/collection'
import type { InstanceToastViewportType } from './toast-viewport'

/* -------------------------------------------------------------------------------------------------
 * ToastProvider
 * ----------------------------------------------------------------------------------------------- */

export const PROVIDER_NAME = 'ToastProvider'

const [Collection, useCollection, createCollectionScope] = createCollection<ToastElement>('Toast')

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
type ToastProviderContextValue = {
  label: string
  duration: number
  swipeDirection: SwipeDirection
  swipeThreshold: number
  toastCount: number
  viewport: InstanceToastViewportType | null
  onViewportChange(viewport: InstanceToastViewportType): void
  onToastAdd(): void
  onToastRemove(): void
  isFocusedToastEscapeKeyDownRef: Ref<boolean>
  isClosePausedRef: Ref<boolean>
}

// type ScopedProps<P> = P & { __scopeToast?: Scope };
// interface ToastProps extends IPrimitiveProps {
//   scopeToast?: Scope
// }
export type ScopedPropsInterface<P> = P & { scopeToast?: Scope }
export const ScopedProps = {
  scopeToast: {
    type: Object as PropType<Scope>,
  },
}
const [createToastContext, createToastScope] = createProvideScope('Toast', [createCollectionScope])
const [ToastProviderProvider, useToastProviderContext] = createToastContext<ToastProviderContextValue>(PROVIDER_NAME)

interface ToastProviderProps extends IPrimitiveProps {
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

const ToastProvider = defineComponent({
  name: PROVIDER_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
    label: {
      type: String,
      default: 'Notification',
    },
    duration: {
      type: Number,
      default: 5000,
    },
    swipeDirection: {
      type: String as PropType<SwipeDirection>,
      default: 'right',
    },
    swipeThreshold: {
      type: Number,
      default: 50,
    },
    // children: {
    // },
  },
  setup(props, { attrs, emit, slots }) {
    const { ...toastProps } = attrs
    // as ToastElement

    const forwardedRef = useForwardRef()

    const {
      scopeToast,
      label,
      duration,
      swipeDirection,
      swipeThreshold,
      // children,
    } = toRefs(props)

    const viewport = ref<InstanceToastViewportType | null>(null)
    const toastCount = ref(0)
    const isFocusedToastEscapeKeyDownRef = ref(false)
    const isClosePausedRef = ref(false)

    ToastProviderProvider({
      scope: scopeToast.value,
      label: label.value,
      duration: duration.value,
      swipeDirection: swipeDirection.value,
      swipeThreshold: swipeThreshold.value,
      toastCount: toastCount.value,
      viewport: viewport.value,
      onViewportChange: viewport.value,
      onToastAdd: () => toastCount.value++,
      onToastRemove: () => toastCount.value--,
      isFocusedToastEscapeKeyDownRef,
      isClosePausedRef,
    })

    // const originalReturn = () =>
    // h(
    //   ToastProviderProvider, {
    //     ...toastProps,
    //     ref: forwardedRef,
    //   },
    //   {
    //     default: () => slots.default?.(),
    //   },
    // )

    // const originalReturn = () =>
    //   h(Collection.Provider,
    //     {
    //       scope: __scopeToast,
    //     },
    //     [
    //       h(ToastProvider,
    //         {
    //           label,
    //           duration,
    //           swipeDirection,
    //           swipeThreshold,
    //           toastCount,
    //           viewport,
    //           onViewportChange: setViewport,
    //           onToastAdd: () => setToastCount(prevCount => prevCount + 1),
    //           onToastRemove: () => setToastCount(prevCount => prevCount - 1),
    //           isFocusedToastEscapeKeyDownRef,
    //           isClosePausedRef,
    //         },
    //         children,
    //       ),
    //     ],
    // )

    // ToastProvider.propTypes = {
    //   label(props) {
    //     if (props.label && typeof props.label === 'string' && !props.label.trim()) {
    //       const error = `Invalid prop \`label\` supplied to \`${PROVIDER_NAME}\`. Expected non-empty \`string\`.`
    //       return new Error(error)
    //     }
    //     return null
    //   },
    // }

    // return originalReturn
  },
})

type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

export type { ToastProviderProps, InstanceToastProviderType }
