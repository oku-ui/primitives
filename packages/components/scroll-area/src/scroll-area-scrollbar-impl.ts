import type { Ref } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { Primitive, primitiveProps } from '@oku-ui/primitive'
import { createProvideScope } from '@oku-ui/provide'
import { composeEventHandlers } from '@oku-ui/utils'
import { useScrollAreaInject } from './scroll-area'
import type { ScrollAreaScrollbarElement } from './scroll-area-scrollbar'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import type { ScrollAreaThumbElement } from './scroll-area-thumb'
import type { Sizes } from './utils'
import { useDebounceCallback, useResizeObserver } from './utils'
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
}

export type ScrollAreaScrollbarImplPrivateEmits = {
  thumbChange: [thumb: Parameters<ScrollAreaProvideValue['onThumbChange']>[0]]
  thumbPointerUp: []
  thumbPointerDown: [pointerPos: Parameters<ScrollAreaProvideValue['onThumbPointerDown']>[0]]
  thumbPositionChange: []
  wheelScroll: [event: WheelEvent, maxScrollPos: number]
  dragScroll: [pointerPos: { x: number; y: number }]
  resize: []
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export const scrollAreaScrollbarImplProps = {
  props: {
    hasThumb: {
      type: Boolean,
    },
    sizes: {
      type: Object,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbChange: (thumb: Parameters<ScrollAreaProvideValue['onThumbChange']>[0]) => true,
    thumbPointerUp: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    thumbPointerDown: (pointerPos: Parameters<ScrollAreaProvideValue['onThumbPointerDown']>[0]) => true,

    thumbPositionChange: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    wheelScroll: (...args: ScrollAreaScrollbarImplPrivateEmits['wheelScroll']) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    dragScroll: (...args: ScrollAreaScrollbarImplPrivateEmits['dragScroll']) => true,
    resize: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
  },
  propKeys: ['hasThumb', 'sizes', 'asChild'] as ['hasThumb', 'sizes', 'asChild'],
  emitKeys: [
    'thumbChange',
    'thumbPointerUp',
    'thumbPointerDown',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
    'resize',
    'pointerdown',
    'pointermove',
    'pointerup',
  ] as [
    'thumbChange',
    'thumbPointerUp',
    'thumbPointerDown',
    'thumbPositionChange',
    'wheelScroll',
    'dragScroll',
    'resize',
    'pointerdown',
    'pointermove',
    'pointerup',
  ],
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
  },
  emits: scrollAreaScrollbarImplProps.emits,
  setup(props, { attrs, emit, slots }) {
    const {
      scopeOkuScrollArea,
      sizes,
      hasThumb,
      ...scrollAreaScrollbarImplProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarImplProps)
    const reactiveScrollAreaScrollbarImplProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
    const scrollbar = ref<ScrollAreaScrollbarElement | null>(null)
    const composeRefs = useComposedRefs(forwardedRef, node => scrollbar.value = (node as ScrollAreaScrollbarElement))
    const rectRef = ref<ClientRect | null>(null)
    const prevWebkitUserSelectRef = ref<string>('')
    const maxScrollPos = computed(() => sizes.value?.content - sizes.value?.viewport)
    const handleWheelScroll = (event: WheelEvent, maxScrollPos: number) => emit('wheelScroll', event, maxScrollPos)

    const handleThumbPositionChange = () => emit('thumbPositionChange')

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
          handleWheelScroll(event, maxScrollPos.value)
      }
      document.addEventListener('wheel', handleWheel, { passive: false })

      onInvalidate(() => document.removeEventListener('wheel', handleWheel, { passive: false } as any))
    })

    /**
     * Update thumb position on sizes change
     */
    watchEffect(() => {
      handleThumbPositionChange()
    })

    useResizeObserver(scrollbar.value, handleResize)
    useResizeObserver(inject.content.value, handleResize)

    scrollbarProvider({
      scope: props.scopeOkuScrollArea,
      scrollbar,
      hasThumb,
      onThumbChange: thumb => thumb,
      onThumbPointerUp: () => emit('thumbPointerUp'),
      onThumbPositionChange: () => handleThumbPositionChange(),
      onThumbPointerDown: pointerPos => emit('thumbPointerDown', pointerPos),
    })

    return () => h(Primitive.div,
      {
        ...mergeProps(attrs, reactiveScrollAreaScrollbarImplProps),
        ref: composeRefs,
        style: { position: 'absolute', ...attrs.style as CSSRule },
        onPointerdown: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerdown'][0]>((event) => {
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
        onPointermove: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointermove'][0]>((event) => {
          emit('pointermove', event)
        }, handleDragScroll),
        onPointerup: composeEventHandlers<ScrollAreaScrollbarImplEmits['pointerup'][0]>((event) => {
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
(new () => { $props: ScrollAreaScrollbarImplNaviteElement })
