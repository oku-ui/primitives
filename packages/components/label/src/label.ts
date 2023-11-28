import { defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { LABEL_NAME, labelProps } from './props'
import type { LabelEmits, LabelNativeElement } from './props'

const label = defineComponent({
  name: LABEL_NAME,
  inheritAttrs: false,
  props: {
    ...labelProps.props,
  },
  emits: {
    ...labelProps.emits,
  },
  setup(props, { attrs, slots, emit }) {
    const forwardedRef = useForwardRef()

    return () => h(Primitive.label, {
      ...attrs,
      ref: forwardedRef,
      asChild: props.asChild,
      onMousedown: (event: LabelEmits['mousedown'][0]) => {
        emit('mousedown', event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    }, () => slots.default?.())
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuLabel = label as typeof label & (new () => { $props: LabelNativeElement })
