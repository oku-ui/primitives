import type { PropType } from 'vue'
import { defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { composeEventHandlers } from '@oku-ui/utils'
import { OkuPresence } from '@oku-ui/presence'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { useStateMachine } from './useStateMachine'
import { scopedScrollAreaProps } from './types'
import { useDebounceCallback } from './utils'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarVisible, scrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { useScrollAreaInject } from './scroll-area'

const SCROLL_NAME = 'OkuScrollAreaScrollbarScroll'

export type ScrollAreaScrollbarScrollNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarScrollProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<boolean | undefined>,
      required: false,
    },
    ...scrollAreaScrollbarVisibleProps.props,
  },
  emits: {
    ...scrollAreaScrollbarVisibleProps.emits,
  },
}

const scrollAreaScrollbarScroll = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarScrollProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaScrollbarScrollProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      forceMount,
      ...scrollbarProps
    } = toRefs(props)
    const _reactive = reactive(scrollbarProps)
    const reactiveScrollbarProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const forwardedRef = useForwardRef()
    const isHorizontal = _reactive.orientation === 'horizontal'
    const { state, dispatch: send } = useStateMachine('hidden', {
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
      if (state.value === 'idle') {
        const hideTimer = window.setTimeout(() => send('HIDE'), inject.scrollHideDelay.value)

        onInvalidate(() => window.clearTimeout(hideTimer))
      }
    })

    watchEffect((onInvalidate) => {
      const viewport = inject.viewport.value
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

    return () => h(OkuPresence,
      {
        present: forceMount.value || state.value !== 'hidden',
      },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {
            'data-state': state.value === 'hidden' ? 'hidden' : 'visible',
            ...mergeProps(attrs, reactiveScrollbarProps),
            'ref': forwardedRef,
            'onpointerenter': composeEventHandlers(() => {
              emit('pointerEnter', send('POINTER_ENTER'))
            }),
            'onpointerleave': composeEventHandlers(() => {
              emit('pointerLeave', send('POINTER_LEAVE'))
            }),
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarScroll = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: ScrollAreaScrollbarScrollElement })
