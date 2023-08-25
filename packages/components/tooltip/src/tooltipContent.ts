import { defineComponent, h } from 'vue'
import type { ElementType, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'

export type LabelIntrinsicElement = ElementType<'label'>
export type LabelElement = HTMLLabelElement

interface TooltipContentProps extends TooltipContentImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const CONTENT_NAME = 'OkuTooltipContent'

const tooltipContent = defineComponent({
  name: CONTENT_NAME,
  inheritAttrs: false,
  props: {
    ...primitiveProps,
  },
  setup(props, { attrs, slots }) {
    const { ...restAttrs } = attrs as LabelIntrinsicElement

    const forwardedRef = useForwardRef()

    const originalReturn = () => h(Primitive.label, {
      ...restAttrs,
      ref: forwardedRef,
      asChild: props.asChild,
      onMousedown: (event: MouseEvent) => {
        restAttrs.onMousedown?.(event)
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
export const OkuTooltipContent = tooltipContent as typeof tooltipContent &
(new () => {
  $props: Partial<LabelElement>
})
