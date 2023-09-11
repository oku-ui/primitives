import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuPresence } from '@oku-ui/presence'

import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'

import { useDebounceCallback, useResizeObserver } from './utils'
import type { ScrollAreaScrollbarAutoNaviteElement } from './props'
import { SCROLL_AREA_SCROLLBAR_AUTO_NAME, SCROLL_AREA_SCROLLBAR_NAME, scopedScrollAreaProps, scrollAreaScrollbarAutoProps, useScrollAreaInject } from './props'

const scrollAreaScrollbarAuto = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_AUTO_NAME,
  components: {
    OkuPresence,
    OkuScrollAreaScrollbarVisible,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarAutoProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaScrollbarAutoProps.emits,
  setup(props, { attrs, slots }) {
    const {
      forceMount,
      ...scrollAreaScrollbarAutoProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarAutoProps)
    const reactiveScrollAreaScrollbarAutoProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const visible = ref(false)
    const isHorizontal = _reactive.orientation === 'horizontal'
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
      { present: computed(() => forceMount.value || visible.value).value },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {
            'data-state': visible.value ? 'visible' : 'hidden',
            ...mergeProps(attrs, reactiveScrollAreaScrollbarAutoProps),
            'ref': forwardedRef,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarAuto = scrollAreaScrollbarAuto as typeof scrollAreaScrollbarAuto &
(new () => { $props: ScrollAreaScrollbarAutoNaviteElement })
