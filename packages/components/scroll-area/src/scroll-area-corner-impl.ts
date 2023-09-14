import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useForwardRef } from '@oku-ui/use-composable'
import { Primitive } from '@oku-ui/primitive'
import { useResizeObserver } from './utils'
import type { ScrollAreaCornerImplNaviteElement } from './props'
import { SCROLL_AREA_CORNER_IMPL_NAME, scopedScrollAreaProps, scrollAreaCornerImplProps, useScrollAreaInject } from './props'

const scrollAreaCornerImpl = defineComponent({
  name: SCROLL_AREA_CORNER_IMPL_NAME,
  inheritAttrs: false,
  props: {
    ...scrollAreaCornerImplProps.props,
    ...scopedScrollAreaProps,
  },
  emits: scrollAreaCornerImplProps.emits,
  setup(props, { attrs, slots }) {
    const {
      scopeOkuScrollArea,
      ...scrollAreaCornerImplProps
    } = toRefs(props)

    const _reactive = reactive(scrollAreaCornerImplProps)
    const reactiveScrollAreaCornerImplProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const forwardedRef = useForwardRef()

    const inject = useScrollAreaInject(SCROLL_AREA_CORNER_IMPL_NAME, scopeOkuScrollArea.value)
    const width = ref<number>(0)
    const height = ref<number>(0)
    const hasSize = computed(() => Boolean(width.value && height.value))

    useResizeObserver(inject.scrollbarX.value, () => {
      const _height = inject.scrollbarX.value?.offsetHeight || 0
      inject.onCornerHeightChange(_height)
      height.value = _height
    })

    useResizeObserver(inject.scrollbarY.value, () => {
      const _width = inject.scrollbarY.value?.offsetWidth || 0
      inject.onCornerWidthChange(_width)
      width.value = _width
    })

    return () => hasSize.value
      ? h(Primitive.div,
        {
          ...mergeProps(attrs, reactiveScrollAreaCornerImplProps),
          ref: forwardedRef,
          style: {
            width: width.value,
            height: height.value,
            position: 'absolute',
            right: inject.dir.value === 'ltr' ? '0px' : undefined,
            left: inject.dir.value === 'rtl' ? '0px' : undefined,
            bottom: 0,
            ...attrs.style as CSSStyleRule,
          },
        }, slots,
      )
      : null
  },
})

export const OkuScrollAreaCornerImpl = scrollAreaCornerImpl as typeof scrollAreaCornerImpl &
(new () => { $props: ScrollAreaCornerImplNaviteElement })
