import type { PrimitiveProps } from '../primitive/index.ts'

export interface SliderImplProps extends PrimitiveProps {}

// eslint-disable-next-line ts/consistent-type-definitions
export type SliderImplPrivateEmits = {
  slideStart: [event: PointerEvent]
  slideMove: [event: PointerEvent]
  slideEnd: [event: PointerEvent]
  homeKeydown: [event: KeyboardEvent]
  endKeydown: [event: KeyboardEvent]
  stepKeydown: [event: KeyboardEvent]
}
