import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  ITEM_INDICATOR_NAME,
  scopeSelectProps,
  selectItemIndicatorProps,
  useSelectItemInject,
} from './props'
import type { SelectItemIndicatorNativeElement } from './props'

const SelectItemIndicator = defineComponent({
  name: ITEM_INDICATOR_NAME,
  inheritAttrs: false,
  props: {
    ...selectItemIndicatorProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs, slots }) {
    const { scopeOkuSelect, ...propsRefs } = toRefs(props)

    const _reactive = reactive(propsRefs)
    const reactivePropsRefs = reactiveOmit(_reactive, (key, _value) => key === undefined)

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
            ...mergeProps(attrs, reactivePropsRefs),
          },
          slots,
        )
        : null
  },
})

export const OkuSelectIndicator
  = SelectItemIndicator as typeof SelectItemIndicator &
  (new () => {
    $props: SelectItemIndicatorNativeElement
  })
