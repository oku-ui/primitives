import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { OkuPresence } from '@Oku-ui/presence'
import { composeEventHandlers } from '@Oku-ui/utils'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarVisible, scrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { useScrollAreaInject } from './scroll-area'
import { useStateMachine } from './useStateMachine'
import { useDebounceCallback } from './utils'
import { scopedScrollAreaProps } from './types'

const SCROLL_NAME = 'OkuScrollAreaScrollbarScroll'

export type ScrollAreaScrollbarScrollNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarScrollElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarScrollProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

export type ScrollAreaScrollbarScrollEmits = {
  pointerenter: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}

const scrollAreaScrollbarScrollProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerenter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
  },
}

const scrollAreaScrollbarScroll = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarScrollProps.props,
    ...scrollAreaScrollbarVisibleProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarScrollProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuScrollArea,
      forceMount,
      orientation,
      ...scrollAreaScrollbarScrollProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarScrollProps)
    const reactiveScrollAreaScrollbarScrollProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
    const isHorizontal = orientation.value === 'horizontal'
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
      { present: computed(() => forceMount.value || state.value !== 'hidden').value },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {
            ['data-state' as string]: state.value === 'hidden' ? 'hidden' : 'visible',
            ...mergeProps(attrs, reactiveScrollAreaScrollbarScrollProps),
            ref: forwardedRef,
            onPointerEnter: composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerenter'][0]>((event) => {
              emit('pointerenter', event)
            }, () => send('POINTER_ENTER')),
            onPointerLeave: composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerleave'][0]>((event) => {
              emit('pointerleave', event)
            }, () => send('POINTER_LEAVE')),
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarScroll = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: Partial<ScrollAreaScrollbarScrollElement> })
