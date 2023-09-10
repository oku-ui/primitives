import { defineComponent, h, ref, toRefs, watchEffect } from 'vue'
import { OkuPresence } from '@oku-ui/presence'
import { useForwardRef } from '@oku-ui/use-composable'
import { primitiveProps } from '@oku-ui/primitive'
import { scopedScrollAreaProps } from './types'
import { useScrollAreaInject } from './scroll-area'
import type { ScrollAreaScrollbarAutoElement, ScrollAreaScrollbarAutoNaviteElement, ScrollAreaScrollbarAutoProps } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'

const SCROLL_NAME = 'OkuScrollAreaScrollbarHover'

export type ScrollAreaScrollbarHoverNaviteElement = ScrollAreaScrollbarAutoNaviteElement
export type ScrollAreaScrollbarHoverElement = ScrollAreaScrollbarAutoElement

export interface ScrollAreaScrollbarHoverProps extends ScrollAreaScrollbarAutoProps {
  forceMount?: true
}

const scrollAreaScrollbarHoverProps = {
  props: {
    forceMount: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: {},
}

const scrollAreaScrollbarHover = defineComponent({
  name: SCROLL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarHoverProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarHoverProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaScrollbarHoverAttrs } = attrs as ScrollAreaScrollbarHoverNaviteElement

    const { forceMount } = toRefs(props)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const forwardedRef = useForwardRef()
    const visible = ref(false)

    watchEffect((onInvalidate) => {
      const scrollArea = inject.scrollArea.value
      let hideTimer = 0
      if (scrollArea) {
        const handlePointerEnter = () => {
          window.clearTimeout(hideTimer)
          visible.value = true
        }
        const handlePointerLeave = () => {
          hideTimer = window.setTimeout(() => visible.value = false, inject.scrollHideDelay.value)
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

    return () => h(OkuPresence,
      {
        present: forceMount.value || visible.value,
      },
      {
        default: () => h(OkuScrollAreaScrollbarAuto,
          {
            ['data-state' as string]: visible.value ? 'visible' : 'hidden',
            ...attrs,
            ref: forwardedRef,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarHover = scrollAreaScrollbarHover as typeof scrollAreaScrollbarHover &
(new () => { $props: Partial<ScrollAreaScrollbarHoverElement> })
