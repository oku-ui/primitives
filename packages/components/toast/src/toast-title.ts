/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * ToastTitle
 * ----------------------------------------------------------------------------------------------- */

import type { IPrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

const TITLE_NAME = 'ToastTitle'

// type ToastTitleElement = ElementType<'div'>
// type PrimitiveDivProps = ComponentPropsWithoutRef<typeof Primitive.div>
interface ToastTitleProps extends IPrimitiveProps {}

const ToastTitle = defineComponent({
  name: TITLE_NAME,
  components: {
  },
  inheritAttrs: false,
  props: {
    scopeToast: {
      type: Object as unknown as PropType<Scope>,
      required: false,
    },
  },
  setup(props, { attrs, emit, slots }) {
    // const { ...titleProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const { scopeToast, ...titleProps } = toRefs(props)

    // return <Primitive.div {...titleProps} ref={forwardedRef} />;

    // const originalReturn = () =>

    // return originalReturn
  },
})
