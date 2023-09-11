import { computed, defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import type { ScrollAreaCornerImplElement, ScrollAreaCornerImplNaviteElement, ScrollAreaCornerImplProps } from './scroll-area-corner-impl'
import { OkuScrollAreaCornerImpl, scrollAreaCornerImplProps } from './scroll-area-corner-impl'
import { useScrollAreaInject } from './scroll-area'
import { scopedScrollAreaProps } from './types'

export const CORNER_NAME = 'OkuScrollAreaCorner'

export type ScrollAreaCornerNaviteElement = ScrollAreaCornerImplNaviteElement
export type ScrollAreaCornerElement = ScrollAreaCornerImplElement

export interface ScrollAreaCornerProps extends ScrollAreaCornerImplProps {}

const scrollAreaCornerProps = {
  props: {
    ...scrollAreaCornerImplProps.props,
  },
  emits: {
    ...scrollAreaCornerImplProps.emits,
  },
}

const scrollAreaCorner = defineComponent({
  name: CORNER_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaCornerProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaCornerProps.emits,
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(CORNER_NAME, props.scopeOkuScrollArea)
    const hasBothScrollbarsVisible = computed(() => Boolean(inject.scrollbarX.value && inject.scrollbarY.value))
    const hasCorner = computed(() => inject.type.value !== 'scroll' && hasBothScrollbarsVisible.value)

    return () => hasCorner.value
      ? h(OkuScrollAreaCornerImpl,
        {
          ...mergeProps(attrs, props),
          ref: forwardedRef,
        }, slots,
      )
      : null
  },
})

export const OkuScrollAreaCorner = scrollAreaCorner as typeof scrollAreaCorner &
(new () => { $props: ScrollAreaCornerNaviteElement })
