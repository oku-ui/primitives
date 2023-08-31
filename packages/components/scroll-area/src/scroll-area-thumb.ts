import { useForwardRef } from '@Oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import { OkuPresence } from '@Oku-ui/presence'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedProps } from './types'
import type { ScrollAreaThumbImplElement, ScrollAreaThumbImplIntrinsicElement, ScrollAreaThumbImplProps } from './scroll-area-thumb-impl'
import { OkuScrollAreaThumbImpl } from './scroll-area-thumb-impl'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb
 * ----------------------------------------------------------------------------------------------- */

export const THUMB_NAME = 'ScrollAreaThumb'

export type ScrollAreaThumbIntrinsicElement = ScrollAreaThumbImplIntrinsicElement
type ScrollAreaThumbElement = ScrollAreaThumbImplElement

interface ScrollAreaThumbProps extends ScrollAreaThumbImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const scrollAreaThumbProps = {
  forceMount: {
    type: Boolean,
    required: false,
    default: true,
  },
}

const scrollAreaThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaThumbProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...ScrollAreaThumbAttrs } = attrs as ScrollAreaThumbIntrinsicElement

    const forwardedRef = useForwardRef()

    const { forceMount } = toRefs(props)

    const scrollbarContext = useScrollbarContext(THUMB_NAME, props.scopeOkuScrollArea)

    const originalReturn = () =>
      h(
        OkuPresence,
        {
          present: forceMount.value || scrollbarContext.hasThumb,
        },
        h(
          OkuScrollAreaThumbImpl,
          {
            ref: forwardedRef,
            ...ScrollAreaThumbAttrs,
          },
        ),
      )

    return originalReturn
  },
})

export const OkuScrollAreaThumb = scrollAreaThumb as typeof scrollAreaThumb &
(new () => { $props: Partial<ScrollAreaThumbElement> })

export type { ScrollAreaThumbElement, ScrollAreaThumbProps }
