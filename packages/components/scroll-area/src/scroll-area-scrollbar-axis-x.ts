import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { Sizes } from './scroll-area'
import { useScrollAreaInject } from './scroll-area'
import type { ScrollAreaScrollbarElement } from './scroll-area-scrollbar'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { scopedScrollAreaProps } from './types'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils'
import { OkuScrollAreaScrollbarImpl } from './scroll-area-scrollbar-impl'
import type { ScrollAreaScrollbarAxisElement } from './share'
import { scrollAreaScrollbarAxisProps } from './share'

const SCROLL_NAME = 'OkuScrollAreaScrollbarX'

const scrollAreaScrollbarX = defineComponent({
  name: SCROLL_NAME,
  components: {
    OkuScrollAreaScrollbarImpl,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarAxisProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarAxisProps.emits,
  setup(props, { attrs, emit, slots }) {
    // const { ...scrollAreaScrollbarXAttrs } = attrs as ScrollAreaScrollbarXNaviteElement

    const { sizes } = toRefs(props)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const computedStyle = ref<CSSStyleDeclaration>()
    const scrollbarAxisRef = ref<ScrollAreaScrollbarAxisElement | null>(null)
    const forwardedRef = useForwardRef()
    const composeRefs = useComposedRefs(forwardedRef, scrollbarAxisRef, el => inject.onScrollbarXChange(el as ScrollAreaScrollbarElement))

    watchEffect(() => {
      if (scrollbarAxisRef.value)
        computedStyle.value = getComputedStyle(scrollbarAxisRef.value)
    })

    return () => h(OkuScrollAreaScrollbarImpl,
      {
        ['data-orientation' as string]: 'horizontal',
        ...attrs,
        ref: composeRefs,
        sizes,
        style: {
          bottom: 0,
          left: inject.dir.value === 'rtl' ? 'var(--oku-scroll-area-corner-width)' : 0,
          right: inject.dir.value === 'ltr' ? 'var(--oku-scroll-area-corner-width)' : 0,
          ['--oku-scroll-area-thumb-width' as any]: `${getThumbSize(sizes.value as Sizes)}px`,
          ...attrs.style as CSSStyleRule,
        },
        onThumbPointerDown: (pointerPos: { x: number }) => emit('thumbPointerDown', pointerPos.x),
        onDragScroll: (pointerPos: { x: number }) => emit('dragScroll', pointerPos.x),
        onWheelScroll: (event: WheelEvent, maxScrollPos: number) => {
          if (inject.viewport.value) {
            const scrollPos = inject.viewport.value.scrollLeft + event.deltaX
            emit('wheelScroll', scrollPos)
            // prevent window scroll when wheeling on scrollbar
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
              event.preventDefault()
          }
        },
        onResize: () => {
          if (scrollbarAxisRef.value && inject.viewport.value && computedStyle.value) {
            emit('sizesChange', {
              content: inject.viewport.value.scrollWidth,
              viewport: inject.viewport.value.offsetWidth,
              scrollbar: {
                size: scrollbarAxisRef.value.clientWidth,
                paddingStart: toInt(computedStyle.value.paddingLeft),
                paddingEnd: toInt(computedStyle.value.paddingRight),
              },
            })
          }
        },
      }, slots,
    )
  },
})

export const OkuScrollAreaScrollbarX = scrollAreaScrollbarX as typeof scrollAreaScrollbarX &
(new () => { $props: Partial<ScrollAreaScrollbarAxisElement> })
