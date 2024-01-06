import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { clamp } from '@oku-ui/utils'
import { createCollection } from '@oku-ui/collection'
import { type Ref, ref } from 'vue'
import type { useSize } from '@oku-ui/use-composable'
import type { SliderProps } from './slider'
import type { SliderThumbElement } from './sliderThumb'

export const SLIDER_NAME = 'OkuSlider'

export type ScopeSlider<T> = T & { scopeOkuSlider?: Scope }

export const scopeSliderProps = {
  scopeOkuSlider: {
    ...ScopePropObject,
  },
}

export const { CollectionProvider, CollectionItemSlot, CollectionSlot, useCollection, createCollectionScope } = createCollection<SliderThumbElement>(SLIDER_NAME)

export const [createSliderProvider, createSliderScope] = createProvideScope(SLIDER_NAME, [
  createCollectionScope,
])

type SliderProvideValue = {
  disabled?: Ref<boolean | undefined>
  min: Ref<number>
  max: Ref<number>
  values: Ref<number[] | undefined>
  valueIndexToChangeRef: Ref<number>
  thumbs: Ref<Set<SliderThumbElement>>
  orientation: Ref<SliderProps['orientation']>
}

export const [sliderProvider, useSliderInject]
  = createSliderProvider<SliderProvideValue>(SLIDER_NAME)

type Side = 'top' | 'right' | 'bottom' | 'left'

interface SliderHorizontalProvide {
  startEdge: Ref<Side>
  endEdge: Ref<Side>
  size: Ref<keyof NonNullable<ReturnType<typeof useSize>['value']>>
  direction: Ref<number>
}

export const [sliderOrientationProvider, useSliderOrientationInject] = createSliderProvider<SliderHorizontalProvide>(SLIDER_NAME, {
  startEdge: ref('left'),
  endEdge: ref('right'),
  size: ref('width'),
  direction: ref(1),
})

export type SliderState = boolean | string | number | undefined | 'indeterminate'

export type Direction = 'ltr' | 'rtl'

export const PAGE_KEYS = ['PageUp', 'PageDown']
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top'
export const BACK_KEYS: Record<SlideDirection, string[]> = {
  'from-left': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-right': ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
  'from-bottom': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-top': ['Home', 'PageDown', 'ArrowUp', 'ArrowLeft'],
}

export function getNextSortedValues(prevValues: number[] = [], nextValue: number, atIndex: number) {
  const nextValues = [...prevValues]
  nextValues[atIndex] = nextValue
  return nextValues.sort((a, b) => a - b)
}

export function convertValueToPercentage(value: number, min: number, max: number) {
  const maxSteps = max - min
  const percentPerStep = 100 / maxSteps
  const percentage = percentPerStep * (value - min)
  return clamp(percentage, [0, 100])
}

/**
 * Returns a label for each thumb when there are two or more thumbs
 */
export function getLabel(index: number, totalValues: number) {
  if (totalValues > 2)
    return `Value ${index + 1} of ${totalValues}`

  else if (totalValues === 2)
    return ['Minimum', 'Maximum'][index]

  else
    return undefined
}

/**
 * Given a `values` array and a `nextValue`, determine which value in
 * the array is closest to `nextValue` and return its index.
 *
 * @example
 * // returns 1
 * getClosestValueIndex([10, 30], 25);
 */
export function getClosestValueIndex(values: number[], nextValue: number) {
  if (values.length === 1)
    return 0
  const distances = values.map(value => Math.abs(value - nextValue))
  const closestDistance = Math.min(...distances)
  return distances.indexOf(closestDistance)
}

/**
 * Offsets the thumb centre point while sliding to ensure it remains
 * within the bounds of the slider when reaching the edges
 */
export function getThumbInBoundsOffset(width: number, left: number, direction: number) {
  const halfWidth = width / 2
  const halfPercent = 50
  const offset = linearScale([0, halfPercent], [0, halfWidth])
  return (halfWidth - offset(left) * direction) * direction
}

/**
 * Gets an array of steps between each value.
 *
 * @example
 * // returns [1, 9]
 * getStepsBetweenValues([10, 11, 20]);
 */
export function getStepsBetweenValues(values: number[]) {
  return values.slice(0, -1).map((value, index) => values[index + 1] - value)
}

/**
 * Verifies the minimum steps between all values is greater than or equal
 * to the expected minimum steps.
 *
 * @example
 * // returns false
 * hasMinStepsBetweenValues([1,2,3], 2);
 *
 * @example
 * // returns true
 * hasMinStepsBetweenValues([1,2,3], 1);
 */
export function hasMinStepsBetweenValues(values: number[], minStepsBetweenValues: number) {
  if (minStepsBetweenValues > 0) {
    const stepsBetweenValues = getStepsBetweenValues(values)
    const actualMinStepsBetweenValues = Math.min(...stepsBetweenValues)
    return actualMinStepsBetweenValues >= minStepsBetweenValues
  }
  return true
}

// https://github.com/tmcw-up-for-adoption/simple-linear-scale/blob/master/index.js
export function linearScale(input: readonly [number, number], output: readonly [number, number]) {
  return (value: number) => {
    if (input[0] === input[1] || output[0] === output[1])
      return output[0]
    const ratio = (output[1] - output[0]) / (input[1] - input[0])
    return output[0] + ratio * (value - input[0])
  }
}

export function getDecimalCount(value: number) {
  return (String(value).split('.')[1] || '').length
}

export function roundValue(value: number, decimalCount: number) {
  const rounder = 10 ** decimalCount
  return Math.round(value * rounder) / rounder
}
