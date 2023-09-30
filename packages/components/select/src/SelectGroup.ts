import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { useForwardRef, useId } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import {
  GROUP_NAME,
  SelectGroupProvider,
  scopeSelectProps,
  selectGroupProps,
} from './props'
import type { SelectGroupElement } from './types'

const SelectGroup = defineComponent({
  name: GROUP_NAME,
  inheritAttrs: false,
  props: {
    ...selectGroupProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect, ...selectGroupProps } = toRefs(props)

    const groupId = useId()
    const forwardedRef = useForwardRef()

    SelectGroupProvider({
      scope: scopeOkuSelect.value,
      id: groupId,
    })

    return () =>
      h(
        Primitive.div,
        {
          'role': 'group',
          'aria-labelledby': groupId,
          ...mergeProps(attrs, selectGroupProps),
          'ref': forwardedRef,
        },
        slots,
      )
  },
})

export const OkuSelectGroup = SelectGroup as typeof SelectGroup &
(new () => {
  $props: SelectGroupElement
})
