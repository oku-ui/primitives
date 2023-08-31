import { useComposedRefs, useForwardRef } from '@Oku-ui/use-composable'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { ElementType, PrimitiveProps } from '@Oku-ui/primitive'
import { Primitive, primitiveProps } from '@Oku-ui/primitive'
import { composeEventHandlers } from '@Oku-ui/utils'
import { scopedProps } from './types'
import { addUnlinkedScrollListener, useDebounceCallback } from './utils'
import { THUMB_NAME } from './scroll-area-thumb'
import { useScrollAreaContext } from './scroll-area'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumbImpl
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaThumbImplIntrinsicElement = ElementType<'div'>
type ScrollAreaThumbImplElement = HTMLDivElement

interface ScrollAreaThumbImplProps extends PrimitiveProps {}

const scrollAreaThumbImplProps = {
  style: {
    type: Object,
    required: false,
  },
}

const scrollAreaThumbImpl = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaThumbImplProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaThumbImplAttrs } = attrs as ScrollAreaThumbImplIntrinsicElement

    const forwardedRef = useForwardRef()

    const { style } = toRefs(props)

    const scrollAreaContext = useScrollAreaContext(THUMB_NAME, props.scopeOkuScrollArea)
    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.scopeOkuScrollArea)

    const { onThumbPositionChange } = scrollbarContext
    const composedRef = useComposedRefs(forwardedRef, node =>
      scrollbarContext.onThumbChange(node),
    )
    const removeUnlinkedScrollListenerRef = ref<() => void>()
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.value) {
        removeUnlinkedScrollListenerRef.value()
        removeUnlinkedScrollListenerRef.value = undefined
      }
    }, 100)

    watchEffect((onInvalidate) => {
      const viewport = scrollAreaContext.viewport
      if (viewport) {
        /**
         * We only bind to native scroll event so we know when scroll starts and ends.
         * When scroll starts we start a requestAnimationFrame loop that checks for
         * changes to scroll position. That rAF loop triggers our thumb position change
         * when relevant to avoid scroll-linked effects. We cancel the loop when scroll ends.
         * https://developer.mozilla.org/en-US/docs/Mozilla/Performance/Scroll-linked_effects
         */
        const handleScroll = () => {
          debounceScrollEnd()
          if (!removeUnlinkedScrollListenerRef.value) {
            const listener = addUnlinkedScrollListener(viewport, onThumbPositionChange)
            removeUnlinkedScrollListenerRef.value = listener
            onThumbPositionChange()
          }
        }
        onThumbPositionChange()
        viewport.addEventListener('scroll', handleScroll)

        onInvalidate(() => viewport.removeEventListener('scroll', handleScroll))
      }
    })

    const originalReturn = () =>
      h(
        Primitive.div,
        {
          'data-state': scrollbarContext.hasThumb ? 'visible' : 'hidden',
          ...scrollAreaThumbImplAttrs,
          'ref': composedRef,
          'style': {
            width: 'var(--oku-scroll-area-thumb-width)',
            height: 'var(--oku-scroll-area-thumb-height)',
            ...style.value,
          },
          'onPointerDownCapture': composeEventHandlers(props.onPointerDownCapture, (event) => {
            const thumb = event.target as HTMLElement
            const thumbRect = thumb.getBoundingClientRect()
            const x = event.clientX - thumbRect.left
            const y = event.clientY - thumbRect.top
            scrollbarContext.onThumbPointerDown({ x, y })
          }),
          'onPointerUp': composeEventHandlers(props.onPointerUp, scrollbarContext.onThumbPointerUp),
        },
      )

    return originalReturn
  },
})

export const OkuScrollAreaThumbImpl = scrollAreaThumbImpl as typeof scrollAreaThumbImpl &
(new () => { $props: Partial<ScrollAreaThumbImplElement> })

export type { ScrollAreaThumbImplElement, ScrollAreaThumbImplProps }
