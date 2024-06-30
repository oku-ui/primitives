import type { PrimitiveProps } from '../primitive/index.ts'
import type { SliderThumbImplProps } from './SliderThumbImpl.ts'

export interface SliderThumbProps extends PrimitiveProps {
  name?: SliderThumbImplProps['name']
}
