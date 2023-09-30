import { defineComponent, h, mergeProps, ref, toRefs } from 'vue'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
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
    const { scopeOkuSelect, ...iconProps } = toRefs(props)

    const selectIconRef = ref<HTMLSpanElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, selectIconRef)

    return () =>
      h(
        Primitive.span,
        {
          'ref': composedRefs,
          'aria-hidden': true,
          ...mergeProps(attrs, iconProps),
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
