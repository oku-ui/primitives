import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { ICON_NAME, scopeSelectProps, selectIconProps } from './props'
import type { SelectIconNativeElement } from './props'

const SelectIcon = defineComponent({
  name: ICON_NAME,
  inheritAttrs: false,
  props: {
    ...selectIconProps.props,
    ...scopeSelectProps,
  },
  setup(props, { slots, attrs }) {
    const { scopeOkuSelect: _scope, ...iconProps } = toRefs(props)

    const _reactive = reactive(iconProps)
    const _valueProps = reactiveOmit(
      _reactive,
      (key, _value) => key === undefined,
    )

    const selectIconRef = ref<HTMLSpanElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, selectIconRef)

    return () =>
      h(
        Primitive.span,
        {
          'aria-hidden': true,
          ...mergeProps(attrs, _valueProps),
          'ref': composedRefs,
        },
        {
          default: slots.default ? slots.default() : '▼',
        },
      )
  },
})

export const OkuSelectIcon = SelectIcon as typeof SelectIcon &
(new () => {
  $props: SelectIconNativeElement
})
