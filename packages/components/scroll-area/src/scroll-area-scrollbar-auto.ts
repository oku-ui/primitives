import { defineComponent, h, ref, toRefs } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
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

export const scrollAreaScrollbarAutoProps = {
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
      if (inject.viewport.value) {
        const isOverflowX = inject.viewport.value.offsetWidth < inject.viewport.value.scrollWidth
        const isOverflowY = inject.viewport.value.offsetHeight < inject.viewport.value.scrollHeight
        visible.value = isHorizontal ? isOverflowX : isOverflowY
      }
    }, 10)

    useResizeObserver(inject.viewport.value, handleResize)
    useResizeObserver(inject.content.value, handleResize)

    return () => h(OkuPresence,
      {
        present: forceMount.value || visible.value,
      },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {

            ['data-state' as string]: visible.value ? 'visible' : 'hidden',
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
