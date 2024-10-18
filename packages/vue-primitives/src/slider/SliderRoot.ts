import type { PrimitiveProps } from '../primitive/index.ts'
import type { EmitsToHookProps, LooseRequired, PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { clamp } from '@floating-ui/utils'
import { computed, type HTMLAttributes, type MaybeRefOrGetter, type Ref, type UnwrapRef } from 'vue'
import { createCollection } from '../collection/index.ts'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, type MutableRefObject, useControllableStateV3, useRef, type useSize } from '../hooks/index.ts'
import { getDecimalCount, isNumber, mergePrimitiveAttrs, roundValue } from '../shared/index.ts'
import { getClosestValueIndex, getNextSortedValues, hasMinStepsBetweenValues, linearScale } from './utils.ts'

export const PAGE_KEYS = ['PageUp', 'PageDown']
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

export type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top'
export const BACK_KEYS: Record<SlideDirection, string[]> = {
  'from-left': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-right': ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
  'from-bottom': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-top': ['Home', 'PageDown', 'ArrowUp', 'ArrowLeft'],
}

export interface SliderRootProps {
  as?: PrimitiveProps['as']
  name?: string
  disabled?: boolean
  orientation?: HTMLAttributes['aria-orientation']
  dir?: Direction
  min?: number
  max?: number
  step?: number
  minStepsBetweenThumbs?: number
  value?: number[]
  defaultValue?: number[]
  inverted?: boolean
}

export const DEFAULT_SLIDER_ROOT_PROPS = {
  as: 'span',
  disabled: undefined,
  inverted: undefined,
  min: 0,
  max: 100,
  step: 1,
  minStepsBetweenThumbs: 0,
  defaultValue: (v: LooseRequired<SliderRootProps>) => isNumber(v.min) ? [v.min] : [0],
} satisfies PrimitiveDefaultProps<SliderRootProps>

export type SliderRootEmits = {
  'update:value': [value: number[]]
  'valueCommit': [value: number[]]
}

export interface SliderContext {
  name: () => string | undefined
  disabled: () => boolean | undefined
  min: () => number
  max: () => number
  values: Ref<number[]>
  valueIndexToChangeRef: MutableRefObject<number>
  thumbs: Set<HTMLElement>
  orientation: NonNullable<SliderRootProps['orientation']>
}

export const [provideSliderContext, useSliderContext] = createContext<SliderContext>('Slider')

export const [Collection, useCollection] = createCollection<HTMLElement>('Slider')

export type Side = 'top' | 'right' | 'bottom' | 'left'

export type SliderOrientationContext = Ref<{
  startEdge: Side
  endEdge: Side
  size: keyof NonNullable<UnwrapRef<ReturnType<typeof useSize>>>
  direction: number
}>

export const [provideSliderOrientationContext, useSliderOrientationContext] = createContext<SliderOrientationContext>('SliderOrientation')

export interface UseSliderRootProps extends EmitsToHookProps<SliderRootEmits> {
  el?: MutableRefObject<HTMLElement>
  value?: () => number[] | undefined
  defaultValue?: () => number[]
  name?: () => string | undefined
  disabled?: () => boolean | undefined
  orientation?: HTMLAttributes['aria-orientation']
  dir?: MaybeRefOrGetter<Direction | undefined>
  min?: () => number
  max?: () => number
  step?: () => number
  minStepsBetweenThumbs?: () => number
  inverted?: boolean
}

export function useSliderRoot(props: UseSliderRootProps): RadixPrimitiveReturns {
  const {
    name = () => undefined,
    min = () => 0,
    max = () => 100,
    step = () => 1,
    disabled = () => false,
    orientation = 'horizontal',
    minStepsBetweenThumbs = () => 0,
    defaultValue = () => isNumber(min()) ? [min()] : [0],
  } = props

  const el = props.el || useRef<HTMLElement>()
  const setTemplateEl = props.el ? undefined : (value: HTMLElement | undefined) => el.value = value

  Collection.provideCollectionContext(el)

  const thumbs: SliderContext['thumbs'] = new Set()
  const valueIndexToChangeRef = useRef(0)

  // TODO: is not reactive
  const values = useControllableStateV3(
    props.value,
    (v) => {
      const _thumbs = Array.from(thumbs)
      _thumbs[valueIndexToChangeRef.value]?.focus()
      props.onUpdateValue?.(v as number[])
    },
    defaultValue,
  )

  let valuesBeforeSlideStartRef = values.value

  function onSliderSlideStart(value: number) {
    const closestIndex = getClosestValueIndex(values.value, value)
    updateValues(value, closestIndex)
  }

  function onSliderSlideMove(value: number) {
    updateValues(value, valueIndexToChangeRef.value)
  }

  function onSliderSlideEnd() {
    const prevValue = valuesBeforeSlideStartRef[valueIndexToChangeRef.value]
    const nextValue = values.value[valueIndexToChangeRef.value]
    const hasChanged = nextValue !== prevValue
    if (hasChanged) {
      props.onUpdateValue?.(values.value)
    }
  }

  function onSliderHomeKeyDown() {
    updateValues(min(), 0, { commit: true })
  }

  function onSliderEndKeyDown() {
    updateValues(max(), values.value.length - 1, { commit: true })
  }

  function onSliderStepKeydown({ event, direction: stepDirection }: { event: KeyboardEvent, direction: number }) {
    const isPageKey = PAGE_KEYS.includes(event.key)
    const isSkipKey = isPageKey || (event.shiftKey && ARROW_KEYS.includes(event.key))
    const multiplier = isSkipKey ? 10 : 1
    const atIndex = valueIndexToChangeRef.value
    const value = values.value[atIndex]!
    const stepInDirection = step() * multiplier * stepDirection
    updateValues(value + stepInDirection, atIndex, { commit: true })
  }

  function updateValues(value: number, atIndex: number, { commit } = { commit: false }) {
    const decimalCount = getDecimalCount(step())
    const snapToStep = roundValue(Math.round((value - min()) / step()) * step() + min(), decimalCount)
    const nextValue = clamp(snapToStep, min(), max())

    const prevValues = values.value
    const nextValues = getNextSortedValues(values.value, nextValue, atIndex)

    if (!hasMinStepsBetweenValues(nextValues, minStepsBetweenThumbs() * step()))
      return

    valueIndexToChangeRef.value = nextValues.indexOf(nextValue)
    const hasChanged = String(nextValues) !== String(prevValues)

    if (hasChanged && commit) {
      props.onValueCommit?.(nextValues)
    }

    values.value = nextValues
  }

  function onSliderPointerdown() {
    valuesBeforeSlideStartRef = values.value
  }

  provideSliderContext({
    name,
    disabled,
    min,
    max,
    valueIndexToChangeRef,
    thumbs,
    values,
    orientation,
  })

  // COMP::SliderOrientation

  const isHorisontal = orientation === 'horizontal'

  interface OrientationLocalState {
    readonly reactSise: 'width' | 'height'
    readonly rectStartEdge: 'left' | 'top'
    readonly clientEdge: 'x' | 'y'
    readonly slideDirectionSte: 'from-left' | 'from-bottom'
    readonly slideDirectionEts: 'from-right' | 'from-top'
  }

  const orientationLocalState: OrientationLocalState = {
    reactSise: isHorisontal ? 'width' : 'height',
    rectStartEdge: isHorisontal ? 'left' : 'top',
    clientEdge: isHorisontal ? 'x' : 'y',
    slideDirectionSte: isHorisontal ? 'from-left' : 'from-bottom',
    slideDirectionEts: isHorisontal ? 'from-right' : 'from-top',
  }

  let rectRef: DOMRect | undefined
  const direction = useDirection(props.dir)

  const isSlidingFromStart = computed(() => {
    if (isHorisontal) {
      const isLtr = direction.value === 'ltr'
      return (isLtr && !props.inverted) || (!isLtr && props.inverted)
    }

    return !props.inverted
  })

  function getValueFromPointer(pointerPosition: number) {
    const rect = rectRef || el.value!.getBoundingClientRect()
    const input: [number, number] = [0, rect[orientationLocalState.reactSise]]
    const output: [number, number] = isSlidingFromStart.value === isHorisontal ? [min(), max()] : [max(), min()]
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
    const _startEdge = isHorisontal ? 'left' : 'bottom'
    const _endEdge = isHorisontal ? 'right' : 'top'

    const startEdge = isSlidingFromStart.value ? _startEdge : _endEdge
    const endEdge = isSlidingFromStart.value ? _endEdge : _startEdge
    const direction = isSlidingFromStart.value ? 1 : -1
    const size = isHorisontal ? 'width' : 'height'

    return { startEdge, endEdge, direction, size } as const
  })

  provideSliderOrientationContext(orientationContext)

  // COMP::SliderImpl

  function onKeydown(event: KeyboardEvent) {
    if (event.defaultPrevented) {
      return
    }

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
  }

  function onPointerdown(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    onSliderPointerdown()

    const target = event.target as HTMLElement
    target.setPointerCapture(event.pointerId)
    // Prevent browser focus behaviour because we focus a thumb manually when values change.
    event.preventDefault()
    // Touch devices have a delay before focusing so won't focus if touch immediately moves
    // away from target (sliding). We want thumb to focus regardless.
    if (thumbs.has(target)) {
      target.focus()
    }
    else {
      onOrientationSlideStart(event)
    }
  }

  function onPointermove(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    const target = event.target as HTMLElement
    if (target.hasPointerCapture(event.pointerId))
      onOrientationSlideMove(event)
  }

  function onPointerup(event: PointerEvent) {
    if (event.defaultPrevented) {
      return
    }

    const target = event.target as HTMLElement
    if (target.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId)
      onOrientationSlideEnd()
    }
  }

  return {
    attrs(extraAttrs) {
      const _disabled = disabled()

      const attrs = {
        'elRef': setTemplateEl,
        'dir': direction.value,
        'data-orientation': orientation,
        'aria-disabled': _disabled,
        'data-disabled': _disabled ? '' : undefined,
        'style': orientation === 'horizontal' ? '--radix-slider-thumb-transform: translateX(-50%)' : '--radix-slider-thumb-transform: translateY(50%)',
        onKeydown,
        onPointerdown,
        onPointermove,
        onPointerup,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
