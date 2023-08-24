import { defineComponent, h } from 'vue'
import type { ElementType } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useForwardRef } from '@oku-ui/use-composable'
import type { DismissableLayerProps as OkuDismissableLayerProps } from '@oku-ui/dismissable-layer'
import type { PopperContentProps as OkuPopperContentProps } from '@oku-ui/popper'
import { createTooltipProvide } from './utils'

const TOOLTIP_NAME = 'OkuTooltipContentImpl'

const [visuallyHiddenContentProvider, useVisuallyHiddenContentInject]
  = createTooltipProvide(TOOLTIP_NAME, { isInside: false })

export type LabelIntrinsicElement = ElementType<'label'>
export type LabelElement = HTMLLabelElement

type DismissableLayerProps = OkuDismissableLayerProps
type PopperContentProps = OkuPopperContentProps
const test: DismissableLayerProps = {

}

const tooltipContentImpl = defineComponent({
  name: TOOLTIP_NAME,
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
export const OkuTooltipContentImpl = tooltipContentImpl as typeof tooltipContentImpl &
(new () => {
  $props: Partial<LabelElement>
})
