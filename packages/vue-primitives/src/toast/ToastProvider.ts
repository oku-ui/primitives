import { type MaybeRef, type MaybeRefOrGetter, type Ref, shallowRef } from 'vue'
import { type MutableRefObject, createContext, useRef } from '../hooks/index.ts'
import { Collection } from './collection.ts'

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
  swipeDirection?: MaybeRef<SwipeDirection>
  /**
   * Distance in pixels that the swipe must pass before a close is triggered.
   * @defaultValue 50
   */
  swipeThreshold?: MaybeRefOrGetter<number>
}

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
export type ToastViewportElement = HTMLOListElement

export interface ToastProviderContextValue {
  label: string
  duration: number
  swipeDirection: Ref<SwipeDirection>
  swipeThreshold: MaybeRefOrGetter<number>
  toastCount: Ref<number>
  viewport: Ref<ToastViewportElement | undefined>
  onViewportChange: (viewport: ToastViewportElement | undefined) => void
  onToastAdd: () => void
  onToastRemove: () => void
  isFocusedToastEscapeKeyDownRef: MutableRefObject<boolean>
  isClosePausedRef: MutableRefObject<boolean>
}

export const [provideToastProviderContext, useToastProviderContext] = createContext<ToastProviderContextValue>('Toast')

export function useToastProvider(props: ToastProviderProps = {}) {
  const { label = 'Notification', duration = 5000, swipeDirection = 'right', swipeThreshold = 50 } = props
  const viewport = shallowRef<ToastViewportElement>()
  const viewportRef = useRef<ToastViewportElement>()
  const toastCount = shallowRef(0)
  const isFocusedToastEscapeKeyDownRef = useRef(false)
  const isClosePausedRef = useRef(false)

  Collection.provideCollectionContext(viewportRef)

  provideToastProviderContext({
    label,
    duration,
    swipeDirection: shallowRef(swipeDirection),
    swipeThreshold,
    toastCount,
    viewport,
    onViewportChange(newViewport) {
      viewport.value = newViewport
    },
    onToastAdd() {
      toastCount.value += 1
    },
    onToastRemove() {
      toastCount.value -= 1
    },
    isFocusedToastEscapeKeyDownRef,
    isClosePausedRef,
  })
}
