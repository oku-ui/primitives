import { useCallbackRef, useControllable, useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { computed, defineComponent, h, toRefs, useModel } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuToastImpl } from './toast-impl'
import type { SwipeEvent, ToastImplElement, ToastImplIntrinsicElement, ToastImplPrivateProps, ToastImplProps } from './toast-impl'

/* -------------------------------------------------------------------------------------------------
 * Toast
 * ----------------------------------------------------------------------------------------------- */

export const TOAST_NAME = 'OkuToast'

type ToastIntrinsicElement = ToastImplIntrinsicElement
type ToastElement = ToastImplElement

interface ToastProps extends Omit<ToastImplProps, keyof ToastImplPrivateProps> {
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const toastProps = {
  modelValue: {
    type: Boolean as PropType<boolean>,
    default: undefined,
  },
  open: {
    type: Boolean,
    required: false,
  },
  defaultOpen: {
    type: Boolean,
    required: false,
  },
  onOpenChange: {
    type: Function as PropType<ToastProps['onOpenChange']>,
    required: false,
  },
  forceMount: {
    type: Boolean,
    default: true,
  },
}

const toast = defineComponent({
  name: TOAST_NAME,
  components: {
    OkuPresence,
    OkuToastImpl,
  },
  inheritAttrs: false,
  props: {
    ...toastProps,
    ...primitiveProps,
  },
  emits: {
    'close': () => true,
    'pause': () => true,
    'resume': () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'swipeStart': (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'swipeMove': (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'swipeCancel': (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'swipeEnd': (event: SwipeEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (value: boolean) => true,
  },
  setup(props, { attrs, emit }) {
    const { ...toastAttrs } = attrs as unknown as ToastIntrinsicElement

    const forwardedRef = useForwardRef()

    const {
      forceMount,
      open: openProp,
      defaultOpen,
      // onOpenChange,
    } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')

    const { state, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? openProp.value),
      defaultProp: computed(() => defaultOpen.value || false),
      onChange: (open: boolean) => {
        emit('update:modelValue', open)
        emit('openChange', open)
      },
    })

    return () =>
      h(
        OkuPresence,
        { present: forceMount.value || state.value },
        h(
          OkuToastImpl, {
            open: state.value,
            ref: forwardedRef,
            ...toastAttrs,
            onClose: updateValue(false),
            // onPause: useCallbackRef(onPause),
            onPause: useCallbackRef(() => emit('pause')),
            // onResume: useCallbackRef(onResume),
            onResume: useCallbackRef(() => emit('resume')),
            // onSwipeStart: composeEventHandlers(onSwipeStart, (event: SwipeEvent) => {
            //   const targetElement = event.currentTarget as HTMLElement
            //   targetElement.setAttribute('data-swipe', 'start')
            // }),
            onSwipeStart: composeEventHandlers<SwipeEvent>((event) => {
              emit('swipeStart', event)
            }, (event) => {
              const targetElement = event.currentTarget as HTMLElement
              targetElement.setAttribute('data-swipe', 'start')
            }),
            // onSwipeMove: composeEventHandlers(onSwipeMove, (event: SwipeEvent) => {
            //   const { x, y } = event.detail.delta
            //   const targetElement = event.currentTarget as HTMLElement
            //   targetElement.setAttribute('data-swipe', 'move')
            //   targetElement.style.setProperty('--oku-toast-swipe-move-x', `${x}px`)
            //   targetElement.style.setProperty('--oku-toast-swipe-move-y', `${y}px`)
            // }),
            onSwipeMove: composeEventHandlers<SwipeEvent>((event) => {
              emit('swipeMove', event)
            }, (event) => {
              const { x, y } = event.detail.delta
              const targetElement = event.currentTarget as HTMLElement
              targetElement.setAttribute('data-swipe', 'move')
              targetElement.style.setProperty('--oku-toast-swipe-move-x', `${x}px`)
              targetElement.style.setProperty('--oku-toast-swipe-move-y', `${y}px`)
            }),
            // onSwipeCancel: composeEventHandlers(onSwipeCancel, (event: SwipeEvent) => {
            //   const targetElement = event.currentTarget as HTMLElement
            //   targetElement.setAttribute('data-swipe', 'cancel')
            //   targetElement.style.removeProperty('--oku-toast-swipe-move-x')
            //   targetElement.style.removeProperty('--oku-toast-swipe-move-y')
            //   targetElement.style.removeProperty('--oku-toast-swipe-end-x')
            //   targetElement.style.removeProperty('--oku-toast-swipe-end-y')
            // }),
            onSwipeCancel: composeEventHandlers<SwipeEvent>((event) => {
              emit('swipeCancel', event)
            }, (event) => {
              const targetElement = event.currentTarget as HTMLElement
              targetElement.setAttribute('data-swipe', 'cancel')
              targetElement.style.removeProperty('--oku-toast-swipe-move-x')
              targetElement.style.removeProperty('--oku-toast-swipe-move-y')
              targetElement.style.removeProperty('--oku-toast-swipe-end-x')
              targetElement.style.removeProperty('--oku-toast-swipe-end-y')
            }),
            // onSwipeEnd: composeEventHandlers(onSwipeEnd, (event: SwipeEvent) => {
            //   const { x, y } = event.detail.delta
            //   const targetElement = event.currentTarget as HTMLElement
            //   targetElement.setAttribute('data-swipe', 'end')
            //   targetElement.style.removeProperty('--oku-toast-swipe-move-x')
            //   targetElement.style.removeProperty('--oku-toast-swipe-move-y')
            //   targetElement.style.setProperty('--oku-toast-swipe-end-x', `${x}px`)
            //   targetElement.style.setProperty('--oku-toast-swipe-end-y', `${y}px`)
            //   updateValue(false)
            // }),
            onSwipeEnd: composeEventHandlers<SwipeEvent>((event) => {
              emit('swipeEnd', event)
            }, (event) => {
              const { x, y } = event.detail.delta
              const targetElement = event.currentTarget as HTMLElement
              targetElement.setAttribute('data-swipe', 'end')
              targetElement.style.removeProperty('--oku-toast-swipe-move-x')
              targetElement.style.removeProperty('--oku-toast-swipe-move-y')
              targetElement.style.setProperty('--oku-toast-swipe-end-x', `${x}px`)
              targetElement.style.setProperty('--oku-toast-swipe-end-y', `${y}px`)
              updateValue(false)
            }),
          },
        ),
      )
  },
})

export const OkuToast = toast as typeof toast &
(new () => { $props: Partial<ToastElement> })

export type { ToastElement, ToastProps }
