import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { scopedScrollAreaProps } from './types'
import { addUnlinkedScrollListener, useDebounceCallback } from './utils'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import { THUMB_NAME } from './scroll-area-thumb'
import { useScrollAreaInject } from './scroll-area'
import { useScrollbarInject } from './scroll-area-scrollbar-impl'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumbImpl
 * ----------------------------------------------------------------------------------------------- */

export type ScrollAreaThumbImplNaviteElement = OkuElement<'div'>
export type ScrollAreaThumbImplElement = HTMLDivElement

export interface ScrollAreaThumbImplProps extends PrimitiveProps {}

const scrollAreaThumbImplProps = {
  props: {
    style: {
      type: Object,
      required: false,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
}

// export type PointerdownCaptureEvent = CustomEvent<{ originalEvent: PointerEvent }>

export type scrollAreaThumbImplEmits = {
  pointerdownCapture: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

const scrollAreaThumbImpl = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaThumbImplProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaThumbImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    // const { ...scrollAreaThumbImplAttrs } = attrs as ScrollAreaThumbImplNaviteElement

    const forwardedRef = useForwardRef()

    const { style } = toRefs(props)

    const scrollAreaInject = useScrollAreaInject(THUMB_NAME, props.scopeOkuScrollArea)
    const scrollbarInject = useScrollbarInject(THUMB_NAME, props.scopeOkuScrollArea)

    const { onThumbPositionChange } = scrollbarInject
    const composedRef = useComposedRefs(forwardedRef, node => scrollbarInject.onThumbChange(node as ScrollAreaThumbElement))
    const removeUnlinkedScrollListenerRef = ref<() => void>()
    const debounceScrollEnd = useDebounceCallback(() => {
      if (removeUnlinkedScrollListenerRef.value) {
        removeUnlinkedScrollListenerRef.value()
        removeUnlinkedScrollListenerRef.value = undefined
      }
    }, 100)

    watchEffect((onInvalidate) => {
      const viewport = scrollAreaInject.viewport.value
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

    return () => h(Primitive.div,
      {
        ['data-state' as string]: scrollbarInject.hasThumb.value ? 'visible' : 'hidden',
        ...attrs,
        ref: composedRef,
        style: {
          width: 'var(--oku-scroll-area-thumb-width)',
          height: 'var(--oku-scroll-area-thumb-height)',
          ...style.value,
        },
        onPointerDownCapture: composeEventHandlers<scrollAreaThumbImplEmits['pointerdownCapture'][0]>((event) => {
          emit('pointerdownCapture', event)
        }, (event) => {
          const thumb = event.target as HTMLElement
          const thumbRect = thumb.getBoundingClientRect()
          const x = event.clientX - thumbRect.left
          const y = event.clientY - thumbRect.top
          scrollbarInject.onThumbPointerDown({ x, y })
        }),
        onPointerUp: composeEventHandlers<scrollAreaThumbImplEmits['pointerup'][0]>((event) => {
          emit('pointerup', event)
        }),
      }, slots,
    )
  },
})

export const OkuScrollAreaThumbImpl = scrollAreaThumbImpl as typeof scrollAreaThumbImpl &
(new () => { $props: Partial<ScrollAreaThumbImplElement> })
