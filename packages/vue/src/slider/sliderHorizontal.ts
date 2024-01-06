import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs } from 'vue'
import { propsOmit } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useForwardRef } from '@oku-ui/use-composable'
import { useDirection } from '@oku-ui/direction'
import { OkuSliderImpl, type SliderImplElement, type SliderImplEmits, type SliderImplNaviteElement, type SliderImplProps, sliderImplProps } from './sliderImpl'
import type { Direction } from './utils'
import { BACK_KEYS, linearScale, scopeSliderProps, sliderOrientationProvider } from './utils'

export type SliderHorizontalNaviteElement = SliderImplNaviteElement
export type SliderHorizontalElement = SliderImplElement

const NAME = 'OkuSliderHorizontal'

export interface SliderOrientationPrivateProps {
  min: number
  max: number
  inverted: boolean
}

export type SliderOrientationPrivateEmits = {
  'slideStart'?: [value: number]
  'slideMove'?: [value: number]
  'slideEnd'?: []
  'homeKeyDown': [event: KeyboardEvent]
  'endKeyDown': [event: KeyboardEvent]
  'stepKeyDown': [step: { event: KeyboardEvent, direction: number }]
}

export const sliderOrientationPrivateProps = {
  props: {
    min: {
      type: Number as PropType<number>,
      required: true,
    },
    max: {
      type: Number,
    },
    inverted: {
      type: Boolean,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    slideStart: (value?: number) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    slideMove: (value?: number) => true,
    slideEnd: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    homeKeyDown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    endKeyDown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    stepKeyDown: (step: { event: KeyboardEvent, direction: number }) => true,
  },
}

export interface SliderOrientationProps
  extends SliderImplProps,
  SliderOrientationPrivateProps { }

export type SliderOrientationEmits = Omit<SliderImplEmits, keyof SliderOrientationPrivateEmits>

export const sliderOrientationProps = {
  props: {
    ...sliderOrientationPrivateProps.props,
    ...sliderImplProps.props,
  },
  emits: {
    ...propsOmit(sliderImplProps.emits, [
      'slideStart',
      'slideMove',
      'slideEnd',
      'homeKeyDown',
      'endKeyDown',
      'stepKeyDown',
    ]),
    ...sliderOrientationPrivateProps.emits,
  },
}

export interface SliderHorizontalProps extends SliderOrientationProps {
  dir?: Direction
}
export type SliderHorizontalEmits = SliderOrientationEmits & SliderOrientationEmits

export const sliderHorizontalProps = {
  props: {
    ...sliderOrientationProps.props,
    dir: {
      type: String as PropType<Direction>,
      required: false,
    },
  },
  emits: {
    ...sliderOrientationProps.emits,
  },
}

const sliderHorizontal = defineComponent({
  name: NAME,
  inheritAttrs: false,
  props: {
    ...sliderHorizontalProps.props,
    ...scopeSliderProps,
  },
  emits: sliderHorizontalProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      min,
      max,
      dir,
      inverted,
      ...sliderProps
    } = toRefs(props)
    const _reactive = reactive(sliderProps)
    const reactiveSliderProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const slider = ref<SliderImplElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(slider, forwardedRef)

    const rectRef = ref<ClientRect>()

    const direction = useDirection(dir)
    const isDirectionLTR = computed(() => direction.value === 'ltr')
    const isSlidingFromLeft = computed(() => (isDirectionLTR.value && !inverted.value) || (!isDirectionLTR.value && inverted.value))

    function getValueFromPointer(pointerPosition: number) {
      const rect = rectRef.value || slider.value!.getBoundingClientRect()
      const input: [number, number] = [0, rect.width]
      const output: [number, number] = isSlidingFromLeft.value ? [min.value!, max.value!] : [max.value!, min.value!]
      const value = linearScale(input, output)

      rectRef.value = rect
      return value(pointerPosition - rect.left)
    }

    sliderOrientationProvider({
      scope: props.scopeOkuSlider,
      startEdge: computed(() => isSlidingFromLeft.value ? 'left' : 'right'),
      endEdge: computed(() => isSlidingFromLeft.value ? 'right' : 'left'),
      direction: computed(() => isSlidingFromLeft.value ? 1 : -1),
      size: ref('width'),
    })

    return () => h(OkuSliderImpl, {
      'dir': direction.value,
      'data-orientation': 'horizontal',
      ...mergeProps(attrs, reactiveSliderProps),
      'ref': composedRefs,
      'style': {
        ...attrs.style as any,
        ['--oku-slider-thumb-transform' as any]: 'translateX(-50%)',
      },
      'onSlideStart': (event: PointerEvent) => {
        const value = getValueFromPointer(event.clientX)
        emit('slideStart', value)
      },
      'onSlideMove': (event: PointerEvent) => {
        const value = getValueFromPointer(event.clientX)
        emit('slideMove', value)
      },
      'onSlideEnd': () => {
        rectRef.value = undefined
        emit('slideEnd')
      },
      'onStepKeyDown': (event: KeyboardEvent) => {
        const slideDirection = isSlidingFromLeft.value ? 'from-left' : 'from-right'
        const isBackKey = BACK_KEYS[slideDirection].includes(event.key)
        emit('stepKeyDown', { event, direction: isBackKey ? -1 : 1 })
      },
    }, slots)
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSliderHorizontal = sliderHorizontal as typeof sliderHorizontal &
  (new () => {
    $props: SliderHorizontalNaviteElement
  })
