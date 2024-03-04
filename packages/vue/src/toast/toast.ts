import { reactiveOmit, useControllable, useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuToastImpl, toastImplProps } from './toast-impl'
import type { SwipeEvent, ToastImplElement, ToastImplEmits, ToastImplNaviteElement, ToastImplPrivateEmits, ToastImplPrivateProps, ToastImplProps } from './toast-impl'
import { scopedToastProps } from './types'
import { TOAST_NAME } from './share'

export type ToastNaviteElement = ToastImplNaviteElement
export type ToastElement = ToastImplElement

export interface ToastProps extends Omit<ToastImplProps, keyof ToastImplPrivateProps> {
  open?: boolean
  defaultOpen?: boolean
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export type ToastPropsEmits = {
  'update:modelValue': [value: boolean]
  'openChange': [open: boolean]
} & Omit<ToastImplEmits, keyof ToastImplPrivateEmits>

const toastProps = {
  props: {
    ...toastImplProps.props,
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    open: {
      type: Boolean,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean,
      default: undefined,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
    ...propsOmit(toastImplProps.emits, ['close']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (value: boolean) => true,
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
    ...toastProps.props,
    ...primitiveProps,
    ...scopedToastProps,
  },
  emits: toastProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      modelValue: _modelValue,
      forceMount,
      open: openProp,
      defaultOpen,
      ...toastProps
    } = toRefs(props)
    const _reactive = reactive(toastProps)
    const reactiveReactiveProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const modelValue = useModel(props, 'modelValue')
    const proxyChecked = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyChecked.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result: any) => {
        modelValue.value = result
        emit('openChange', result)
      },
      initialValue: true,
    })

    return () => h(OkuPresence, { present: computed(() => forceMount.value || state.value).value }, {
      default: () => h(OkuToastImpl, {
        open: state.value,
        ...mergeProps(attrs, reactiveReactiveProps),
        ref: forwardedRef,
        onClose: () => updateValue(false),
        onPause: () => emit('pause'),
        onResume: () => emit('resume'),
        onSwipeStart: composeEventHandlers<SwipeEvent>((event) => {
          emit('swipeStart', event)
        }, (event) => {
          const targetElement = event.currentTarget as HTMLElement
          targetElement.setAttribute('data-swipe', 'start')
        }),
        onSwipeMove: composeEventHandlers<SwipeEvent>((event) => {
          emit('swipeMove', event)
        }, (event) => {
          const { x, y } = event.detail.delta
          const targetElement = event.currentTarget as HTMLElement
          targetElement.setAttribute('data-swipe', 'move')
          targetElement.style.setProperty('--oku-toast-swipe-move-x', `${x}px`)
          targetElement.style.setProperty('--oku-toast-swipe-move-y', `${y}px`)
        }),
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
      }, slots),
    })
  },
})

export const OkuToast = toast as typeof toast &
  (new () => { $props: ToastNaviteElement })
