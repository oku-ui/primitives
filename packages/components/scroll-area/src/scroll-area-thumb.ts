import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import { OkuPresence } from '@Oku-ui/presence'
import type { ScrollAreaThumbImplElement, ScrollAreaThumbImplNaviteElement, ScrollAreaThumbImplProps } from './scroll-area-thumb-impl'
import { OkuScrollAreaThumbImpl } from './scroll-area-thumb-impl'
import { useScrollbarInject } from './scroll-area-scrollbar-impl'
import { scopedScrollAreaProps } from './types'

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
      type: Boolean as PropType<true | undefined>,
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
    const {
      scopeOkuScrollArea,
      forceMount,
      ...scrollAreaThumbProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaThumbProps)
    const reactiveScrollAreaThumbProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const scrollbarInject = useScrollbarInject(THUMB_NAME, scopeOkuScrollArea.value)

    return () => h(OkuPresence,
      { present: computed(() => forceMount.value || scrollbarInject.hasThumb.value).value },
      {
        default: () => h(OkuScrollAreaThumbImpl,
          {
            ref: forwardedRef,
            ...mergeProps(attrs, reactiveScrollAreaThumbProps),
          }, slots,
        ),
      },
    )
  },
})

export const OkuScrollAreaThumb = scrollAreaThumb as typeof scrollAreaThumb &
(new () => { $props: Partial<ScrollAreaThumbElement> })
