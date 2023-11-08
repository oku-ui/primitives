import { computed, defineComponent, h, mergeProps } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { OkuScrollAreaCornerImpl } from './scroll-area-corner-impl'
import type { ScrollAreaCornerNaviteElement } from './props'
import { SCROLL_AREA_CORNER_NAME, scopedScrollAreaProps, scrollAreaCornerProps, useScrollAreaInject } from './props'

const scrollAreaCorner = defineComponent({
  name: SCROLL_AREA_CORNER_NAME,
  components: {
    OkuScrollAreaCornerImpl,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaCornerProps.props,
    ...scopedScrollAreaProps,
  },
  setup(props, { attrs, slots }) {
    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_CORNER_NAME, props.scopeOkuScrollArea)
    const hasBothScrollbarsVisible = computed(() => Boolean(inject.scrollbarX.value && inject.scrollbarY.value))
    const hasCorner = computed(() => inject.type.value !== 'scroll' && hasBothScrollbarsVisible.value)

    return () => hasCorner.value
      ? h(OkuScrollAreaCornerImpl, {
        ...mergeProps(attrs, props),
        ref: forwardedRef,
      }, slots)
      : null
  },
})

export const OkuScrollAreaCorner = scrollAreaCorner as typeof scrollAreaCorner &
(new () => { $props: ScrollAreaCornerNaviteElement })
