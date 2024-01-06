import { computed, defineComponent, h, mergeProps, ref } from 'vue'
import { propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuSliderThumbImpl, type SliderThumbImplElement, type SliderThumbImplNaviteElement, type SliderThumbImplProps, sliderThumbImplProps } from './sliderThumbImpl'
import { scopeSliderProps, useCollection } from './utils'

export const THUMB_NAME = 'OkuSliderThumb'

export type SliderThumbNaviteElement = SliderThumbImplNaviteElement
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
    const index = computed(() => (thumb.value ? getItems().findIndex(item => item.ref.value === thumb.value) : -1))

    return () => h(OkuSliderThumbImpl, {
      ...mergeProps(attrs, props),
      ref: composedRefs,
      index: index.value,
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderThumb = sliderThumb as typeof sliderThumb &
  (new () => {
    $props: SliderThumbNaviteElement
  })
