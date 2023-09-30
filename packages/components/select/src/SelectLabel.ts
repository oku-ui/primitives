import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { Primitive } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import {
  LABEL_NAME,
  scopeSelectProps,
  selectLabelProps,
  useSelectGroupInject,
} from './props'
import type { SelectLabelNativeElement } from './props'

const SelectLabel = defineComponent({
  name: LABEL_NAME,
  inheritAttrs: false,
  props: {
    ...selectLabelProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, ...selectLabelProps } = toRefs(props)

    const groupInject = useSelectGroupInject(LABEL_NAME, scopeOkuSelect.value)

    const forwardedRef = useForwardRef()

    return () =>
      h(
        Primitive.div,
        {
          ...mergeProps(attrs, selectLabelProps),
          id: groupInject.id,
          ref: forwardedRef,
        },
        slots,
      )
  },
})

export const OkuSelectLabel = SelectLabel as typeof SelectLabel &
(new () => {
  $props: SelectLabelNativeElement
})
