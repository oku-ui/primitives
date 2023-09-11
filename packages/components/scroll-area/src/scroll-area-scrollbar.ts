import { computed, defineComponent, h, mergeProps, reactive, toRefs, watchEffect } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { OkuScrollAreaScrollbarVisible } from './scroll-area-scrollbar-visible'
import { OkuScrollAreaScrollbarScroll } from './scroll-area-scrollbar-scroll'
import { OkuScrollAreaScrollbarAuto } from './scroll-area-scrollbar-auto'
import { OkuScrollAreaScrollbarHover } from './scroll-area-scrollbar-hover'
import type { ScrollAreaScrollbarNaviteElement } from './props'
import { SCROLL_AREA_NAME, SCROLL_AREA_SCROLLBAR_NAME, scopedScrollAreaProps, scrollAreaScrollbarProps, useScrollAreaInject } from './props'

const scrollAreaScrollbar = defineComponent({
  name: SCROLL_AREA_SCROLLBAR_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaScrollbarProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaScrollbarProps.emits,
  setup(props, { attrs, slots }) {
    const {
      forceMount,
      ...scrollAreaScrollbarProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaScrollbarProps)
    const reactiveScrollAreaScrollbarProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_NAME, props.scopeOkuScrollArea)
    const { onScrollbarXEnabledChange, onScrollbarYEnabledChange } = inject
    const isHorizontal = computed(() => _reactive.orientation === 'horizontal')

    watchEffect((onInvalidate) => {
      isHorizontal.value ? onScrollbarXEnabledChange(true) : onScrollbarYEnabledChange(true)

      onInvalidate(() => {
        isHorizontal.value ? onScrollbarXEnabledChange(false) : onScrollbarYEnabledChange(false)
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
(new () => { $props: ScrollAreaScrollbarNaviteElement })
