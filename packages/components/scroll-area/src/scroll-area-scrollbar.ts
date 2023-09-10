import { defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@Oku-ui/use-composable'
import { primitiveProps } from '@Oku-ui/primitive'
import type { ScrollAreaScrollbarVisibleElement, ScrollAreaScrollbarVisibleNaviteElement, ScrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarVisible, scrollAreaScrollbarVisibleProps } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarScroll } from './scroll-area-scrollbar-scroll'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarHover } from './scroll-area-scrollbar-hover'
import { useScrollAreaInject } from './scroll-area'
import { scopedScrollAreaProps } from './types'

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
    ...scrollAreaScrollbarVisibleProps.props,
    ...scopedScrollAreaProps,
    ...primitiveProps,
  },
  emits: scrollAreaScrollbarProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuScrollArea,
      forceMount,
      orientation,
      ...scrollAreaScrollbarProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarProps)
    const reactiveScrollAreaScrollbarProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const inject = useScrollAreaInject(SCROLLBAR_NAME, scopeOkuScrollArea.value)
    const forwardedRef = useForwardRef()
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = inject
    const isHorizontal = orientation.value === 'horizontal'

    watchEffect((onInvalidate) => {
      isHorizontal ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

      onInvalidate(() => {
        isHorizontal ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
      })
    })

    return () => inject.type.value === 'hover'
      ? h(OkuScrollAreaScrollbarHover,
        {
          ...mergeProps(attrs, reactiveScrollAreaScrollbarProps),
          ref: forwardedRef,
          forceMount: forceMount.value,
        }, {
          default: () => slots.default?.(),
        },
      )
      : inject.type.value === 'scroll'
        ? h(OkuScrollAreaScrollbarScroll,
          {
            ...mergeProps(attrs, reactiveScrollAreaScrollbarProps),
            ref: forwardedRef,
            forceMount: forceMount.value,
          }, {
            default: () => slots.default?.(),
          },
        )
        : inject.type.value === 'auto'
          ? h(OkuScrollAreaScrollbarAuto,
            {
              ...mergeProps(attrs, reactiveScrollAreaScrollbarProps),
              ref: forwardedRef,
              forceMount: forceMount.value,
            }, {
              default: () => slots.default?.(),
            },
          )
          : inject.type.value === 'always'
            ? h(OkuScrollAreaScrollbarVisible,
              {
                ...mergeProps(attrs, reactiveScrollAreaScrollbarProps),
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
