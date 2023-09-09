import { useForwardRef } from '@Oku-ui/use-composable'
import { defineComponent, h, toRefs } from 'vue'
import { OkuPresence } from '@Oku-ui/presence'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedScrollAreaProps } from './types'
import type { ScrollAreaThumbImplElement, ScrollAreaThumbImplNaviteElement, ScrollAreaThumbImplProps } from './scroll-area-thumb-impl'
import { OkuScrollAreaThumbImpl } from './scroll-area-thumb-impl'
import { useScrollbarInject } from './scroll-area-scrollbar-impl'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaThumb
 * ----------------------------------------------------------------------------------------------- */

export const THUMB_NAME = 'ScrollAreaThumb'

export type ScrollAreaThumbNaviteElement = ScrollAreaThumbImplNaviteElement
export type ScrollAreaThumbElement = ScrollAreaThumbImplElement

export interface ScrollAreaThumbProps extends ScrollAreaThumbImplProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

const scrollAreaThumbProps = {
  props: {
    forceMount: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  emits: {},
}

const scrollAreaThumb = defineComponent({
  name: THUMB_NAME,
  components: {
    OkuPresence,
    OkuScrollAreaThumbImpl,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaThumbProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaThumbProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...ScrollAreaThumbAttrs } = attrs as ScrollAreaThumbNaviteElement

    const forwardedRef = useForwardRef()

    const { forceMount } = toRefs(props)

    const scrollbarInject = useScrollbarInject(THUMB_NAME, props.scopeOkuScrollArea)

    return () => h(OkuPresence,
      {
        present: forceMount.value || scrollbarInject.hasThumb.value,
      },
      {
        default: () => h(OkuScrollAreaThumbImpl,
          {
            ref: forwardedRef,
            ...attrs,
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaThumb = scrollAreaThumb as typeof scrollAreaThumb &
(new () => { $props: Partial<ScrollAreaThumbElement> })
