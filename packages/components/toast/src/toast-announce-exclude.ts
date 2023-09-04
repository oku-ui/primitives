import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import { scopedToastProps } from './types'

export type ToastAnnounceExcludeIntrinsicElement = ElementType<'div'>
type ToastAnnounceExcludeElement = HTMLDivElement

interface ToastAnnounceExcludeProps extends PrimitiveProps {
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
    const { ...toastAnnounceExcludeAttrs } = attrs as ToastAnnounceExcludeIntrinsicElement

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
(new () => { $props: Partial<ToastAnnounceExcludeElement> })

export type { ToastAnnounceExcludeElement, ToastAnnounceExcludeProps }
