import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { TOAST_DESCRIPTION_NAME, scopeToastProps, toastDescriptionProps } from './props'
import type { ToastDescriptionNativeElement } from './props'

const toastDescription = defineComponent({
  name: TOAST_DESCRIPTION_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...toastDescriptionProps.props,
    ...scopeToastProps,
  },
  emits: toastDescriptionProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeOkuToast, ...descriptionProps } = toRefs(props)

    const _reactive = reactive(descriptionProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, { ...mergeProps(attrs, otherProps), ref: forwardedRef }, () => slots.default?.())
  },
})

export const OkuToastDescription = toastDescription as typeof toastDescription & (new () => { $props: ToastDescriptionNativeElement })
