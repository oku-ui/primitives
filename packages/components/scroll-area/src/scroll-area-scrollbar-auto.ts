import { defineComponent, h, ref, toRefs } from 'vue'
import { OkuPresence } from '@Oku-ui/presence'
import { useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedProps } from './types'
import { useDebounceCallback } from './utils'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleIntrinsicElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { useScrollAreaContext } from './scroll-area'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'

const SCROLL_NAME = 'Auto'

export type ScrollAreaScrollbarAutoIntrinsicElement = ScrollAreaScrollbarVisibleIntrinsicElement
type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement

interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarAutoProps = {
  forceMount: {
    type: Boolean,
    required: false,
    default: true,
  },
}

const scrollAreaScrollbarScroll = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarAutoProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaScrollbarAutoAttrs } = attrs as ScrollAreaScrollbarAutoIntrinsicElement

    const forwardedRef = useForwardRef()

    const { forceMount } = toRefs(props)

    const context = useScrollAreaContext(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const visible = ref(false)
    const isHorizontal = props.orientation === 'horizontal'
    const handleResize = useDebounceCallback(() => {
      if (context.viewport) {
        const isOverflowX = context.viewport.offsetWidth < context.viewport.scrollWidth
        const isOverflowY = context.viewport.offsetHeight < context.viewport.scrollHeight
        visible.value = isHorizontal ? isOverflowX : isOverflowY
      }
    }, 10)

    useResizeObserver(context.viewport, handleResize)
    useResizeObserver(context.content, handleResize)

    const originalReturn = () =>
      h(
        OkuPresence,
        {
          present: forceMount.value || visible.value,
        },
        h(
          'ScrollAreaScrollbarVisible',
          {

            'data-state': visible.value ? 'visible' : 'hidden',
            ...scrollAreaScrollbarAutoAttrs,
            'ref': forwardedRef,
          },
        ),
      )

    return originalReturn
  },
})

export const OkuScrollAreaScrollbarAuto = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: Partial<ScrollAreaScrollbarAutoElement> })

export type { ScrollAreaScrollbarAutoElement, ScrollAreaScrollbarAutoProps }
