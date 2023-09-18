import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'

import { OkuScrollAreaScrollbarImpl } from './scroll-area-scrollbar-impl'
import type { ScrollAreaScrollbarAxisElement, ScrollAreaScrollbarAxisNaviteElement, ScrollAreaScrollbarElement } from './props'
import { SCROLL_AREA_SCROLLBAR_NAME, SCROLL_AREA_SCROLLBAR_Y, scopedScrollAreaProps, scrollAreaScrollbarAxisProps, useScrollAreaInject } from './props'
import { getThumbSize, isScrollingWithinScrollbarBounds, toInt } from './utils'

const scrollAreaScrollbarY = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_Y,
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
    const {
      sizes,
      ...scrollAreaScrollbarAxisProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarAxisProps)
    const reactiveScrollAreaScrollbarAxisProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const computedStyle = ref<CSSStyleDeclaration>()
    const scrollbarAxisRef = ref<ScrollAreaScrollbarAxisElement | null>(null)
    const forwardedRef = useForwardRef()
    const composeRefs = useComposedRefs(forwardedRef, scrollbarAxisRef, el => inject.onScrollbarYChange(el as ScrollAreaScrollbarElement))

    watchEffect(() => {
      if (scrollbarAxisRef.value)
        computedStyle.value = getComputedStyle(scrollbarAxisRef.value)
    })

    return () => h(OkuScrollAreaScrollbarImpl,
      {
        'data-orientation': 'vertical',
        ...mergeProps(attrs, reactiveScrollAreaScrollbarAxisProps),
        'ref': composeRefs,
        'sizes': sizes.value,
        'style': {
          top: '0px',
          right: inject.dir.value === 'ltr' ? '0px' : undefined,
          left: inject.dir.value === 'rtl' ? '0px' : undefined,
          bottom: 'var(--oku-scroll-area-corner-height)',
          ['--oku-scroll-area-thumb-height' as any]: `${getThumbSize(sizes.value!)}px`,
          ...attrs.style as any,
        },
        'onThumbPointerDown': (pointerPos: { y: number }) => emit('thumbPointerDown', pointerPos.y),
        'onDragScroll': (pointerPos: { y: number }) => emit('dragScroll', pointerPos.y),
        'onWheelScroll': (event: WheelEvent, maxScrollPos: number) => {
          if (inject.viewport.value) {
            const scrollPos = inject.viewport.value.scrollTop + event.deltaY
            emit('wheelScroll', scrollPos)
            // prevent window scroll when wheeling on scrollbar
            if (isScrollingWithinScrollbarBounds(scrollPos, maxScrollPos))
              event.preventDefault()
          }
        },
        'onResize': () => {
          if (scrollbarAxisRef.value && inject.viewport.value && computedStyle.value) {
            emit('sizesChange', {
              content: inject.viewport.value.scrollHeight,
              viewport: inject.viewport.value.offsetHeight,
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
(new () => { $props: ScrollAreaScrollbarAxisNaviteElement })
