import type { Ref } from 'vue'
import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { useCallbackRef, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { composeEventHandlers } from '@oku-ui/utils'
import { useDebounceCallback, useResizeObserver } from './utils'
import type { Sizes } from './scroll-area'
import { useScrollAreaInject } from './scroll-area'
import type { ScrollAreaScrollbarElement } from './scroll-area-scrollbar'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import { scopedScrollAreaProps } from './types'

export type ScrollAreaScrollbarImplNaviteElement = OkuElement<'div'>
export type ScrollAreaScrollbarImplElement = HTMLDivElement

export interface ScrollAreaScrollbarImplProps extends PrimitiveProps, ScrollAreaScrollbarImplPrivateProps { }

export const [createScrollProvide, createScrollScope] = createProvideScope(SCROLLBAR_NAME)

type ScrollAreaProvideValue = {
  hasThumb: Ref<boolean>
  scrollbar: Ref<ScrollAreaScrollbarElement | null>
  onThumbChange(thumb: ScrollAreaThumbElement | null): void
  onThumbPointerUp(): void
  onThumbPointerDown(pointerPos: { x: number; y: number }): void
  onThumbPositionChange(): void
}

export const [scrollbarProvider, useScrollbarInject] = createScrollProvide<ScrollAreaProvideValue>(SCROLLBAR_NAME)

export type ScrollAreaScrollbarImplPrivateProps = {
  sizes: Ref<Sizes>
  hasThumb: Ref<boolean>
  onThumbChange: ScrollAreaProvideValue['onThumbChange']
  onThumbPointerUp: ScrollAreaProvideValue['onThumbPointerUp']
  onThumbPointerDown: ScrollAreaProvideValue['onThumbPointerDown']
  onThumbPositionChange: ScrollAreaProvideValue['onThumbPositionChange']
  onWheelScroll(event: WheelEvent, maxScrollPos: number): void
  onDragScroll(pointerPos: { x: number; y: number }): void
  onResize(): void
}

const scrollAreaScrollbarImplProps = {
  props: {
    hasThumb: {
      type: Boolean,
    },
    sizes: {
      type: Object,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    sizesChange: (sizes: Sizes) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    wheelScroll: (scrollPos: number) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    dragScroll: (pointerPos: { x: number; y: number }) => true,
    resize: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
}

export type ScrollAreaScrollbarImplEmits = {
  pointerup: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerdown: [event: PointerEvent]
}

const scrollAreaScrollbarImpl = defineComponent({
  name: SCROLLBAR_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarImplProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    // const { ...scrollAreaAttrs } = attrs as ScrollAreaNaviteElement

    const forwardedRef = useForwardRef()

    const { sizes, hasThumb } = toRefs(props)

    const scrollbarInject = useScrollbarInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const scrollbar = ref<ScrollAreaScrollbarElement | null>(null)

    const composeRefs = useComposedRefs(forwardedRef, node => scrollbar.value = (node as ScrollAreaScrollbarElement))
    const rectRef = ref<ClientRect | null>(null)
    const prevWebkitUserSelectRef = ref<string>('')
    const viewport = inject.viewport.value
    const maxScrollPos = sizes.value?.content - sizes.value?.viewport
    const handleWheelScroll = (maxScrollPos: number) => emit('wheelScroll', maxScrollPos)
    const handleThumbPositionChange = useCallbackRef(() => scrollbarInject.onThumbPositionChange())
    const handleResize = useDebounceCallback(() => emit('resize'), 10)

    function handleDragScroll(event: PointerEvent) {
      if (rectRef.value) {
        const x = event.clientX - rectRef.value.left
        const y = event.clientY - rectRef.value.top
        emit('dragScroll', ({ x, y }))
      }
    }

    /**
     * We bind wheel event imperatively so we can switch off passive
     * mode for document wheel event to allow it to be prevented
     */
    watchEffect((onInvalidate) => {
      const handleWheel = (event: WheelEvent) => {
        const element = event.target as HTMLElement
        const isScrollbarWheel = scrollbar.value?.contains(element)
        if (isScrollbarWheel)
          handleWheelScroll(maxScrollPos)
      }
      document.addEventListener('wheel', handleWheel, { passive: false })

      onInvalidate(() => document.removeEventListener('wheel', handleWheel, { passive: false } as any))
    })

    /**
     * Update thumb position on sizes change
     */
    watchEffect(() => {
      handleThumbPositionChange.value()
    })

    useResizeObserver(scrollbar.value, handleResize)
    useResizeObserver(inject.content.value, handleResize)

    scrollbarProvider({
      scope: props.scopeOkuScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: (thumb: ScrollAreaThumbElement) => thumb,
      onThumbPointerUp: () => scrollbarInject.onThumbPointerUp,
      onThumbPositionChange: () => handleThumbPositionChange.value(),
      onThumbPointerDown: (pointerPos: { x: number; y: number }) => scrollbarInject.onThumbPointerDown(pointerPos),
    })

    return () => h(Primitive.div,
      {
        ...attrs,
        ref: composeRefs,
        style: { position: 'absolute', ...attrs.style as CSSRule },
        onPointerDown: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerdown'][0]>((event) => {
          emit('pointerdown', event)
        }, (event) => {
          const mainPointer = 0
          if (event.button === mainPointer) {
            const element = event.target as HTMLElement
            element.setPointerCapture(event.pointerId)
            rectRef.value = scrollbar.value!.getBoundingClientRect()
            // pointer capture doesn't prevent text selection in Safari
            // so we remove text selection manually when scrolling
            prevWebkitUserSelectRef.value = document.body.style.webkitUserSelect
            document.body.style.webkitUserSelect = 'none'
            if (inject.viewport.value)
              inject.viewport.value.style.scrollBehavior = 'auto'
            handleDragScroll(event)
          }
        }),
        onPointerMove: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointermove'][0]>((event) => {
          emit('pointermove', event)
        }, handleDragScroll),
        onPointerUp: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerup'][0]>((event) => {
          emit('pointerup', event)
        }, (event) => {
          const element = event.target as HTMLElement
          if (element.hasPointerCapture(event.pointerId))
            element.releasePointerCapture(event.pointerId)

          document.body.style.webkitUserSelect = prevWebkitUserSelectRef.value
          if (inject.viewport.value)
            inject.viewport.value.style.scrollBehavior = ''
          rectRef.value = null
        }),
      }, slots,
    )
  },
})

export const OkuScrollAreaScrollbarImpl = scrollAreaScrollbarImpl as typeof scrollAreaScrollbarImpl &
(new () => { $props: Partial<ScrollAreaScrollbarImplElement> })
