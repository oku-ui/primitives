import type { UnwrapRef } from 'vue'
import { createContext } from '../hooks/createContext.ts'
import type { useSize } from '../hooks/useSize.ts'
import type { SliderImplProps } from './SliderImpl.ts'

export interface SliderOrientationProps extends SliderImplProps, SliderOrientationPrivateProps {}

export interface SliderOrientationPrivateProps {
  min: number
  max: number
  inverted: boolean
}

type Side = 'top' | 'right' | 'bottom' | 'left'

export interface SliderOrientationContext {
  startEdge: Side
  endEdge: Side
  size: keyof NonNullable<UnwrapRef<ReturnType<typeof useSize>>>
  direction: number
}

// eslint-disable-next-line ts/consistent-type-definitions
export type SliderOrientationPrivateEmits = {
  slideStart: [value: number]
  slideMove: [value: number]
  slideEnd: []
  homeKeydown: [value: number]
  endKeydown: [value: number]
  stepKeydown: [step: { event: KeyboardEvent, direction: number }]
}

export const [provideSliderOrientationContext, useSliderOrientationContext] = createContext<SliderOrientationContext>('SliderOrientation', {
  startEdge: 'left',
  endEdge: 'right',
  size: 'width',
  direction: 1,
})
