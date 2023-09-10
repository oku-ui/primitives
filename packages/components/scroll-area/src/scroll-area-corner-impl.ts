import { Primitive, primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { defineComponent, h, ref } from 'vue'
import { useForwardRef } from '@oku-ui/use-composable'
import { scopedScrollAreaProps } from './types'
import { CORNER_NAME } from './scroll-area-corner'
import { useScrollAreaInject } from './scroll-area'
import { useResizeObserver } from './utils'

export type ScrollAreaCornerImplNaviteElement = OkuElement<'div'>
export type ScrollAreaCornerImplElement = HTMLDivElement

export interface ScrollAreaCornerImplProps extends PrimitiveProps { }

const scrollAreaCornerImplProps = {
  props: {},
  emits: {},
}

const scrollAreaCornerImpl = defineComponent({
  name: CORNER_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaCornerImplProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaCornerImplProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaCornerImplAttrs } = attrs as ScrollAreaCornerImplNaviteElement

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(CORNER_NAME, props.scopeOkuScrollArea)
    const width = ref<number>(0)
    const height = ref<number>(0)
    const hasSize = Boolean(width.value && height.value)

    useResizeObserver(inject.scrollbarX.value, () => {
      const _height = inject.scrollbarX.value?.offsetHeight || 0
      inject.onCornerHeightChange(_height)
      height.value = _height
    })

    useResizeObserver(inject.scrollbarY.value, () => {
      const _width = inject.scrollbarY.value?.offsetWidth || 0
      inject.onCornerWidthChange(_width)
      width.value = _width
    })

    return () => hasSize
      ? h(Primitive.div,
        {
          ...attrs,
          ref: forwardedRef,
          style: {
            width: width.value,
            height: height.value,
            position: 'absolute',
            right: inject.dir.value === 'ltr' ? 0 : undefined,
            left: inject.dir.value === 'rtl' ? 0 : undefined,
            bottom: 0,
            ...attrs.style as CSSStyleRule,
          },
        }, slots,
      )
      : null
  },
})

export const OkuScrollAreaCornerImpl = scrollAreaCornerImpl as typeof scrollAreaCornerImpl &
(new () => { $props: Partial<ScrollAreaCornerImplElement> })
