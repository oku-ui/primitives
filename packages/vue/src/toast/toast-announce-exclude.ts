import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { scopedToastProps } from './types'

export type ToastAnnounceExcludeNaviteElement = OkuElement<'div'>
export type ToastAnnounceExcludeElement = HTMLDivElement

export interface ToastAnnounceExcludeProps extends PrimitiveProps {
  altText?: string
}

const ANNOUNCE_EXCLUDE_NAME = 'OkuAnnounceExclude'

const toastAnnounceExcludeProps = {
  props: {
    altText: {
      type: String,
      required: false,
    },
    ...primitiveProps,
  },
}

const toastAnnounceExclude = defineComponent({
  name: ANNOUNCE_EXCLUDE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...toastAnnounceExcludeProps.props,
    ...scopedToastProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuToast: _scopeToast, altText, ...announceExcludeProps } = toRefs(props)

    const _reactive = reactive(announceExcludeProps)
    const reactiveActionProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () => h(Primitive.div, {
      'data-oku-toast-announce-exclude': '',
      'data-oku-toast-announce-alt': altText.value || undefined,
      ...mergeProps(attrs, reactiveActionProps),
      'ref': forwardedRef,
    }, {
      default: () => slots.default?.(),
    })
  },
})

export const OkuToastAnnounceExclude = toastAnnounceExclude as typeof toastAnnounceExclude &
  (new () => { $props: ToastAnnounceExcludeNaviteElement })
