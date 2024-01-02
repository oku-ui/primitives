import { computed, defineComponent, h, mergeProps, reactive, toRefs, useModel } from 'vue'
import { reactiveOmit, useControllable, useForwardRef, useListeners } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPresence } from '@oku-ui/presence'
import { OkuToastImpl } from './toast-impl'
import { TOAST_NAME, scopeToastProps, toastProps } from './props'
import type { ToastEmits, ToastNativeElement } from './props'

const toast = defineComponent({
  name: TOAST_NAME,
  components: {
    OkuPresence,
    OkuToastImpl,
  },
  inheritAttrs: false,
  props: {
    ...toastProps.props,
    ...scopeToastProps,
  },
  emits: toastProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      forceMount,
      open: openProp,
      defaultOpen,
      ...toastProps
    } = toRefs(props)

    const _reactive = reactive(toastProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()
    const emits = useListeners()

    const modelValue = useModel(props, 'modelValue')
    const proxyOpened = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : openProp.value !== undefined ? openProp.value : undefined,
      set: () => { },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyOpened.value),
      defaultProp: computed(() => defaultOpen.value),
      onChange: (result) => {
        modelValue.value = result
        emit('openChange', result)
        emit('update:modelValue', result)
      },
      initialValue: true,
    })

    return () => h(OkuPresence, {
      present: computed(() => forceMount.value || state.value).value,
    }, () => h(OkuToastImpl, {
      open: state.value,
      ...mergeProps(attrs, otherProps, emits),
      ref: forwardedRef,
      onClose: () => updateValue(false),
      onPause: () => emit('pause'),
      onResume: () => emit('resume'),
      onSwipeStart: composeEventHandlers<ToastEmits['swipeStart'][0]>((event) => {
        emit('swipeStart', event)
      }, (event) => {
        const targetElement = event.currentTarget as HTMLElement
        targetElement.setAttribute('data-swipe', 'start')
      }),
      onSwipeMove: composeEventHandlers<ToastEmits['swipeMove'][0]>((event) => {
        emit('swipeMove', event)
      }, (event) => {
        const { x, y } = event.detail.delta
        const targetElement = event.currentTarget as HTMLElement
        targetElement.setAttribute('data-swipe', 'move')
        targetElement.style.setProperty('--oku-toast-swipe-move-x', `${x}px`)
        targetElement.style.setProperty('--oku-toast-swipe-move-y', `${y}px`)
      }),
      onSwipeCancel: composeEventHandlers<ToastEmits['swipeCancel'][0]>((event) => {
        emit('swipeCancel', event)
      }, (event) => {
        const targetElement = event.currentTarget as HTMLElement
        targetElement.setAttribute('data-swipe', 'cancel')
        targetElement.style.removeProperty('--oku-toast-swipe-move-x')
        targetElement.style.removeProperty('--oku-toast-swipe-move-y')
        targetElement.style.removeProperty('--oku-toast-swipe-end-x')
        targetElement.style.removeProperty('--oku-toast-swipe-end-y')
      }),
      onSwipeEnd: composeEventHandlers<ToastEmits['swipeEnd'][0]>((event) => {
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
    }, () => slots.default?.()))
  },
})

export const OkuToast = toast as typeof toast & (new () => { $props: ToastNativeElement })
