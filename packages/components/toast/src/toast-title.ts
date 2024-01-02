import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { TOAST_TITLE_NAME, scopeToastProps, toastTitleProps } from './props'
import type { ToastTitleNativeElement } from './props'

const toastTitle = defineComponent({
  name: TOAST_TITLE_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...toastTitleProps.props,
    ...scopeToastProps,
  },
  emits: toastTitleProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeOkuToast, ...titleProps } = toRefs(props)

    const _reactive = reactive(titleProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, { ...mergeProps(attrs, otherProps), ref: forwardedRef }, () => slots.default?.())
  },
})

export const OkuToastTitle = toastTitle as typeof toastTitle & (new () => { $props: ToastTitleNativeElement })
