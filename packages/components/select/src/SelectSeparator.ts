import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  SEPARATOR_NAME,
  scopeSelectProps,
  selectSeperatorProps,
} from './props'
import type { SelectSeparatorElement } from './types'

const SelectSeparator = defineComponent({
  name: SEPARATOR_NAME,
  inheritAttrs: false,
  props: {
    ...selectSeperatorProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, ...selectSeperatorProps } = toRefs(props)

    const forwardedRef = useForwardRef()

    return () =>
      h(
        Primitive.div,
        {
          'aria-hidden': true,
          ...mergeProps(attrs, selectSeperatorProps),
          'ref': forwardedRef,
        },
        slots,
      )
  },
})

export const OkuSelectSeparator = SelectSeparator as typeof SelectSeparator &
(new () => {
  $props: SelectSeparatorElement
})
