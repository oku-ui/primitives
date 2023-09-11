import { defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'
import { useScrollAreaInject } from './scroll-area'
import { THUMB_NAME } from './scroll-area-thumb'
import { useScrollbarInject } from './scroll-area-scrollbar-impl'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import { addUnlinkedScrollListener, useDebounceCallback } from './utils'
import { scopedScrollAreaProps } from './types'

export type ScrollAreaThumbImplNaviteElement = OkuElement<'div'>
export type ScrollAreaThumbImplElement = HTMLDivElement

export interface ScrollAreaThumbImplProps extends PrimitiveProps {}

export const scrollAreaThumbImplProps = {
  props: {
    style: {
      type: Object,
      required: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownCapture: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
}

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
  },
  emits: scrollAreaThumbImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuScrollArea,
      style,
      ...scrollAreaThumbImplProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaThumbImplProps)
    const reactiveScrollAreaThumbImplProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const scrollAreaInject = useScrollAreaInject(THUMB_NAME, scopeOkuScrollArea.value)
    const scrollbarInject = useScrollbarInject(THUMB_NAME, scopeOkuScrollArea.value)

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
        ...mergeProps(attrs, reactiveScrollAreaThumbImplProps),
        ref: composedRef,
        style: {
          width: 'var(--oku-scroll-area-thumb-width)',
          height: 'var(--oku-scroll-area-thumb-height)',
          ...style.value,
        },
        onPointerdownCapture: composeEventHandlers<scrollAreaThumbImplEmits['pointerdownCapture'][0]>((event) => {
          emit('pointerdownCapture', event)
        }, (event) => {
          const thumb = event.target as HTMLElement
          const thumbRect = thumb.getBoundingClientRect()
          const x = event.clientX - thumbRect.left
          const y = event.clientY - thumbRect.top
          scrollbarInject.onThumbPointerDown({ x, y })
        }),
        onPointerup: composeEventHandlers<scrollAreaThumbImplEmits['pointerup'][0]>((event) => {
          emit('pointerup', event)
        }),
      }, slots,
    )
  },
})

export const OkuScrollAreaThumbImpl = scrollAreaThumbImpl as typeof scrollAreaThumbImpl &
(new () => { $props: ScrollAreaThumbImplNaviteElement })
