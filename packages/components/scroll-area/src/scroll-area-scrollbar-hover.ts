import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { OkuPresence } from '@Oku-ui/presence'
import { useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedProps } from './types'
import { useScrollAreaContext } from './scroll-area'
import type { ScrollAreaScrollbarAutoElement, ScrollAreaScrollbarAutoIntrinsicElement, ScrollAreaScrollbarAutoProps } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'

const SCROLL_NAME = 'Hover'

export type ScrollAreaScrollbarHoverIntrinsicElement = ScrollAreaScrollbarAutoIntrinsicElement
type ScrollAreaScrollbarHoverElement = ScrollAreaScrollbarAutoElement

interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true
}

const scrollAreaScrollbarHoverProps = {
  forceMount: {
    type: Boolean,
    required: false,
    default: true,
  },
}

const scrollAreaScrollbarHover = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarHoverProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaScrollbarHoverAttrs } = attrs as ScrollAreaScrollbarHoverIntrinsicElement

    const forwardedRef = useForwardRef()

    const { forceMount } = toRefs(props)

    const context = useScrollAreaContext(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const visible = ref(false)

    watchEffect((onInvalidate) => {
      const scrollArea = context.scrollArea
      let hideTimer = 0
      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer)
          visible.value = true
        }
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => (visible.value = false), context.scrollHideDelay)
        }
        scrollArea.addEventListener('pointerenter', handlePointerEnter)
        scrollArea.addEventListener('pointerleave', handlePointerLeave)

        onInvalidate(() => {
          window.clearTimeout(hideTimer)
          scrollArea.removeEventListener('pointerenter', handlePointerEnter)
          scrollArea.removeEventListener('pointerleave', handlePointerLeave)
        })
      }
    })

    const originalReturn = () =>
      h(
        OkuPresence,
        {
          present: forceMount.value || visible.value,
        },
        h(
          OkuScrollAreaScrollbarAuto,
          {

            'data-state': visible.value ? 'visible' : 'hidden',
            ...scrollAreaScrollbarHoverAttrs,
            'ref': forwardedRef,
          },
        ),
      )

    return originalReturn
  },
})

export const OkuScrollAreaScrollbarHover = scrollAreaScrollbarHover as typeof scrollAreaScrollbarHover &
(new () => { $props: Partial<ScrollAreaScrollbarHoverElement> })

export type { ScrollAreaScrollbarHoverElement, ScrollAreaScrollbarHoverProps }
