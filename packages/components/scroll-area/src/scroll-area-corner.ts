import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h } from 'vue'
import { useForwardRef } from '../../../core/use-composable/dist'
import { scopedProps } from './types'
import type { ScrollAreaCornerImplElement, ScrollAreaCornerImplIntrinsicElement, ScrollAreaCornerImplProps } from './scroll-area-corner-impl'
import { OkuScrollAreaCornerImpl } from './scroll-area-corner-impl'
import { useScrollAreaContext } from './scroll-area'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCorner
 * ----------------------------------------------------------------------------------------------- */

export const CORNER_NAME = 'ScrollAreaCorner'

export type ScrollAreaCornerIntrinsicElement = ScrollAreaCornerImplIntrinsicElement
type ScrollAreaCornerElement = ScrollAreaCornerImplElement

interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps {}

const scrollAreaCorner = defineComponent({
  name: CORNER_NAME,
  inheritAttrs: false,
  props: {
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaCornerAttrs } = attrs as ScrollAreaCornerIntrinsicElement

    const forwardedRef = useForwardRef()

    const context = useScrollAreaContext(CORNER_NAME, props.scopeOkuScrollArea)
    const hasBothScrollbarsVisible = Boolean(context.scrollbarX && context.scrollbarY)
    const hasCorner = context.type !== 'scroll' && hasBothScrollbarsVisible

    const originalReturn = () =>
      hasCorner
        ? h(OkuScrollAreaCornerImpl,
          {
            ...scrollAreaCornerAttrs,
            ref: forwardedRef,
          },
        )
        : null

    return originalReturn
  },
})

export const OkuScrollAreaCorner = scrollAreaCorner as typeof scrollAreaCorner &
(new () => { $props: Partial<ScrollAreaCornerElement> })

export type { ScrollAreaCornerElement, ScrollAreaCornerProps }
