import type { Ref, UnwrapRef } from 'vue'
import { createContext } from '../hooks/createContext.ts'
import type { useSize } from '../hooks/useSize.ts'

type Side = 'top' | 'right' | 'bottom' | 'left'

export type SliderOrientationContext = Ref<{
  startEdge: Side
  endEdge: Side
  size: keyof NonNullable<UnwrapRef<ReturnType<typeof useSize>>>
  direction: number
}>

export const [provideSliderOrientationContext, useSliderOrientationContext] = createContext<SliderOrientationContext>('SliderOrientation')
