import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { composeEventHandlers } from '@oku-ui/utils'

import { useDebounceCallback, useResizeObserver } from './utils'
import type { ScrollAreaScrollbarElement, ScrollAreaScrollbarImplEmits, ScrollAreaScrollbarImplNaviteElement } from './props'
import { SCROLL_AREA_SCROLLBAR_IMPL_NAME, SCROLL_AREA_SCROLLBAR_NAME, scopedScrollAreaProps, scrollAreaScrollbarImplProps, scrollbarProvider, useScrollAreaInject } from './props'

const scrollAreaScrollbarImpl = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_IMPL_NAME,
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

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, scopeOkuScrollArea.value)
    const scrollbar = ref<ScrollAreaScrollbarElement | null>(null)
    const composeRefs = useComposedRefs(forwardedRef, node => scrollbar.value = (node as ScrollAreaScrollbarElement))
    const rectRef = ref<ClientRect | null>(null)
    const prevWebkitUserSelectRef = ref<string>('')
    const maxScrollPos = computed(() => sizes.value!.content - sizes.value!.viewport)
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
      hasThumb: computed(() => hasThumb.value || false),
      onThumbChange: thumb => emit('thumbChange', thumb),
      onThumbPointerUp: () => emit('thumbPointerUp'),
      onThumbPositionChange: () => handleThumbPositionChange(),
      onThumbPointerDown: pointerPos => emit('thumbPointerDown', pointerPos),
    })

    return () => h(Primitive.div, {
      ...mergeProps(attrs, reactiveScrollAreaScrollbarImplProps),
      ref: composeRefs,
      style: { position: 'absolute', ...attrs.style as any },
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
    }, slots)
  },
})

export const OkuScrollAreaScrollbarImpl = scrollAreaScrollbarImpl as typeof scrollAreaScrollbarImpl &
(new () => { $props: ScrollAreaScrollbarImplNaviteElement })
