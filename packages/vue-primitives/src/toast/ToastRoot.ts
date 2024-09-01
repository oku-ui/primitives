import { createContext } from '../hooks/index.ts'

export interface ToastRootProps {
  open?: boolean
  defaultOpen?: boolean
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export type SwipeEvent = { currentTarget: EventTarget & HTMLLIElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent, delta: { x: number, y: number } }>,
  'currentTarget'
>

// eslint-disable-next-line ts/consistent-type-definitions
export type ToastRootEmits = {
  'update:open': [open: boolean]

  'swipeStart': [event: SwipeEvent]
  'swipeMove': [event: SwipeEvent]
  'swipeEnd': [event: SwipeEvent]
  'swipeCancel': [event: SwipeEvent]
}

export const TOAST_SWIPE_START = 'toast.swipeStart'
export const TOAST_SWIPE_MOVE = 'toast.swipeMove'
export const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
export const TOAST_SWIPE_END = 'toast.swipeEnd'

export const [provideToastInteractiveContext, useToastInteractiveContext] = createContext('Toast', {
  onClose() {},
})
