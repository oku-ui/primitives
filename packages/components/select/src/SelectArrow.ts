import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { OkuPopperArrow } from '@oku-ui/popper'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import {
  ARROW_NAME,
  scopeSelectProps,
  selectArrowProps,
  usePopperScope,
  useSelectContentInject,
  useSelectInject,
} from './props'
import type { SelectArrowNativeElement } from './props'

const SelectArrow = defineComponent({
  name: ARROW_NAME,
  inheritAttrs: false,
  props: {
    ...selectArrowProps.props,
    ...scopeSelectProps,
  },
  setup(props, { attrs }) {
    const { scopeOkuSelect, ...propsRefs } = toRefs(props)
    const _reactive = reactive(propsRefs)
    const reactivePropsRefs = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const popperScope = usePopperScope(scopeOkuSelect.value)
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
          ...mergeProps(attrs, reactivePropsRefs),
          ref: forwardedRef,
        })
        : null
  },
})

export const OkuSelectArrow = SelectArrow as typeof SelectArrow &
(new () => {
  $props: SelectArrowNativeElement
})
