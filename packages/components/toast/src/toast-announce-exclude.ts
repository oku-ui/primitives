/* eslint-disable unused-imports/no-unused-vars */
import type { ElementType, IPrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

type ToastAnnounceExcludeElement = ElementType<'div'>
interface ToastAnnounceExcludeProps extends IPrimitiveProps {
  altText?: string
}

const ANNOUNCE_EXCLUDE_NAME = 'AnnounceExclude'

const ToastAnnounceExclude = defineComponent({
  name: ANNOUNCE_EXCLUDE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    altText: {
      type: String,
      required: false,
    },
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, emit, slots }) {
    // const { ...announceExcludeProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const {
      scopeToast,
      altText,
      ...announceExcludeProps
    } = toRefs(props)

    // return (
    //   <Primitive.div
    //     data-radix-toast-announce-exclude=""
    //     data-radix-toast-announce-alt={altText || undefined}
    //     {...announceExcludeProps}
    //     ref={forwardedRef}
    //   />
    // );

    // const originalReturn = () =>

    // return originalReturn
  },
})
