import type { EmitsToHookProps, PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/typeUtils.ts'
import { type Ref, shallowRef } from 'vue'
import { createContext, useControllableStateV2 } from '../hooks/index.ts'
import { usePresence } from '../presence/usePresence.ts'

export interface ToastRootProps {
  open?: boolean
  defaultOpen?: boolean
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: boolean
}

export const DEFAULT_TOAST_ROOT_PROPS = {
  open: undefined,
  defaultOpen: undefined,
  forceMount: undefined,
} satisfies PrimitiveDefaultProps<ToastRootProps>

export type ToastRootEmits = {
  'update:open': [open: boolean]
}

export interface ToastContext {
  el: Ref<HTMLElement | undefined>
  open: Ref<boolean>
  onChangeOpen: (v: boolean) => void
  onClose: () => void
  setOnClose: (onClose: () => void) => void
}

export const [provideToastRootContext, useToastRootContext] = createContext<ToastContext>('Toast')

export interface UseToastRootProps extends EmitsToHookProps<ToastRootEmits> {
  open?: () => boolean | undefined
  defaultOpen?: ToastRootProps['defaultOpen']
  forceMount?: ToastRootProps['forceMount']
}

export function useToastRoot(props: UseToastRootProps = {}): RadixPrimitiveReturns<{
  isPresent: Ref<boolean>
}> {
  const { defaultOpen = true } = props

  const el = shallowRef<HTMLElement>()

  const open = useControllableStateV2(
    props.open,
    props.onUpdateOpen,
    defaultOpen,
  )

  const isPresent = props.forceMount ? shallowRef(true) : usePresence(el, () => open.value)

  let _onClose = () => { }

  provideToastRootContext({
    el,
    open,
    onChangeOpen(v) {
      open.value = v
    },
    onClose: () => _onClose(),
    setOnClose(onClose) {
      _onClose = onClose
    },
  })

  return {
    isPresent,
  }
}

export type SwipeEvent = { currentTarget: EventTarget & HTMLLIElement } & Omit<
  CustomEvent<{ originalEvent: PointerEvent, delta: { x: number, y: number } }>,
  'currentTarget'
>

export const TOAST_SWIPE_START = 'toast.swipeStart'
export const TOAST_SWIPE_MOVE = 'toast.swipeMove'
export const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
export const TOAST_SWIPE_END = 'toast.swipeEnd'
