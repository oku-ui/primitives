import type { Direction } from '../direction/index.ts'
import type { SliderOrientationProps } from './SliderOrientation.ts'

export interface SliderHorizontalProps extends SliderOrientationProps {
  dir?: Direction
}
