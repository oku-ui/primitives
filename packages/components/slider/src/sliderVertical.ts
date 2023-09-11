import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { OkuSliderImpl, type SliderImplElement, type SliderImplNaviteElement } from './sliderImpl'
import { BACK_KEYS, linearScale, scopeSliderProps, sliderOrientationProvider } from './utils'
import type { SliderOrientationEmits, SliderOrientationProps } from './sliderHorizontal'
import { sliderOrientationProps } from './sliderHorizontal'

export type SliderVerticalNaviteElement = SliderImplNaviteElement
export type SliderVerticalElement = SliderImplElement

const NAME = 'OkuSliderVertical'

export interface SliderVerticalProps extends SliderOrientationProps { }

export type SliderVerticalEmits = SliderOrientationEmits

export const sliderVerticalProps = {
  props: {
    ...sliderOrientationProps.props,
  },
  emits: {
    ...sliderOrientationProps.emits,
  },
}

const SliderVertical = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...sliderVerticalProps.props,
    ...scopeSliderProps,
  },
  emits: sliderVerticalProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      min,
      max,
      inverted,
      ...sliderProps
    } = toRefs(props)
    const _reactive = reactive(sliderProps)
    const reactiveSliderProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const slider = ref<SliderImplElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(slider, forwardedRef)
    const isSlidingFromBottom = computed(() => !inverted.value)

    const rectRef = ref<ClientRect >()

    function getValueFromPointer(pointerPosition: number) {
      const rect = rectRef.value || slider.value!.getBoundingClientRect()
      const input: [number, number] = [0, rect.height]
      const output: [number, number] = isSlidingFromBottom.value ? [max.value!, min.value!] : [min.value!, max.value!]
      const value = linearScale(input, output)

      rectRef.value = rect
      return value(pointerPosition - rect.top)
    }

    sliderOrientationProvider({
      scope: props.scopeOkuSlider,
      startEdge: computed(() => isSlidingFromBottom.value ? 'bottom' : 'top'),
      endEdge: computed(() => isSlidingFromBottom.value ? 'top' : 'bottom'),
      direction: computed(() => isSlidingFromBottom.value ? 1 : -1),
      size: ref('height'),
    })

    return () => h(OkuSliderImpl, {
      'data-orientation': 'vertical',
      ...mergeProps(attrs, reactiveSliderProps),
      'ref': composedRefs,
      'style': {
        ...attrs.style as any,
        ['--oku-slider-thumb-transform' as any]: 'translateY(50%)',
      },
      'onSlideStart': (event: PointerEvent) => {
        const value = getValueFromPointer(event.clientY)
        // bug ts interface: https://github.com/mesqueeb/filter-anything/issues/18
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emit('slideStart', value)
      },
      'onSlideMove': (event: PointerEvent) => {
        const value = getValueFromPointer(event.clientY)
        // bug ts interface: https://github.com/mesqueeb/filter-anything/issues/18
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emit('slideStart', value)
      },
      'onSlideEnd': () => {
        rectRef.value = undefined
        // bug ts interface: https://github.com/mesqueeb/filter-anything/issues/18
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emit('slideEnd')
      },
      'onStepKeyDown': (event: KeyboardEvent) => {
        const slideDirection = isSlidingFromBottom.value ? 'from-bottom' : 'from-top'
        const isBackKey = BACK_KEYS[slideDirection].includes(event.key)

        // bug ts interface: https://github.com/mesqueeb/filter-anything/issues/18
        // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
        // @ts-ignore
        emit('stepKeyDown', { event, direction: isBackKey ? -1 : 1 })
      },
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderVertical = SliderVertical as typeof SliderVertical &
(new () => {
  $props: SliderVerticalNaviteElement
})
