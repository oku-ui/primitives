import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { OkuPresence } from '@oku-ui/presence'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarVisible, scrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { useScrollAreaInject } from './scroll-area'
import { useDebounceCallback, useResizeObserver } from './utils'
import { scopedScrollAreaProps } from './types'

const SCROLL_NAME = 'OkuScrollAreaScrollbarAuto'

export type ScrollAreaScrollbarAutoNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarAutoElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarAutoProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

export const scrollAreaScrollbarAutoProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
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
    const {
      scopeOkuScrollArea,
      forceMount,
      orientation,
      ...scrollAreaScrollbarAutoProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarAutoProps)
    const reactiveScrollAreaScrollbarAutoProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
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
      { present: computed(() => forceMount.value || visible.value).value },
      {
        default: () => h(OkuScrollAreaScrollbarVisible,
          {
            ['data-state' as string]: visible.value ? 'visible' : 'hidden',
            ...mergeProps(attrs, reactiveScrollAreaScrollbarAutoProps),
            ref: forwardedRef,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarAuto = scrollAreaScrollbarScroll as typeof scrollAreaScrollbarScroll &
(new () => { $props: Partial<ScrollAreaScrollbarAutoElement> })
