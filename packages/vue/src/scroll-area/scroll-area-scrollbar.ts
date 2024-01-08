import { computed, defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarScroll } from './scroll-area-scrollbar-scroll'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarHover } from './scroll-area-scrollbar-hover'
import type { ScrollAreaScrollbarNaviteElement } from './props'
import { SCROLL_AREA_SCROLLBAR_NAME, scopedScrollAreaProps, scrollAreaScrollbarProps, useScrollAreaInject } from './props'

const scrollAreaScrollbar = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_NAME,
  components: {
    OkuScrollAreaScrollbarHover,
    OkuScrollAreaScrollbarScroll,
    OkuScrollAreaScrollbarAuto,
    OkuScrollAreaScrollbarVisible,
  },
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarProps.props,
    ...scopedScrollAreaProps,
  },
  setup(props, { attrs, slots }) {
    const {
      forceMount,
      ...scrollAreaScrollbarProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarProps)
    const otherProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_SCROLLBAR_NAME, props.scopeOkuScrollArea)
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = inject
    const isHorizontal = computed(() => props.orientation === 'horizontal')

    watchEffect((onInvalidate) => {
      isHorizontal.value ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

      onInvalidate(() => {
        isHorizontal.value ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
      })
    })

    return () => [inject.type.value === 'hover'
      ? h(OkuScrollAreaScrollbarHover, {
        ...mergeProps(attrs, otherProps),
        ref: forwardedRef,
        forceMount: forceMount.value,
      }, () => slots.default?.())

      : inject.type.value === 'scroll'
        ? h(OkuScrollAreaScrollbarScroll, {
          ...mergeProps(attrs, otherProps),
          ref: forwardedRef,
          forceMount: forceMount.value,
        }, () => slots.default?.())

        : inject.type.value === 'auto'
          ? h(OkuScrollAreaScrollbarAuto, {
            ...mergeProps(attrs, otherProps),
            ref: forwardedRef,
            forceMount: forceMount.value,
          }, () => slots.default?.())

          : inject.type.value === 'always'
            ? h(OkuScrollAreaScrollbarVisible, {
              ...mergeProps(attrs, otherProps),
              ref: forwardedRef,
            }, () => slots.default?.())
            : null,
    ]
  },
})

export const OkuScrollAreaScrollbar = scrollAreaScrollbar as typeof scrollAreaScrollbar & (new () => { $props: ScrollAreaScrollbarNaviteElement })
