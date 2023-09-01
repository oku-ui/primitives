import type { PropType } from 'vue'
import { computed, defineComponent, h, ref, toRefs, useModel } from 'vue'
import type { AriaAttributes } from '@oku-ui/primitive'
import { propsOmit } from '@oku-ui/primitive'
import { useComposedRefs, useControllable, useForwardRef } from '@oku-ui/use-composable'
import { clamp } from '@oku-ui/utils'
import { ARROW_KEYS, CollectionProvider, CollectionSlot, type Direction, PAGE_KEYS, SLIDER_NAME, type ScopeSlider, getClosestValueIndex, getDecimalCount, getNextSortedValues, hasMinStepsBetweenValues, roundValue, scopeSliderProps, sliderProvider } from './utils'
import type { SliderThumbElement } from './sliderThumb'
import { OkuSliderHorizontal, type SliderHorizontalElement, type SliderHorizontalIntrinsicElement, type SliderOrientationPrivateProps, sliderHorizontalProps } from './sliderHorizontal'
import type { SliderVerticalElement, SliderVerticalIntrinsicElement, SliderVerticalProps } from './sliderVertical'
import { OkuSliderVertical, sliderVerticalProps } from './sliderVertical'
import { OkuBubbleInput } from './bubbleInput'

interface SliderHorizontalProps extends SliderOrientationPrivateProps {
  dir?: Direction
}

export type SliderIntrinsicElement = SliderHorizontalIntrinsicElement | SliderVerticalIntrinsicElement
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
}

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
    defaultValue: {
      type: Array as PropType<number[] | undefined>,
      default: undefined,
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
    valueChange: (value: number[]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueCommit: (value: number[]) => true,
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
    const { ...restAttrs } = attrs as SliderIntrinsicElement

    const {
      orientation,
      defaultValue,
      step,
      min,
      max,
      disabled,
      minStepsBetweenThumbs,
      asChild,
      inverted,
      name,
    } = toRefs(props)

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
    const prop = computed({
      get: () => modelValue.value,
      set: () => {
      },
    })
    const { state, updateValue } = useControllable({
      prop: computed(() => prop.value),
      defaultProp: computed(() => defaultValue.value),
      onChange: (result: any) => {
        const thumbs = [...thumbRefs.value]
        thumbs[valueIndexToChangeRef.value]?.focus()
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
      const sliderOrientation = computed(() => isHorizontal ? OkuSliderHorizontal : OkuSliderVertical)
      return [
        h(CollectionProvider,
          {
            scope: props.scopeOkuSlider,
          },
          {
            default: () => h(CollectionSlot, {
              scope: props.scopeOkuSlider,
            },
            {
              default: () => h(sliderOrientation, {
                'aria-disabled': disabled.value,
                'data-disabled': disabled.value ? '' : undefined,
                ...restAttrs,
                'ref': composedRefs,
                'asChild': asChild.value,
                'min': min.value,
                'max': max.value,
                'inverted': inverted.value,
                //* ****xxx */
                'onPointerdown': () => {
                  if (!disabled.value)
                    valuesBeforeSlideStartRef.value = state.value || []
                },
                'onSlideStart': disabled.value ? undefined : handleSlideStart,
                'onChange': (value: number[]) => {
                  const thumbs = [...thumbRefs.value]
                  thumbs[valueIndexToChangeRef.value]?.focus()
                  emit('valueChange', value)
                },
                'onSlideMove': disabled.value ? undefined : handleSlideMove,
                'onSlideEnd': disabled.value ? undefined : handleSlideEnd,
                'onHomeKeyDown': () => !disabled.value && updateValues(min.value, 0, { commit: true }),
                'onEndKeyDown': () =>
                  !disabled.value && updateValues(max.value, (state.value?.length || 0) - 1, { commit: true }),
                'onStepKeyDown': (event: any, direction: number) => {
                  const stepDirection = direction
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
              },
              {
                default: () => slots.default?.(),
              }),
            }),
          }),
        isFormControl.value && state.value?.map((_value, index) =>
          h(OkuBubbleInput, {
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
  $props: ScopeSlider<Partial<SliderElement>>
})

export {
  sliderProvider,
}
