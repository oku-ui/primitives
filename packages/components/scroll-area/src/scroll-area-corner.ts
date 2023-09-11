import { defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import type { ScrollAreaCornerImplElement, ScrollAreaCornerImplNaviteElement, ScrollAreaCornerImplProps } from './scroll-area-corner-impl'
import { OkuScrollAreaCornerImpl } from './scroll-area-corner-impl'
import { useScrollAreaInject } from './scroll-area'
import { scopedScrollAreaProps } from './types'

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
    const {
      scopeOkuScrollArea,
      ...scrollAreaCornerProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaCornerProps)
    const reactiveScrollAreaCornerProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(CORNER_NAME, scopeOkuScrollArea.value)
    const hasBothScrollbarsVisible = Boolean(inject.scrollbarX.value && inject.scrollbarY.value)
    const hasCorner = inject.type.value !== 'scroll' && hasBothScrollbarsVisible

    return () => hasCorner
      ? h(OkuScrollAreaCornerImpl,
        {
          ...mergeProps(attrs, reactiveScrollAreaCornerProps),
          ref: forwardedRef,
        }, slots,
      )
      : null
  },
})

export const OkuScrollAreaCorner = scrollAreaCorner as typeof scrollAreaCorner &
(new () => { $props: Partial<ScrollAreaCornerElement> })
