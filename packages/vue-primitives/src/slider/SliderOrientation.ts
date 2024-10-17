import type { Ref, UnwrapRef } from 'vue'
import { createContext, type useSize } from '@oku-ui/hooks'

type Side = 'top' | 'right' | 'bottom' | 'left'

export type SliderOrientationContext = Ref<{
  startEdge: Side
  endEdge: Side
  size: keyof NonNullable<UnwrapRef<ReturnType<typeof useSize>>>
  direction: number
}>

export const [provideSliderOrientationContext, useSliderOrientationContext] = createContext<SliderOrientationContext>('SliderOrientation')
