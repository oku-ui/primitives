import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  ITEM_INDICATOR_NAME,
  scopeSelectProps,
  selectItemIndicatorProps,
  useSelectItemInject,
} from './props'
import type { SelectItemIndicatorElement } from './props'

const SelectItemIndicator = defineComponent({
  name: ITEM_INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...selectItemIndicatorProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuSelect, ...selectItemIndicatorProps } = toRefs(props)

    const itemInject = useSelectItemInject(
      ITEM_INDICATOR_NAME,
      scopeOkuSelect.value,
    )

    const forwardedRef = useForwardRef()

    return () =>
      itemInject.isSelected.value
        ? h(
          Primitive.span,
          {
            'aria-hidden': true,
            'ref': forwardedRef,
            ...mergeProps(attrs, selectItemIndicatorProps),
          },
          slots,
        )
        : null
  },
})

export const OkuSelectIndicator
  = SelectItemIndicator as typeof SelectItemIndicator &
  (new () => {
    $props: SelectItemIndicatorElement
  })
