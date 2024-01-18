import { createScope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import type { Ref } from 'vue'
import type { ToastImplElement, ToastImplNaviteElement } from './toast-impl'
import type { ToastViewportElement } from './toast-viewport'

export const PROVIDER_NAME = 'OkuToastProvider'
export const TOAST_NAME = 'Toast'
export type ToastElement = ToastImplElement
export type ToastNativeElement = ToastImplNaviteElement

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection, createCollectionScope } = createCollection<ToastElement>('Toast')

export type SwipeDirection = 'up' | 'down' | 'left' | 'right'
type ToastProviderProvideValue = {
  label: Ref<string>
  duration: Ref<number>
  swipeDirection: Ref<SwipeDirection>
  swipeThreshold: Ref<number>
  toastCount: Ref<number>
  viewport: Ref<ToastViewportElement | null>
  onViewportChange(viewport: ToastViewportElement): void
  onToastAdd(): void
  onToastRemove(): void
  isFocusedToastEscapeKeyDownRef: Ref<boolean>
  isClosePausedRef: Ref<boolean>
}

export const [createToastProvide, createToastScope] = createScope('Toast', [createCollectionScope])

export const [toastProviderProvider, useToastProviderInject] = createToastProvide<ToastProviderProvideValue>(PROVIDER_NAME)

export const [toastInteractiveProvider, useToastInteractiveInject] = createToastProvide(TOAST_NAME, {
  onClose() { },
})
