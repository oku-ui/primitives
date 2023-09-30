import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  SEPARATOR_NAME,
  scopeSelectProps,
  selectSeperatorProps,
} from './props'
import type { SelectSeparatorNativeElement } from './props'

const SelectSeparator = defineComponent({
  name: SEPARATOR_NAME,
  inheritAttrs: false,
  props: {
    ...selectSeperatorProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect: _scope, ...propsRefs } = toRefs(props)

    const _reactive = reactive(propsRefs)
    const reactivePropsRefs = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    return () =>
      h(
        Primitive.div,
        {
          'aria-hidden': true,
          ...mergeProps(attrs, reactivePropsRefs),
          'ref': forwardedRef,
        },
        slots,
      )
  },
})

export const OkuSelectSeparator = SelectSeparator as typeof SelectSeparator &
(new () => {
  $props: SelectSeparatorNativeElement
})
