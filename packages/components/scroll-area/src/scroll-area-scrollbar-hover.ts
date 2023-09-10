import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { OkuPresence } from '@Oku-ui/presence'
import type { ScrollAreaScrollbarAutoElement, ScrollAreaScrollbarAutoNaviteElement, ScrollAreaScrollbarAutoProps } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { SCROLLBAR_NAME } from './scroll-area-scrollbar'
import { useScrollAreaInject } from './scroll-area'
import { scopedScrollAreaProps } from './types'

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
    const {
      scopeOkuScrollArea,
      forceMount,
      ...scrollAreaScrollbarHoverProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarHoverProps)
    const reactiveScrollAreaScrollbarHoverProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
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
      { present: computed(() => forceMount.value || visible.value).value },
      {
        default: () => h(OkuScrollAreaScrollbarAuto,
          {
            ['data-state' as string]: visible.value ? 'visible' : 'hidden',
            ...mergeProps(attrs, reactiveScrollAreaScrollbarHoverProps),
            ref: forwardedRef,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaScrollbarHover = scrollAreaScrollbarHover as typeof scrollAreaScrollbarHover &
(new () => { $props: Partial<ScrollAreaScrollbarHoverElement> })
