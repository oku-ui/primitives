import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { TOAST_ANNOUNCE_EXCLUDE_NAME, scopeToastProps, toastAnnounceExcludeProps } from './props'
import type { ToastAnnounceExcludeNativeElement } from './props'

const toastAnnounceExclude = defineComponent({
  name: TOAST_ANNOUNCE_EXCLUDE_NAME,
  components: { },
  inheritAttrs: false,
  props: {
    ...toastAnnounceExcludeProps.props,
    ...scopeToastProps,
  },
  emits: toastAnnounceExcludeProps.emits,
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeOkuToast, altText, ...announceExcludeProps } = toRefs(props)

    const _reactive = reactive(announceExcludeProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, {
      'data-oku-toast-announce-exclude': '',
      'data-oku-toast-announce-alt': altText.value || undefined,
      ...mergeProps(attrs, otherProps),
      'ref': forwardedRef,
    }, () => slots.default?.())
  },
})

export const OkuToastAnnounceExclude = toastAnnounceExclude as typeof toastAnnounceExclude & (new () => { $props: ToastAnnounceExcludeNativeElement })
