/* eslint-disable unused-imports/no-unused-vars */
/* -------------------------------------------------------------------------------------------------
 * ToastDescription
 * ----------------------------------------------------------------------------------------------- */

import type { IPrimitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { PropType } from 'vue'
import { defineComponent, toRefs } from 'vue'
import type { Scope } from '@oku-ui/provide'

const DESCRIPTION_NAME = 'ToastDescription'

// type ToastDescriptionElement = ElementType<'div'>;
interface ToastDescriptionProps extends IPrimitiveProps {}

const ToastTToastDescriptionitle = defineComponent({
  name: DESCRIPTION_NAME,
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
    // const { ...descriptionProps } = attrs as ToastElement

    const forwardedRef = useForwardRef()

    const { scopeToast, ...descriptionProps } = toRefs(props)

    //  return <Primitive.div {...descriptionProps} ref={forwardedRef} />;

    // const originalReturn = () =>

    // return originalReturn
  },
})

// type _ToastProvider = MergeProps<ToastProviderProps, ToastProviderElement>
// type InstanceToastProviderType = InstanceTypeRef<typeof ToastProvider, _ToastProviderEl>

// const OkuToastProvider = ToastProvider as typeof ToastProvider & (new () => { $props: _ToastProvider })

// export { OkuToastProvider, useToastProviderContext, createToastScope, createToastContext, useCollection }

// export type { ToastProviderProps, InstanceToastProviderType }
