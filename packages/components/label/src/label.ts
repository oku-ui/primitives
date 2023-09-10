import { defineComponent, h, mergeProps } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type LabelNaviteElement = OkuElement<'label'>
export type LabelElement = HTMLLabelElement

export interface LabelProps extends PrimitiveProps {}

const NAME = 'OkuLabel'

const label = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    mousedown: (event: MouseEvent) => true,
  },
  setup(props, { attrs, slots, emit }) {
    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.label, {
      ...mergeProps(attrs, props),
      ref: forwardedRef,
      asChild: props.asChild,
      onMousedown: (event: MouseEvent) => {
        emit('mousedown', event)
        // prevent text selection when double clicking label
        if (!event.defaultPrevented && event.detail > 1)
          event.preventDefault()
      },
    },
    {
      default: () => slots.default?.(),
    })
    return originalReturn
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuLabel = label as typeof label &
(new () => {
  $props: LabelNaviteElement
})
