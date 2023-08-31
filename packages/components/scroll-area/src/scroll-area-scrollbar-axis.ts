import { defineComponent, h, toRefs, watchEffect } from 'vue'
import { composeEventHandlers } from '@Oku-ui/utils'
import { OkuPresence } from '@Oku-ui/presence'
import { useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { useStateMachine } from './useStateMachine'
import { scopedProps } from './types'
import { useDebounceCallback } from './utils'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { useScrollAreaContext } from './scroll-area'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleIntrinsicElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'

const SCROLL_NAME = 'Scroll'

export type ScrollAreaScrollbarScrollIntrinsicElement = ScrollAreaScrollbarVisibleIntrinsicElement
type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement

interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarScrollProps = {
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
    ...scrollAreaScrollbarScrollProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaScrollbarScrollAttrs } = attrs as ScrollAreaScrollbarScrollIntrinsicElement

    const forwardedRef = useForwardRef()

    const { forceMount } = toRefs(props)

    const context = useScrollAreaContext(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const isHorizontal = props.orientation === 'horizontal'
    const [state, send] = useStateMachine('hidden', {
      hidden: {
        SCROLL: 'scrolling',
      },
      scrolling: {
        SCROLL_END: 'idle',
        POINTER_ENTER: 'interacting',
      },
      interacting: {
        SCROLL: 'interacting',
        POINTER_LEAVE: 'idle',
      },
      idle: {
        HIDE: 'hidden',
        SCROLL: 'scrolling',
        POINTER_ENTER: 'interacting',
      },
    })
    const debounceScrollEnd = useDebounceCallback(() => send('SCROLL_END'), 100)

    watchEffect((onInvalidate) => {
      if (state === 'idle') {
        const hideTimer = window.setTimeout(() => send('HIDE'), context.scrollHideDelay)

        onInvalidate(() => window.clearTimeout(hideTimer))
      }
    })

    watchEffect((onInvalidate) => {
      const viewport = context.viewport
      const scrollDirection = isHorizontal ? 'scrollLeft' : 'scrollTop'

      if (viewport) {
        let prevScrollPos = viewport[scrollDirection]
        const handleScroll = () => {
          const scrollPos = viewport[scrollDirection]
          const hasScrollInDirectionChanged = prevScrollPos !== scrollPos
          if (hasScrollInDirectionChanged) {
            send('SCROLL')
            debounceScrollEnd()
          }
          prevScrollPos = scrollPos
        }
        viewport.addEventListener('scroll', handleScroll)

        onInvalidate(() => viewport.removeEventListener('scroll', handleScroll))
      }
    })

    const originalReturn = () =>
      h(
        OkuPresence,
        {
          present: forceMount.value || state !== 'hidden',
        },
        h(
          OkuScrollAreaScrollbarVisible,
          {

            'data-state': state === 'hidden' ? 'hidden' : 'visible',
            ...scrollAreaScrollbarScrollAttrs,
            'ref': forwardedRef,
            'onPointerEnter': composeEventHandlers(props.onPointerEnter, () => send('POINTER_ENTER')),
            'onPointerLeave': composeEventHandlers(props.onPointerLeave, () => send('POINTER_LEAVE')),
          },
        ),
      )

    return originalReturn
  },
})

export const OkuScrollAreaScrollbarScroll = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: Partial<ScrollAreaScrollbarScrollElement> })

export type { ScrollAreaScrollbarScrollElement, ScrollAreaScrollbarScrollProps }
