import type { DismissableLayerEmits } from '../dismissable-layer'

export interface ContextMenuContentProps {
  forceMount?: boolean
}

export type ContextMenuContentEmits = {
  closeAutoFocus: [event: Event]
} & Pick<DismissableLayerEmits, 'pointerdownOutside' | 'interactOutside'>
