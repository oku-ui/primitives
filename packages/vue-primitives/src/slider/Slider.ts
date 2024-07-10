import type { HTMLAttributes, Ref } from 'vue'
import { createContext } from '../hooks/index.ts'
import type { Direction } from '../direction/index.ts'
import type { PrimitiveProps } from '../primitive/Primitive.ts'
import { createCollection } from '../collection/Collection.ts'

export const PAGE_KEYS = ['PageUp', 'PageDown']
export const ARROW_KEYS = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']

type SlideDirection = 'from-left' | 'from-right' | 'from-bottom' | 'from-top'
export const BACK_KEYS: Record<SlideDirection, string[]> = {
  'from-left': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-right': ['Home', 'PageDown', 'ArrowDown', 'ArrowRight'],
  'from-bottom': ['Home', 'PageDown', 'ArrowDown', 'ArrowLeft'],
  'from-top': ['Home', 'PageDown', 'ArrowUp', 'ArrowLeft'],
}

export interface SliderProps extends PrimitiveProps {
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
export type SliderEmits = {
  'update:value': [value: number[]]
  'valueCommit': [value: number[]]
}

export interface SliderContext {
  name: Ref<string | undefined>
  disabled: Ref<boolean>
  min: Ref<number>
  max: Ref<number>
  values: Ref<number[]>
  valueIndexToChangeRef: { value: number }
  thumbs: Set<HTMLElement>
  orientation: Ref<SliderProps['orientation']>
}

export const [provideSliderContext, useSliderContext] = createContext<SliderContext>('Slider')

export const [Collection, useCollection] = createCollection<HTMLSpanElement, undefined>('Slider')
