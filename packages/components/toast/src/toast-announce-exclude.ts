import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'
import { scopedProps } from './types'

export type ToastAnnounceExcludeIntrinsicElement = ElementType<'div'>
type ToastAnnounceExcludeElement = HTMLDivElement

interface ToastAnnounceExcludeProps extends PrimitiveProps {
  scopeToast?: Scope
  altText?: string
}

const ANNOUNCE_EXCLUDE_NAME = 'AnnounceExclude'

const toastAnnounceExcludeProps = {
  altText: {
    type: String,
    required: false,
  },
}

const toastAnnounceExclude = defineComponent({
  name: ANNOUNCE_EXCLUDE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    ...toastAnnounceExcludeProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...toastAnnounceExcludeAttrs } = attrs as ToastAnnounceExcludeIntrinsicElement

    const forwardedRef = useForwardRef()

    const {
      altText,
    } = toRefs(props)

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          ...toastAnnounceExcludeAttrs,
          'ref': forwardedRef,
          'data-oku-toast-announce-exclude': '',
          'data-oku-toast-announce-alt': altText.value || undefined,
        },
      )

    return originalReturn
  },
})

export const OkuToastAnnounceExclude = toastAnnounceExclude as typeof toastAnnounceExclude &
(new () => { $props: Partial<ToastAnnounceExcludeElement> })

export type { ToastAnnounceExcludeElement, ToastAnnounceExcludeProps }
