<script setup lang="ts">
import { type PropType, computed, watchEffect } from 'vue'
import { useControllableState, useForwardElement, useRef } from '../hooks/index.ts'
import { isNumber } from '../utils/is.ts'
import { clamp, getDecimalCount, roundValue } from '../utils/number.ts'
import { composeEventHandlers } from '../utils/vue.ts'
import { useDirection } from '../direction/Direction.ts'
import { Primitive } from '../primitive/index.ts'
import { ARROW_KEYS, BACK_KEYS, Collection, PAGE_KEYS, type SliderContext, type SliderRootEmits, type SliderRootProps, provideSliderContext } from './SliderRoot.ts'
import { getClosestValueIndex, getNextSortedValues, hasMinStepsBetweenValues, linearScale } from './utils.ts'
import { provideSliderOrientationContext } from './SliderOrientation.ts'

defineOptions({
  name: 'SliderRoot',
})

const props = defineProps({
  as: {
    type: [String, Object] as PropType<SliderRootProps['as']>,
    required: false,
    default: 'span',
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
    type: String as PropType<Required<SliderRootProps>['orientation']>,
    required: false,
    default: 'horizontal',
  },
  dir: {
    type: String as PropType<Required<SliderRootProps>['dir']>,
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
    type: [Array] as PropType<Required<SliderRootProps>['value']>,
    required: false,
    default: undefined,
  },
  defaultValue: {
    type: [Array] as PropType<Required<SliderRootProps>['defaultValue']>,
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
const emit = defineEmits<SliderRootEmits>()
const $el = useRef<HTMLSpanElement>()
const forwardElement = useForwardElement($el)

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

function onSliderSlideStart(value: number) {
  if (props.disabled)
    return
  const closestIndex = getClosestValueIndex(values.value, value)
  updateValues(value, closestIndex)
}

function onSliderSlideMove(value: number) {
  if (props.disabled)
    return
  updateValues(value, valueIndexToChangeRef.value)
}

function onSliderSlideEnd() {
  if (props.disabled)
    return
  const prevValue = valuesBeforeSlideStartRef[valueIndexToChangeRef.value]
  const nextValue = values.value[valueIndexToChangeRef.value]
  const hasChanged = nextValue !== prevValue
  if (hasChanged)
    emit('valueCommit', values.value)
}

function onSliderHomeKeyDown() {
  if (props.disabled)
    return

  updateValues(props.min, 0, { commit: true })
}

function onSliderEndKeyDown() {
  if (props.disabled)
    return

  updateValues(props.max, values.value.length - 1, { commit: true })
}

function onSliderStepKeydown({ event, direction: stepDirection }: { event: KeyboardEvent, direction: number }) {
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

function onSliderPointerdown() {
  if (!props.disabled)
    valuesBeforeSlideStartRef = values.value
}

Collection.provideCollectionContext($el)

provideSliderContext({
  name() {
    return props.name
  },
  disabled() {
    return props.disabled
  },
  min() {
    return props.min
  },
  max() {
    return props.max
  },
  valueIndexToChangeRef,
  thumbs: thumbRefs,
  values,
  orientation() {
    return props.orientation
  },
})

// SliderOrientation

const isHorisontal = () => props.orientation === 'horizontal'

interface OrientationLocalState {
  readonly reactSise: 'width' | 'height'
  readonly rectStartEdge: 'left' | 'top'
  readonly clientEdge: 'x' | 'y'
  readonly slideDirectionSte: 'from-left' | 'from-bottom'
  readonly slideDirectionEts: 'from-right' | 'from-top'
}

let orientationLocalState: OrientationLocalState

watchEffect(() => {
  const _isHorisontal = isHorisontal()
  orientationLocalState = {
    reactSise: _isHorisontal ? 'width' : 'height',
    rectStartEdge: _isHorisontal ? 'left' : 'top',
    clientEdge: _isHorisontal ? 'x' : 'y',
    slideDirectionSte: _isHorisontal ? 'from-left' : 'from-bottom',
    slideDirectionEts: _isHorisontal ? 'from-right' : 'from-top',
  }
})

let rectRef: DOMRect | undefined
const direction = useDirection(() => props.dir)

const isSlidingFromStart = computed(() => {
  if (isHorisontal()) {
    const isLtr = direction.value === 'ltr'
    return (isLtr && !props.inverted) || (!isLtr && props.inverted)
  }

  return !props.inverted
})

function getValueFromPointer(pointerPosition: number) {
  const rect = rectRef || $el.current!.getBoundingClientRect()
  const input: [number, number] = [0, rect[orientationLocalState.reactSise]]
  const output: [number, number] = isSlidingFromStart.value === isHorisontal() ? [props.min, props.max] : [props.max, props.min]
  const value = linearScale(input, output)

  rectRef = rect

  return value(pointerPosition - rect[orientationLocalState.rectStartEdge])
}

function onOrientationSlideStart(event: PointerEvent) {
  const value = getValueFromPointer(event[orientationLocalState.clientEdge])
  onSliderSlideStart(value)
}

function onOrientationSlideMove(event: PointerEvent) {
  const value = getValueFromPointer(event[orientationLocalState.clientEdge])
  onSliderSlideMove(value)
}

function onOrientationSlideEnd() {
  rectRef = undefined
  onSliderSlideEnd()
}

function onOrientationStepKeydown(event: KeyboardEvent) {
  const slideDirection = isSlidingFromStart.value ? orientationLocalState.slideDirectionSte : orientationLocalState.slideDirectionEts
  const isBackKey = BACK_KEYS[slideDirection].includes(event.key)
  onSliderStepKeydown({ event, direction: isBackKey ? -1 : 1 })
}

const orientationContext = computed(() => {
  const _isHorisontal = isHorisontal()
  const _startEdge = _isHorisontal ? 'left' : 'bottom'
  const _endEdge = _isHorisontal ? 'right' : 'top'

  const startEdge = isSlidingFromStart.value ? _startEdge : _endEdge
  const endEdge = isSlidingFromStart.value ? _endEdge : _startEdge
  const direction = isSlidingFromStart.value ? 1 : -1
  const size = _isHorisontal ? 'width' : 'height'

  return { startEdge, endEdge, direction, size } as const
})

provideSliderOrientationContext(orientationContext)

// SliderImpl

const onKeydown = composeEventHandlers<KeyboardEvent>((event) => {
  emit('keydown', event)
}, (event) => {
  if (event.key === 'Home') {
    onSliderHomeKeyDown()
    // Prevent scrolling to page start
    event.preventDefault()
  }
  else if (event.key === 'End') {
    onSliderEndKeyDown()
    // Prevent scrolling to page end
    event.preventDefault()
  }
  else if (PAGE_KEYS.concat(ARROW_KEYS).includes(event.key)) {
    onOrientationStepKeydown(event)
    // Prevent scrolling for directional key presses
    event.preventDefault()
  }
})

const onPointerdown = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerdown', event)
}, (event) => {
  onSliderPointerdown()

  const target = event.target as HTMLElement
  target.setPointerCapture(event.pointerId)
  // Prevent browser focus behaviour because we focus a thumb manually when values change.
  event.preventDefault()
  // Touch devices have a delay before focusing so won't focus if touch immediately moves
  // away from target (sliding). We want thumb to focus regardless.
  if (thumbRefs.has(target)) {
    target.focus()
  }
  else {
    onOrientationSlideStart(event)
  }
})

const onPointermove = composeEventHandlers<PointerEvent>((event) => {
  emit('pointermove', event)
}, (event) => {
  const target = event.target as HTMLElement
  if (target.hasPointerCapture(event.pointerId))
    onOrientationSlideMove(event)
})

const onPointerup = composeEventHandlers<PointerEvent>((event) => {
  emit('pointerup', event)
}, (event) => {
  const target = event.target as HTMLElement
  if (target.hasPointerCapture(event.pointerId)) {
    target.releasePointerCapture(event.pointerId)
    onOrientationSlideEnd()
  }
})
</script>

<template>
  <Primitive
    :ref="forwardElement"
    :as="as"
    :dir="direction"
    :data-orientation="orientation"
    :aria-disabled="disabled"
    :data-disabled="disabled ? '' : undefined"
    :style="orientation === 'horizontal' ? '--radix-slider-thumb-transform: translateX(-50%)' : '--radix-slider-thumb-transform: translateY(50%)'"
    @keydown="onKeydown"
    @pointerdown="onPointerdown"
    @pointermove="onPointermove"
    @pointerup="onPointerup"
  >
    <slot />
  </Primitive>
</template>
