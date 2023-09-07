import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { primitiveProps } from '@Oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@Oku-ui/use-composable'
import { useScrollAreaInject } from './scroll-area'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { scopedScrollAreaProps } from './types'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils'
import { OkuScrollAreaScrollbarImpl } from './scroll-area-scrollbar-impl'
import type { ScrollAreaScrollbarAxisElement } from './share'
import { scrollAreaScrollbarAxisProps } from './share'

const SCROLL_NAME = 'OkuScrollAreaScrollbarY'

const scrollAreaScrollbarY = defineComponent({
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
    // const { ...scrollAreaScrollbarYAttrs } = attrs as ScrollAreaScrollbarYNaviteElement

    const { sizes } = toRefs(props)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const computedStyle = ref<CSSStyleDeclaration>()
    const scrollbarAxisRef = ref<ScrollAreaScrollbarAxisElement>(null)
    const forwardedRef = useForwardRef()
    const composeRefs = useComposedRefs(forwardedRef, scrollbarAxisRef, inject.onScrollbarYChange)

    watchEffect(() => {
      if (scrollbarAxisRef.value)
        computedStyle.value = getComputedStyle(scrollbarAxisRef.value)
    })

    return () => h(OkuScrollAreaScrollbarImpl,
      {

        ['data-orientation' as any]: 'vertical',
        ...attrs,
        ref: composeRefs,
        sizes,
        style: {
          top: 0,
          right: inject.dir === 'ltr' ? 0 : undefined,
          left: inject.dir === 'rtl' ? 0 : undefined,
          bottom: 'var(--oku-scroll-area-corner-height)',
          ['--oku-scroll-area-thumb-height' as any]: `${getThumbSize(sizes.value)}px`,
          ...attrs.style as CSSStyleRule,
        },
        onThumbPointerDown: (pointerPos: { y: number }) => emit('thumbPointerDown', pointerPos.y),
        onDragScroll: (pointerPos: { y: number }) => emit('dragScroll', pointerPos.y),
        onWheelScroll: (event: any, maxScrollPos: number) => {
          if (inject.viewport) {
            const scrollPos = inject.viewport.scrollTop + event.deltaY
            emit('wheelScroll', scrollPos)
            // prevent window scroll when wheeling on scrollbar
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
              event.preventDefault()
          }
        },
        onResize: () => {
          if (scrollbarAxisRef.value && inject.viewport && computedStyle.value) {
            emit('sizesChange', {
              content: inject.viewport.scrollHeight,
              viewport: inject.viewport.offsetHeight,
              scrollbar: {
                size: scrollbarAxisRef.value.clientHeight,
                paddingStart: toInt(computedStyle.value.paddingTop),
                paddingEnd: toInt(computedStyle.value.paddingBottom),
              },
            })
          }
        },
      }, slots,
    )
  },
})

export const OkuScrollAreaScrollbarY = scrollAreaScrollbarY as typeof scrollAreaScrollbarY &
(new () => { $props: Partial<ScrollAreaScrollbarAxisElement> })
