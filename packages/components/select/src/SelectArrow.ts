import { defineComponent, h, mergeProps, toRefs } from 'vue'
import { OkuPopperArrow } from '@oku-ui/popper'
import { useForwardRef } from '@oku-ui/use-composable'
import {
  ARROW_NAME,
  scopeSelectProps,
  selectArrowProps,
  usePopperScope,
  useSelectContentInject,
  useSelectInject,
} from './props'
import type { SelectArrowElement } from './types'

const SelectArrow = defineComponent({
  name: ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...selectArrowProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuSelect, ...arrowProps } = toRefs(props)

    const popperScope = usePopperScope(scopeOkuSelect)
    const selectInject = useSelectInject(ARROW_NAME, scopeOkuSelect.value)
    const contentInject = useSelectContentInject(
      ARROW_NAME,
      scopeOkuSelect.value,
    )

    const forwardedRef = useForwardRef()

    return () =>
      selectInject.open.value && contentInject.position?.value === 'popper'
        ? h(OkuPopperArrow, {
          ...popperScope,
          ...mergeProps(attrs, arrowProps),
          ref: forwardedRef,
        })
        : null
  },
})

export const OkuSelectArrow = SelectArrow as typeof SelectArrow &
(new () => {
  $props: SelectArrowElement
})
