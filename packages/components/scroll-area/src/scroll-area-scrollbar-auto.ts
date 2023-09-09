import { defineComponent, h, ref, toRefs } from 'vue'
import { OkuPresence } from '@Oku-ui/presence'
import { useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedScrollAreaProps } from './types'
import { useDebounceCallback, useResizeObserver } from './utils'
import { OkuScrollAreaScrollbarVisible, scrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { useScrollAreaInject } from './scroll-area'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'

const SCROLL_NAME = 'OkuScrollAreaScrollbarAuto'

export type ScrollAreaScrollbarAutoNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarAutoProps = {
  props: {
    forceMount: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: {},
}

const scrollAreaScrollbarScroll = defineComponent({
  name: SCROLL_NAME,
  components: {
    OkuPresence,
    OkuScrollAreaScrollbarVisible,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarAutoProps.props,
    ...scrollAreaScrollbarVisibleProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarAutoProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaScrollbarAutoAttrs } = attrs as ScrollAreaScrollbarAutoNaviteElement

    const forwardedRef = useForwardRef()

    const {
      forceMount,
      orientation,
    } = toRefs(props)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const visible = ref(false)
    const isHorizontal = orientation.value === 'horizontal'
    const handleResize = useDebounceCallback(() => {
      if (inject.viewport) {
        const isOverflowX = inject.viewport.offsetWidth < inject.viewport.scrollWidth
        const isOverflowY = inject.viewport.offsetHeight < inject.viewport.scrollHeight
        visible.value = isHorizontal ? isOverflowX : isOverflowY
      }
    }, 10)

    useResizeObserver(inject.viewport, handleResize)
    useResizeObserver(inject.content, handleResize)

    return () => h(OkuPresence,
      {
        present: forceMount.value || visible.value,
      },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {

            ['data-state' as any]: visible.value ? 'visible' : 'hidden',
            ...attrs,
            ref: forwardedRef,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarAuto = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: Partial<ScrollAreaScrollbarAutoElement> })
