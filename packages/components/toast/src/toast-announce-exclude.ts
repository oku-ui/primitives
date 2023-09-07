import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
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
    const { ...toastAnnounceExcludeAttrs } = attrs as ToastAnnounceExcludeNaviteElement

    const forwardedRef = useForwardRef()

    const {
      altText,
    } = toRefs(props)

    return () => h(Primitive.div,
      {
        ...toastAnnounceExcludeAttrs,
        'ref': forwardedRef,
        'data-oku-toast-announce-exclude': '',
        'data-oku-toast-announce-alt': altText.value || undefined,
      },
      {
        default: () => slots.default?.(),
      },
    )
  },
})

export const OkuToastAnnounceExclude = toastAnnounceExclude as typeof toastAnnounceExclude &
(new () => { $props: ToastAnnounceExcludeNaviteElement })
