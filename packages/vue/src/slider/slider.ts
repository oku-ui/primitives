import type { PropType } from 'vue'
import { computed, defineComponent, h, mergeProps, reactive, ref, toRefs, useModel } from 'vue'
import type { AriaAttributes } from '@oku-ui/primitive'
import { propsOmit } from '@oku-ui/primitive'
import { reactiveOmit, useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { clamp } from '@oku-ui/utils'
import { ARROW_KEYS, CollectionProvider, CollectionSlot, type Direction, PAGE_KEYS, SLIDER_NAME, getClosestValueIndex, getDecimalCount, getNextSortedValues, hasMinStepsBetweenValues, roundValue, scopeSliderProps, sliderProvider } from './utils'
import type { SliderThumbElement } from './sliderThumb'
import { OkuSliderHorizontal, sliderHorizontalProps } from './sliderHorizontal'
import type { SliderHorizontalElement, SliderHorizontalEmits, SliderHorizontalNaviteElement, SliderOrientationPrivateProps } from './sliderHorizontal'
import type { SliderVerticalElement, SliderVerticalEmits, SliderVerticalNaviteElement, SliderVerticalProps } from './sliderVertical'
import { OkuSliderVertical, sliderVerticalProps } from './sliderVertical'
import { OkuBubbleInput } from './bubbleInput'

interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction
}

export type SliderNaviteElement = SliderHorizontalNaviteElement | SliderVerticalNaviteElement
export type SliderElement = SliderHorizontalElement | SliderVerticalElement

export interface SliderProps extends Omit<
SliderHorizontalProps | SliderVerticalProps,
keyof SliderOrientationPrivateProps | 'defaultValue'
> {
  name?: string
  disabled?: boolean
  orientation?: AriaAttributes['aria-orientation']
  dir?: Direction
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  value?: number[]
  defaultValue?: number[]
  inverted?: boolean
}

export type SliderPropsEmits = {
  valueChange: (value: number[]) => true
  valueCommit: (value: number[]) => true
} & SliderHorizontalEmits & SliderVerticalEmits

export const sliderProps = {
  props: {
    ...propsOmit(sliderHorizontalProps.props, [
      'min',
      'max',
      'inverted',
    ]),
    ...propsOmit(sliderVerticalProps.props, [
      'min',
      'max',
      'inverted',
    ]),
    modelValue: {
      type: Array as PropType<number[] | undefined>,
      default: undefined,
    },
    name: {
      type: String as PropType<string | undefined>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<boolean | undefined>,
      default: undefined,
    },
    orientation: {
      type: String as PropType<SliderProps['orientation']>,
      default: 'horizontal',
    },
    dir: {
      type: String as PropType<Direction>,
      default: undefined,
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    step: {
      type: Number,
      default: 1,
    },
    minStepsBetweenThumbs: {
      type: Number,
      default: 0,
    },
    value: {
      type: Array as PropType<number[] | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: Array as PropType<number[] | undefined>,
      default: [100],
    },
    inverted: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    ...sliderHorizontalProps.emits,
    ...sliderVerticalProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: number[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: number[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueCommit': (value: number[]) => true,
  },
}

const slider = defineComponent({
  name: SLIDER_NAME,
  inheritAttrs: false,
  props: {
    ...sliderProps.props,
    ...scopeSliderProps,
  },
  emits: sliderProps.emits,
  setup(props, { attrs, slots, emit }) {
    const {
      modelValue: _modelValue,
      orientation,
      defaultValue,
      step,
      min,
      max,
      disabled,
      minStepsBetweenThumbs,
      inverted,
      name,
      value,
      ...sliderProps
    } = toRefs(props)
    const _reactive = reactive(sliderProps)
    const reactiveSliderProps = reactiveOmit(_reactive, (key, _value) => key === undefined)

    const sliderRef = ref<HTMLSpanElement | null>(null)
    const forwardedRef = useForwardRef()
    const composedRefs = useComposedRefs(sliderRef, forwardedRef)

    // new Set()
    const initialThumbSet = new Set<SliderThumbElement>()
    const thumbRefs = ref(initialThumbSet)

    const valueIndexToChangeRef = ref<number>(0)
    const isHorizontal = orientation.value === 'horizontal'
    // We set this to true by default so that events bubble to forms without JS (SSR)
    const isFormControl = computed(() => {
      return false
    })
    const modelValue = useModel(props, 'modelValue')
    const proxyValue = computed({
      get: () => modelValue.value !== undefined ? modelValue.value : value.value !== undefined ? value.value : undefined,
      set: () => {
      },
    })

    const { state, updateValue } = useControllable({
      prop: computed(() => proxyValue.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        const thumbs = [...thumbRefs.value]
        thumbs[valueIndexToChangeRef.value]?.focus()
        modelValue.value = result
        emit('valueChange', result)
      },
      initialValue: [],
    })

    const valuesBeforeSlideStartRef = ref<number[]>(state.value as number[])
    function handleSlideStart(value: number) {
      const closestIndex = getClosestValueIndex(state.value || [], value)
      updateValues(value, closestIndex)
    }

    function handleSlideMove(value: number) {
      updateValues(value, valueIndexToChangeRef.value)
    }

    function handleSlideEnd() {
      const prevValue = valuesBeforeSlideStartRef.value[valueIndexToChangeRef.value]
      const nextValue = state.value?.[valueIndexToChangeRef.value]
      const hasChanged = nextValue !== prevValue
      if (hasChanged)
        emit('valueCommit', state.value || [])
    }

    function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
      const decimalCount = getDecimalCount(step.value)
      const snapToStep = roundValue(Math.round((value - min.value) / step.value) * step.value + min.value, decimalCount)
      const nextValue = clamp(snapToStep, [min.value, max.value])

      const prevValues = state.value
      const newData = () => {
        const nextValues = getNextSortedValues(prevValues, nextValue, atIndex)
        if (hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs.value * step.value)) {
          valueIndexToChangeRef.value = nextValues.indexOf(nextValue)
          const hasChanged = String(nextValues) !== String(prevValues)
          if (hasChanged && commit)
            emit('valueCommit', nextValues)
          return hasChanged ? nextValues : prevValues
        }
        else {
          return prevValues
        }
      }
      updateValue(newData())
    }

    sliderProvider({
      scope: props.scopeOkuSlider,
      disabled,
      min,
      max,
      valueIndexToChangeRef,
      thumbs: thumbRefs,
      values: state,
      orientation,
    })

    return () => {
      const SliderOrientation = isHorizontal ? OkuSliderHorizontal : OkuSliderVertical

      return [
        h(CollectionProvider, {
          scope: props.scopeOkuSlider,
        }, {
          default: () => h(CollectionSlot, {
            scope: props.scopeOkuSlider,
          }, {
            default: () => h(SliderOrientation, {
              'aria-disabled': disabled.value,
              'data-disabled': disabled.value ? '' : undefined,
              ...mergeProps(attrs, reactiveSliderProps),
              'ref': composedRefs,
              'min': min.value,
              'max': max.value,
              'inverted': inverted.value,
              'onPointerdown': () => {
                if (!disabled.value)
                  valuesBeforeSlideStartRef.value = state.value || []
              },
              'onSlideStart': (event) => {
                if (disabled.value)
                  emit('slideStart')

                else if (event)
                  handleSlideStart(event)
              },
              'onSlideMove': (event) => {
                if (disabled.value)
                  emit('slideMove')

                else if (event)
                  handleSlideMove(event)
              },
              'onSlideEnd': () => {
                if (disabled.value)
                  emit('slideEnd')

                else
                  handleSlideEnd()
              },
              'onHomeKeyDown': () => !disabled.value && updateValues(min.value, 0, { commit: true }),
              'onEndKeyDown': () =>
                !disabled.value && updateValues(max.value, (state.value?.length || 0) - 1, { commit: true }),
              'onStepKeyDown': ({ direction: stepDirection, event }) => {
                if (!disabled.value) {
                  const isPageKey = PAGE_KEYS.includes(event.key)
                  const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key))
                  const multiplier = isSkipKey ? 10 : 1
                  const atIndex = valueIndexToChangeRef.value
                  const value = state.value?.[atIndex]
                  const stepInDirection = step.value * multiplier * stepDirection
                  updateValues((value || 0) + stepInDirection, atIndex, { commit: true })
                }
              },
            }, slots),
          }),
        }),
        isFormControl.value && state.value?.map((_value, index) => h(OkuBubbleInput, {
          key: index,
          name: name.value ? name.value + ((state.value || []).length > 1 ? '[]' : '') : undefined,
          // TODO: value type error
          value: _value as any,
        }),
        ),
      ]
    }
  },
})

// TODO: https://github.com/vuejs/core/pull/7444 after delete
export const OkuSlider = slider as typeof slider &
  (new () => {
    $props: SliderNaviteElement
  })
