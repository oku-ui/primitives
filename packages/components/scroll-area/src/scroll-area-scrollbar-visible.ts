import type { PropType } from 'vue'
import { defineComponent, reactive, ref, toRefs } from 'vue'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedProps } from './types'
import { getScrollPositionFromPointer, getThumbRatio } from './utils'
import type { Direction, Sizes } from './scroll-area'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'

const SCROLL_NAME = 'Visible'

export type ScrollAreaScrollbarVisibleIntrinsicElement = ScrollAreaScrollbarAxisIntrinsicElement
type ScrollAreaScrollbarVisibleElement = ScrollAreaScrollbarAxisElement

interface ScrollAreaScrollbarVisibleProps
  extends Omit<ScrollAreaScrollbarAxisProps, keyof ScrollAreaScrollbarAxisPrivateProps> {
  orientation?: 'horizontal' | 'vertical'
}
const scrollAreaScrollbarVisibleProps = {
  orientation: {
    type: String as PropType<ScrollAreaScrollbarVisibleProps>,
    required: false,
    default: 'vertical',
  },
}

const scrollAreaScrollbarVisible = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarVisibleProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaScrollbarVisibleAttrs } = attrs as ScrollAreaScrollbarVisibleIntrinsicElement

    // const forwardedRef = useForwardRef()

    const {
      orientation,
    } = toRefs(props)

    const context = useScrollAreaContext(SCROLLBAR_NAME, props.scopeOkuScrollArea)
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
      ...scrollAreaScrollbarVisibleAttrs,
      sizes,
      onSizesChange: setSizes,
      hasThumb: Boolean(thumbRatio > 0 && thumbRatio < 1),
      onThumbChange: thumb => (thumbRef.value = thumb),
      onThumbPointerUp: () => (pointerOffsetRef.value = 0),
      onThumbPointerDown: pointerPos => (pointerOffsetRef.value = pointerPos),
    }

    function getScrollPosition(pointerPos: number, dir?: Direction) {
      return getScrollPositionFromPointer(pointerPos, pointerOffsetRef.value, sizes, dir)
    }

    // const originalReturn = () =>

    // return originalReturn
  },
})

export const OkuScrollAreaScrollbarVisible = scrollAreaScrollbarVisible as typeof scrollAreaScrollbarVisible &
(new () => { $props: Partial<ScrollAreaScrollbarVisibleElement> })

export type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleProps }
