import { Primitive, primitiveProps } from '@Oku-ui/primitive'
import type { ElementType, PrimitiveProps } from '@Oku-ui/primitive'
import { defineComponent, h, ref } from 'vue'
import { useForwardRef } from '../../../core/use-composable/dist'
import { scopedProps } from './types'
import { CORNER_NAME } from './scroll-area-corner'
import { useScrollAreaContext } from './scroll-area'

export type ScrollAreaCornerImplIntrinsicElement = ElementType<'div'>
type ScrollAreaCornerImplElement = HTMLDivElement

interface ScrollAreaCornerImplProps extends PrimitiveProps { }

const scrollAreaCornerImpl = defineComponent({
  // name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaCornerImplAttrs } = attrs as ScrollAreaCornerImplIntrinsicElement

    const forwardedRef = useForwardRef()

    const context = useScrollAreaContext(CORNER_NAME, props.scopeOkuScrollArea)
    const width = ref<number>(0)
    const height = ref<number>(0)
    const hasSize = Boolean(width.value && height)

    useResizeObserver(context.scrollbarX, () => {
      const height = context.scrollbarX?.offsetHeight || 0
      context.onCornerHeightChange(height)
      setHeight(height)
      height.value = height
    })

    useResizeObserver(context.scrollbarY, () => {
      const width = context.scrollbarY?.offsetWidth || 0
      context.onCornerWidthChange(width)
      width.value = width
    })

    const originalReturn = () =>
      hasSize
        ? h(
          Primitive.div,
          {
            ...scrollAreaCornerImplAttrs,
            ref: forwardedRef,
            style: {
              width,
              height,
              position: 'absolute',
              right: context.dir === 'ltr' ? 0 : undefined,
              left: context.dir === 'rtl' ? 0 : undefined,
              bottom: 0,
            },
            ...props.scopeOkuScrollArea.style,
          },
        )
        : null

    return originalReturn
  },
})

export const OkuScrollAreaCornerImpl = scrollAreaCornerImpl as typeof scrollAreaCornerImpl &
(new () => { $props: Partial<ScrollAreaCornerImplElement> })

export type { ScrollAreaCornerImplElement, ScrollAreaCornerImplProps }
