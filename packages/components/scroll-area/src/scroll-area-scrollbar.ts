import { defineComponent, h, toRefs, watchEffect } from 'vue'
import { useForwardRef } from '@Oku-ui/use-composable/'
import { primitiveProps } from '@Oku-ui/primitive'
import { scopedProps } from './types'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarScroll } from './scroll-area-scrollbar-scroll'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { useScrollAreaContext } from './scroll-area'
import { OkuScrollAreaScrollbarHover } from './scroll-area-scrollbar-hover'

/* -------------------------------------------------------------------------------------------------
 * ScrollAreaScrollbar
 * ----------------------------------------------------------------------------------------------- */

export const SCROLLBAR_NAME = 'ScrollAreaScrollbar'

type ScrollAreaScrollbarElement = ScrollAreaScrollbarVisibleElement
interface ScrollAreaScrollbarProps extends ScrollAreaScrollbarVisibleProps {
  forceMount?: true
}

const scrollAreaScrollbarProps = {
  forceMount: {
    type: Boolean,
    required: true,
  },
}

const scrollAreaScrollbar = defineComponent({
  name: SCROLLBAR_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarProps,
    ...scopedProps,
    ...primitiveProps,
  },
  setup(props, { attrs }) {
    const { ...scrollAreaScrollbarAttrs } = attrs

    const forwardedRef = useForwardRef()

    const {
      forceMount,
    } = toRefs(props)

    const context = useScrollAreaContext(SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = context
    const isHorizontal = props.orientation === 'horizontal'

    watchEffect((onInvalidate) => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

      onInvalidate(() => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
      })
    })

    const originalReturn = () =>
      context.type === 'hover'
        ? h(
          OkuScrollAreaScrollbarHover,
          {
            ...scrollAreaScrollbarAttrs,
            ref: forwardedRef,
            forceMount: forceMount.value,
          },
        )
        : context.type === 'scroll'
          ? h(
            OkuScrollAreaScrollbarScroll,
            {
              ...scrollAreaScrollbarAttrs,
              ref: forwardedRef,
              forceMount: forceMount.value,
            },
          )
          : context.type === 'auto'
            ? h(
              OkuScrollAreaScrollbarAuto,
              {
                ...scrollAreaScrollbarAttrs,
                ref: forwardedRef,
                forceMount: forceMount.value,
              },
            )
            : context.type === 'always'
              ? h(
                OkuScrollAreaScrollbarVisible,
                {
                  ...scrollAreaScrollbarAttrs,
                  ref: forwardedRef,
                },
              )
              : null

    return originalReturn
  },
})

export const OkuScrollAreaScrollbar = scrollAreaScrollbar as typeof scrollAreaScrollbar &
(new () => { $props: Partial<ScrollAreaScrollbarElement> })

export type { ScrollAreaScrollbarElement, ScrollAreaScrollbarProps }
