<script setup lang="ts">
import { type PropType, shallowRef, toRef, useAttrs } from 'vue'
import { useControllableState } from '../hooks/useControllableState.ts'
import { isFunction, isNumber } from '../utils/is.ts'
import { clamp, getDecimalCount, roundValue } from '../utils/number.ts'
import { composeEventHandlers } from '../utils/composeEventHandlers.ts'
import { ARROW_KEYS, Collection, PAGE_KEYS, type SliderContext, type SliderProps, provideSliderContext } from './Slider.ts'
import { getClosestValueIndex, getNextSortedValues, hasMinStepsBetweenValues } from './utils.ts'
import SliderHorizontal from './SliderHorizontal.vue'
import SliderVertical from './SliderVertical.vue'

defineOptions({
  name: 'Slider',
  inheritAttrs: false,
})

const props = defineProps({
  as: {
    type: [String, Object] as PropType<SliderProps['as']>,
    required: false,
    default: 'span',
  },
  asChild: {
    type: [String, Object] as PropType<SliderProps['asChild']>,
    required: false,
    default: undefined,
  },
  name: {
    type: String,
    required: false,
    default: undefined,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false,
  },
  orientation: {
    type: String as PropType<Required<SliderProps>['orientation']>,
    required: false,
    default: 'horizontal',
  },
  dir: {
    type: String as PropType<Required<SliderProps>['dir']>,
    required: false,
    default: undefined,
  },
  min: {
    type: Number,
    required: false,
    default: 0,
  },
  max: {
    type: Number,
    rqeuired: false,
    default: 100,
  },
  step: {
    type: Number,
    required: false,
    default: 1,
  },
  minStepsBetweenThumbs: {
    type: Number,
    required: false,
    default: 0,
  },
  value: {
    type: [Array] as PropType<Required<SliderProps>['value']>,
    required: false,
    default: undefined,
  },
  defaultValue: {
    type: [Array] as PropType<Required<SliderProps>['defaultValue']>,
    required: false,
    default(rawProps: Record<string, unknown>) {
      return isNumber(rawProps.min) ? [rawProps.min] : [0]
    },
  },
  inverted: {
    type: Boolean,
    required: false,
    default: false,
  },
})
const emit = defineEmits<{
  'update:value': [value: number[]]
  'valueCommit': [value: number[]]
}>()
const attrs = useAttrs()
const elRef = shallowRef<HTMLSpanElement>()

const thumbRefs: SliderContext['thumbs'] = new Set()
const valueIndexToChangeRef: SliderContext['valueIndexToChangeRef'] = { value: 0 }

const values = useControllableState(
  props,
  (v) => {
    const thumbs = Array.from(thumbRefs)
    thumbs[valueIndexToChangeRef.value]?.focus()
    emit('update:value', v)
  },
  'value',
  props.defaultValue,
)

let valuesBeforeSlideStartRef = values.value

function handleSlideStart(value: number) {
  if (props.disabled)
    return
  const closestIndex = getClosestValueIndex(values.value, value)
  updateValues(value, closestIndex)
}

function handleSlideMove(value: number) {
  if (props.disabled)
    return
  updateValues(value, valueIndexToChangeRef.value)
}

function handleSlideEnd() {
  if (props.disabled)
    return
  const prevValue = valuesBeforeSlideStartRef[valueIndexToChangeRef.value]
  const nextValue = values.value[valueIndexToChangeRef.value]
  const hasChanged = nextValue !== prevValue
  if (hasChanged)
    emit('valueCommit', values.value)
}

function handleStepKeydown({ event, direction: stepDirection }: { event: KeyboardEvent, direction: number }) {
  if (props.disabled)
    return
  const isPageKey = PAGE_KEYS.includes(event.key)
  const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key))
  const multiplier = isSkipKey ? 10 : 1
  const atIndex = valueIndexToChangeRef.value
  const value = values.value[atIndex]!
  const stepInDirection = props.step * multiplier * stepDirection
  updateValues(value + stepInDirection, atIndex, { commit: true })
}

function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
  const decimalCount = getDecimalCount(props.step)
  const snapToStep = roundValue(Math.round((value - props.min) / props.step) * props.step + props.min, decimalCount)
  const nextValue = clamp(snapToStep, [props.min, props.max])

  const prevValues = values.value
  const nextValues = getNextSortedValues(values.value, nextValue, atIndex)
  if (hasMinStepsBetweenValues(nextValues, props.minStepsBetweenThumbs * props.step)) {
    valueIndexToChangeRef.value = nextValues.indexOf(nextValue)
    const hasChanged = String(nextValues) !== String(prevValues)
    if (hasChanged && commit)
      emit('valueCommit', nextValues)
    values.value = nextValues
  }
}

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  isFunction(attrs.onPointerdown) && attrs.onPointerdown(event)
}, () => {
  if (!props.disabled)
    valuesBeforeSlideStartRef = values.value
})

Collection.provideCollectionContext(elRef)

provideSliderContext({
  name: toRef(props, 'name'),
  disabled: toRef(props, 'disabled'),
  min: toRef(props.min),
  max: toRef(props.max),
  valueIndexToChangeRef,
  thumbs: thumbRefs,
  values,
  orientation: toRef(props.orientation),
})
</script>

<template>
  <component
    :is="orientation === 'horizontal' ? SliderHorizontal : SliderVertical"
    :ref="(el: any) => elRef = el?.$el"
    :as="as"
    :as-child="asChild"
    :aria-disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :dir="dir"
    v-bind="{
      ...attrs,
      onPointerdown,
    }"
    :min="min"
    :max="max"
    :inverted="inverted"
    @slide-start="handleSlideStart"
    @slide-move="handleSlideMove"
    @slide-end="handleSlideEnd"
    @step-keydown="handleStepKeydown"
  >
    <slot />
  </component>
</template>
