import type { HTMLAttributes, Ref } from 'vue'
import { createCollection } from '../collection/index.ts'
import { createContext, type MutableRefObject } from '../hooks/index.ts'
import type { Direction } from '../direction/index.ts'
import type { PrimitiveProps } from '../primitive/index.ts'

export const PAGE_KEYS = ['PageUp', 'PageDown']
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top'
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

// eslint-disable-next-line ts/consistent-type-definitions
export type SliderRootEmits = {
  'update:value': [value: number[]]
  'valueCommit': [value: number[]]
  'keydown': [event: KeyboardEvent]
  'pointerdown': [event: PointerEvent]
  'pointermove': [event: PointerEvent]
  'pointerup': [event: PointerEvent]
}

export interface SliderContext {
  name: () => string | undefined
  disabled: () => boolean
  min: () => number
  max: () => number
  values: Ref<number[]>
  valueIndexToChangeRef: MutableRefObject<number>
  thumbs: Set<HTMLElement>
  orientation: () => SliderRootProps['orientation']
}

export const [provideSliderContext, useSliderContext] = createContext<SliderContext>('Slider')

export const [Collection, useCollection] = createCollection<HTMLSpanElement>('Slider')
