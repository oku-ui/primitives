import { computed, defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'
import { composeEventHandlers } from '@oku-ui/utils'
import { useStateMachine } from './useStateMachine'
import { useDebounceCallback } from './utils'
import type { ScrollAreaScrollbarScrollEmits, ScrollAreaScrollbarScrollNaviteElement } from './props'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_SCROLL_NAME, scopedScrollAreaProps, scrollAreaScrollbarScrollProps, useScrollAreaInject } from './props'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'

const scrollAreaScrollbarScroll = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_SCROLL_NAME,
  components: {
    OkuPresence,
    OkuScrollAreaScrollbarVisible,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarScrollProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaScrollbarScrollProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      forceMount,
      ...scrollAreaScrollbarScrollProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarScrollProps)
    const reactiveScrollAreaScrollbarScrollProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const isHorizontal = computed(() => _reactive.orientation === 'horizontal')
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
      const scrollDirection = isHorizontal.value ? 'scrollLeft' : 'scrollTop'

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
            'data-state': state.value === 'hidden' ? 'hidden' : 'visible',
            ...mergeProps(attrs, reactiveScrollAreaScrollbarScrollProps),
            'ref': forwardedRef,
            'onpointerenter': composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerenter'][0]>((event) => {
              emit('pointerenter', event)
            }, () => send('POINTER_ENTER')),
            'onpointerleave': composeEventHandlers<ScrollAreaScrollbarScrollEmits['pointerleave'][0]>((event) => {
              emit('pointerleave', event)
            }, () => send('POINTER_LEAVE')),
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarScroll = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: ScrollAreaScrollbarScrollNaviteElement })
