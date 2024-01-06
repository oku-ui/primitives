import { defineComponent, h, mergeProps } from 'vue'
import { useForwardRef, useListeners } from '@oku-ui/use-composable'
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
    const emits = useListeners(['onMousedown'])

    return () => h(Primitive.label, {
      ...mergeProps(attrs, emits),
      asChild: props.asChild,
      ref: forwardedRef,
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
