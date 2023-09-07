import { defineComponent, h, toRefs, watchEffect } from 'vue'
import { useForwardRef } from '@Oku-ui/use-composable/'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedScrollAreaProps } from './types'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarScroll } from './scroll-area-scrollbar-scroll'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { useScrollAreaInject } from './scroll-area'
import { OkuScrollAreaScrollbarHover } from './scroll-area-scrollbar-hover'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollbar
 * ----------------------------------------------------------------------------------------------- */

export const SCROLLBAR_NAME = 'OkuScrollAreaScrollbar'

export type ScrollAreaScrollbarNaviteElement = ScrollAreaScrollbarVisibleNaviteElement
export type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement

export interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarProps = {
  props: {
    forceMount: {
      type: Boolean,
      required: true,
    },
  },
  emits: {},
}

const scrollAreaScrollbar = defineComponent({
  name: SCROLLBAR_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarProps.emits,
  setup(props, { attrs, slots }) {
    // const { ...scrollAreaScrollbarAttrs } = attrs

    const {
      forceMount,
    } = toRefs(props)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const forwardedRef = useForwardRef()
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = inject
    const isHorizontal = attrs.orientation === 'horizontal'

    watchEffect((onInvalidate) => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

      onInvalidate(() => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
      })
    })

    return () => inject.type === 'hover'
      ? h(OkuScrollAreaScrollbarHover,
        {
          ...attrs,
          ref: forwardedRef,
          forceMount: forceMount.value,
        }, {
          default: () => slots.default?.(),
        },
      )
      : inject.type === 'scroll'
        ? h(OkuScrollAreaScrollbarScroll,
          {
            ...attrs,
            ref: forwardedRef,
            forceMount: forceMount.value,
          }, {
            default: () => slots.default?.(),
          },
        )
        : inject.type === 'auto'
          ? h(OkuScrollAreaScrollbarAuto,
            {
              ...attrs,
              ref: forwardedRef,
              forceMount: forceMount.value,
            }, {
              default: () => slots.default?.(),
            },
          )
          : inject.type === 'always'
            ? h(OkuScrollAreaScrollbarVisible,
              {
                ...attrs,
                ref: forwardedRef,
              }, {
                default: () => slots.default?.(),
              },
            )
            : null
  },
})

export const OkuScrollAreaScrollbar = scrollAreaScrollbar as typeof scrollAreaScrollbar &
(new () => { $props: Partial<ScrollAreaScrollbarElement> })
