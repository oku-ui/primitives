import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'

import { OkuScrollAreaScrollbarY } from './scroll-area-scrollbar-axis-y'
import { OkuScrollAreaScrollbarX } from './scroll-area-scrollbar-axis-x'
import type { Direction, Sizes } from './utils'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio } from './utils'
import type { ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaThumbElement } from './props'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_VISIBLE_NAME, scopedScrollAreaProps, scrollAreaScrollbarVisibleProps, useScrollAreaInject } from './props'

const scrollAreaScrollbarVisible = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_VISIBLE_NAME,
  components: {
    OkuScrollAreaScrollbarX,
    OkuScrollAreaScrollbarY,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarVisibleProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaScrollbarVisibleProps.emits,
  setup(props, { attrs, slots }) {
    const {
      orientation,
      ...scrollAreaScrollbarVisibleProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarVisibleProps)
    const reactiveScrollAreaScrollbarVisibleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const thumbRef = ref<ScrollAreaThumbElement | null>(null)
    const pointerOffsetRef = ref(0)
    const sizes = reactive<Sizes>({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
    })
    const thumbRatio = computed(() => getThumbRatio(sizes.viewport, sizes.content))

    function getScrollPosition(pointerPos: number, dir?: Direction) {
      return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.value, sizes, dir)
    }

    return () => {
      if (orientation.value === 'horizontal') {
        return h(OkuScrollAreaScrollbarX,
          {
            ...mergeProps(attrs, reactiveScrollAreaScrollbarVisibleProps),
            sizes,
            onSizesChange: (_sizes: Sizes) => {
              sizes.content = _sizes.content
              sizes.viewport = _sizes.viewport
              sizes.scrollbar = _sizes.scrollbar
            },
            hasThumb: computed(() => Boolean(thumbRatio.value > 0 && thumbRatio.value < 1)).value,
            onThumbChange: thumb => (thumbRef.value = thumb),
            onThumbPointerUp: () => (pointerOffsetRef.value = 0),
            onThumbPointerDown: (pointerPos: number) => (pointerOffsetRef.value = pointerPos),

            ref: forwardedRef,
            onThumbPositionChange: () => {
              if (inject.viewport.value && thumbRef.value) {
                const scrollPos = inject.viewport.value.scrollLeft
                const offset = getThumbOffsetFromScroll(scrollPos, sizes, inject.dir.value)
                thumbRef.value.style.transform = `translate3d(${offset}px, 0, 0)`
              }
            },
            onWheelScroll: (scrollPos: number) => {
              if (inject.viewport.value)
                inject.viewport.value.scrollLeft = scrollPos
            },
            onDragScroll: (pointerPos: number) => {
              if (inject.viewport.value)
                inject.viewport.value.scrollLeft = getScrollPosition(pointerPos, inject.dir.value)
            },
          }, slots,
        )
      }

      if (orientation.value === 'vertical') {
        return h(OkuScrollAreaScrollbarY,
          {
            ...mergeProps(attrs, reactiveScrollAreaScrollbarVisibleProps),
            sizes,
            onSizesChange: (_sizes: Sizes) => {
              sizes.content = _sizes.content
              sizes.viewport = _sizes.viewport
              sizes.scrollbar = _sizes.scrollbar
            },
            hasThumb: computed(() => Boolean(thumbRatio.value > 0 && thumbRatio.value < 1)).value,
            onThumbChange: thumb => (thumbRef.value = thumb),
            onThumbPointerUp: () => (pointerOffsetRef.value = 0),
            onThumbPointerDown: (pointerPos: number) => (pointerOffsetRef.value = pointerPos),
            ref: forwardedRef,
            onThumbPositionChange: () => {
              if (inject.viewport.value && thumbRef.value) {
                const scrollPos = inject.viewport.value.scrollTop
                const offset = getThumbOffsetFromScroll(scrollPos, sizes)
                thumbRef.value.style.transform = `translate3d(0, ${offset}px, 0)`
              }
            },
            onWheelScroll: (scrollPos: number) => {
              if (inject.viewport.value)
                inject.viewport.value.scrollTop = scrollPos
            },
            onDragScroll: (pointerPos: number) => {
              if (inject.viewport.value)
                inject.viewport.value.scrollTop = getScrollPosition(pointerPos)
            },
          }, slots,
        )
      }
    }
  },
})

export const OkuScrollAreaScrollbarVisible = scrollAreaScrollbarVisible as typeof scrollAreaScrollbarVisible &
(new () => { $props: ScrollAreaScrollbarVisibleNaviteElement })
