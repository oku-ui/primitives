import type { DismissableLayerEmits } from '../dismissable-layer/DismissableLayer.ts'
import type { PopperContentProps } from '../popper/index.ts'

export interface MenubarContentProps {
  align?: PopperContentProps['align']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenubarContentEmits = {
  keydown: [event: KeyboardEvent]
  closeAutoFocus: [event: Event]
  focusOutside: DismissableLayerEmits['focusOutside']
  interactOutside: DismissableLayerEmits['interactOutside']
}
