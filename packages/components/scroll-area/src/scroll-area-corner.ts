import { primitiveProps } from '@oku-ui/primitive'
import { defineComponent, h } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { scopedScrollAreaProps } from './types'
import type { ScrollAreaCornerImplElement, ScrollAreaCornerImplNaviteElement, ScrollAreaCornerImplProps } from './scroll-area-corner-impl'
import { OkuScrollAreaCornerImpl } from './scroll-area-corner-impl'
import { useScrollAreaInject } from './scroll-area'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaCorner
 * ----------------------------------------------------------------------------------------------- */

export const CORNER_NAME = 'OkuScrollAreaCorner'

export type ScrollAreaCornerNaviteElement = ScrollAreaCornerImplNaviteElement
export type ScrollAreaCornerElement = ScrollAreaCornerImplElement

export interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps {}

const scrollAreaCornerProps = {
  props: {},
  emits: {},
}

const scrollAreaCorner = defineComponent({
  name: CORNER_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaCornerProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaCornerProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaCornerAttrs } = attrs as ScrollAreaCornerNaviteElement

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(CORNER_NAME, props.scopeOkuScrollArea)
    const hasBothScrollbarsVisible = Boolean(inject.scrollbarX.value && inject.scrollbarY.value)
    const hasCorner = inject.type.value !== 'scroll' && hasBothScrollbarsVisible

    return () => hasCorner
      ? h(OkuScrollAreaCornerImpl,
        {
          ...attrs,
          ref: forwardedRef,
        }, slots,
      )
      : null
  },
})

export const OkuScrollAreaCorner = scrollAreaCorner as typeof scrollAreaCorner &
(new () => { $props: Partial<ScrollAreaCornerElement> })
