import { computed, defineComponent, h, ref } from 'vue'
import { propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuSliderThumbImpl, type SliderThumbImplElement, type SliderThumbImplIntrinsicElement, type SliderThumbImplProps, sliderThumbImplProps } from './sliderThumbImpl'
import { scopeSliderProps, useCollection } from './utils'

export const THUMB_NAME = 'OkuSliderThumb'

export type SliderThumbIntrinsicElement = SliderThumbImplIntrinsicElement
export type SliderThumbElement = SliderThumbImplElement

export interface SliderThumbProps extends Omit<SliderThumbImplProps, 'index'> {}

export const sliderThumbProps = {
  props: {
    ...propsOmit(sliderThumbImplProps.props, ['index']),
  },
  emits: {
    ...sliderThumbImplProps.emits,
  },
}

const sliderThumb = defineComponent({
  name: THUMB_NAME,
  inheritAttrs: false,
  props: {
    ...sliderThumbProps.props,
    ...scopeSliderProps,
  },
  emits: sliderThumbProps.emits,
  setup(props, { attrs, slots }) {
    const getItems = useCollection(props.scopeOkuSlider)
    const thumb = ref<SliderThumbImplElement | null>(null)

    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(forwardedRef, thumb)

    // TODO: item.ref.value -react
    const index = computed(() => thumb.value ? getItems.value.findIndex(item => item.ref === thumb.value) : -1)

    return () => h(OkuSliderThumbImpl, {
      ...attrs,
      ref: composedRefs,
      index: index.value,
    }, {
      default: () => slots.default?.(),
    })
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderThumb = sliderThumb as typeof sliderThumb &
(new () => {
  $props: Partial<SliderThumbElement>
})
