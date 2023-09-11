import type { PropType } from 'vue'
import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { useScrollAreaInject } from './scroll-area'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import type { ScrollAreaScrollbarAxisElement, ScrollAreaScrollbarAxisNaviteElement, ScrollAreaScrollbarAxisPrivateProps, ScrollAreaScrollbarAxisProps } from './share'
import { OkuScrollAreaScrollbarY } from './scroll-area-scrollbar-axis-y'
import { OkuScrollAreaScrollbarX } from './scroll-area-scrollbar-axis-x'
import type { Direction, Sizes } from './utils'
import { getScrollPositionFromPointer, getThumbOffsetFromScroll, getThumbRatio } from './utils'
import { scopedScrollAreaProps } from './types'

const SCROLL_NAME = 'OkuScrollAreaScrollbarVisible'

export type ScrollAreaScrollbarVisibleNaviteElement = ScrollAreaScrollbarAxisNaviteElement
export type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement

export interface ScrollAreaScrollbarVisibleProps extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
  orientation?: 'horizontal' | 'vertical'
}

export const scrollAreaScrollbarVisibleProps = {
  props: {
    orientation: {
      type: String as PropType<ScrollAreaScrollbarVisibleProps['orientation']>,
      required: false,
      default: 'vertical',
    },
  },
  emits: {},
}

const scrollAreaScrollbarVisible = defineComponent({
  name: SCROLL_NAME,
  components: {
    OkuScrollAreaScrollbarX,
    OkuScrollAreaScrollbarY,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarVisibleProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarVisibleProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuScrollArea,
      orientation,
      ...scrollAreaScrollbarVisibleProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarVisibleProps)
    const reactiveScrollAreaScrollbarVisibleProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
    const thumbRef = ref<ScrollAreaThumbElement | null>(null)
    const pointerOffsetRef = ref(0)
    const sizes = reactive<Sizes>({
      content: 0,
      viewport: 0,
      scrollbar: { size: 0, paddingStart: 0, paddingEnd: 0 },
    })
    const thumbRatio = getThumbRatio(sizes.viewport, sizes.content)

    type UncommonProps = 'onThumbPositionChange' | 'onDragScroll' | 'onWheelScroll'

    const commonProps: Omit<ScrollAreaScrollbarAxisPrivateProps, UncommonProps> = {
      ...mergeProps(attrs, reactiveScrollAreaScrollbarVisibleProps),
      sizes,
      onSizesChange: (_sizes: Sizes) => {
        sizes.content = _sizes.content
        sizes.viewport = _sizes.viewport
        sizes.scrollbar = _sizes.scrollbar
      },
      hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
      onThumbChange: (thumb: ScrollAreaThumbElement) => (thumbRef.value = thumb),
      onThumbPointerUp: () => (pointerOffsetRef.value = 0),
      onThumbPointerDown: (pointerPos: number) => (pointerOffsetRef.value = pointerPos),
    }

    function getScrollPosition(pointerPos: number, dir?: Direction) {
      return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.value, sizes, dir)
    }

    return () => {
      if (orientation.value === 'horizontal') {
        return () => h(OkuScrollAreaScrollbarX,
          {
            ...commonProps,
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
        return () => h(OkuScrollAreaScrollbarY,
          {
            ...commonProps,
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
(new () => { $props: Partial<ScrollAreaScrollbarVisibleElement> })
