/// <reference types="resize-observer-browser" />

import { defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useDirection } from '@oku-ui/direction'
import { SCROLL_AREA_NAME, scopedScrollAreaProps, scrollAreaProps, scrollAreaProvider } from './props'
import type { ScrollAreaElement, ScrollAreaNaviteElement, ScrollAreaScrollbarElement, ScrollAreaViewportElement } from './props'

const scrollArea = defineComponent({
  name: SCROLL_AREA_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuScrollArea,
      type,
      dir,
      scrollHideDelay,
      ...scrollAreaProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaProps)
    const reactiveReactiveProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const scrollArea = ref<ScrollAreaElement | null>(null)
    const viewport = ref<ScrollAreaViewportElement | null>(null)
    const content = ref<HTMLDivElement | null>(null)
    const scrollbarX = ref<ScrollAreaScrollbarElement | null>(null)
    const scrollbarY = ref<ScrollAreaScrollbarElement | null>(null)
    const cornerWidth = ref<number>(0)
    const cornerHeight = ref<number>(0)
    const scrollbarXEnabled = ref<boolean>(false)
    const scrollbarYEnabled = ref<boolean>(false)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, node => scrollArea.value = (node as ScrollAreaElement))
    const direction = useDirection(dir)

    scrollAreaProvider({
      scope: scopeOkuScrollArea.value,
      type,
      dir: direction,
      scrollHideDelay,
      scrollArea,
      viewport,
      onViewportChange: (_viewport: ScrollAreaViewportElement) => viewport.value = _viewport,
      content,
      onContentChange: (_content: HTMLDivElement) => content.value = _content,
      scrollbarX,
      onScrollbarXChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarX.value = scrollbar,
      scrollbarXEnabled,
      onScrollbarXEnabledChange: (rendered: boolean) => scrollbarXEnabled.value = rendered,
      scrollbarY,
      onScrollbarYChange: (scrollbar: ScrollAreaScrollbarElement) => scrollbarY.value = scrollbar,
      scrollbarYEnabled,
      onScrollbarYEnabledChange: (rendered: boolean) => scrollbarYEnabled.value = rendered,
      onCornerWidthChange: (_width: number) => cornerWidth.value = _width,
      onCornerHeightChange: (_heigh: number) => cornerHeight.value = _heigh,
    })

    return () => h(Primitive.div, {
      dir: direction.value,
      ...mergeProps(attrs, reactiveReactiveProps),
      ref: composedRefs,
      style: {
        position: 'relative',
        // Pass corner sizes as CSS vars to reduce re-renders of context consumers
        ['--oku-scroll-area-corner-width' as any]: `${cornerWidth.value}px`,
        ['--oku-scroll-area-corner-height' as any]: `${cornerHeight.value}px`,
        ...attrs.style as any,
      },
    }, {
      default: () => slots.default?.(),
    })
  },
})

export const OkuScrollArea = scrollArea as typeof scrollArea &
(new () => { $props: ScrollAreaNaviteElement })
