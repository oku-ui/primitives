/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * Toast
 * ----------------------------------------------------------------------------------------------- */

import { useControllable, useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { computed, defineComponent, toRefs, useModel } from 'vue'

export const TOAST_NAME = 'Toast'
const TOAST_SWIPE_START = 'toast.swipeStart'
const TOAST_SWIPE_MOVE = 'toast.swipeMove'
const TOAST_SWIPE_CANCEL = 'toast.swipeCancel'
const TOAST_SWIPE_END = 'toast.swipeEnd'

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

const Toast = defineComponent({
  name: TOAST_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    // scopeToast: {
    //   type: Object as unknown as PropType<Scope>,
    //   required: false,
    // },
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
    // children: {
    // },
  },
  emits: ['update:modelValue'],
  setup(props, { attrs, emit, slots }) {
    // const { ...toastProps } = attrs
    // as ToastElement

    const forwardedRef = useForwardRef()

    const {
      forceMount,
      open: openProp,
      defaultOpen,
      onOpenChange,
      // ...toastProps
    } = toRefs(props)

    const modelValue = useModel(props, 'modelValue')

    const { state = true, updateValue } = useControllable({
      prop: computed(() => modelValue.value ?? openProp.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (open: boolean) => {
        onOpenChange.value?.(open)
        emit('update:modelValue', open)
      },
    })
    // return (
    //   <Presence present={forceMount || open}>
    //     <ToastImpl
    //       open={open}
    //       {...toastProps}
    //       ref={forwardedRef}
    //       onClose={() => setOpen(false)}
    //       onPause={useCallbackRef(props.onPause)}
    //       onResume={useCallbackRef(props.onResume)}
    //       onSwipeStart={composeEventHandlers(props.onSwipeStart, (event) => {
    //         event.currentTarget.setAttribute('data-swipe', 'start')
    //       })}
    //       onSwipeMove={composeEventHandlers(props.onSwipeMove, (event) => {
    //         const { x, y } = event.detail.delta
    //         event.currentTarget.setAttribute('data-swipe', 'move')
    //         event.currentTarget.style.setProperty('--radix-toast-swipe-move-x', `${x}px`)
    //         event.currentTarget.style.setProperty('--radix-toast-swipe-move-y', `${y}px`)
    //       })}
    //       onSwipeCancel={composeEventHandlers(props.onSwipeCancel, (event) => {
    //         event.currentTarget.setAttribute('data-swipe', 'cancel')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-end-x')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-end-y')
    //       })}
    //       onSwipeEnd={composeEventHandlers(props.onSwipeEnd, (event) => {
    //         const { x, y } = event.detail.delta
    //         event.currentTarget.setAttribute('data-swipe', 'end')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-move-x')
    //         event.currentTarget.style.removeProperty('--radix-toast-swipe-move-y')
    //         event.currentTarget.style.setProperty('--radix-toast-swipe-end-x', `${x}px`)
    //         event.currentTarget.style.setProperty('--radix-toast-swipe-end-y', `${y}px`)
    //         setOpen(false)
    //       })}
    //     />
    //   </Presence>
    // )

    // const originalReturn = () =>

    // return originalReturn
  },
})

// type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
// type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

// const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

// export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

// export type { ToastProviderProps, InstanceToastProviderType }
