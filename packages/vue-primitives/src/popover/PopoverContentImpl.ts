import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'

// export interface PopoverContentImplProps extends PopperContentProps, DismissableLayerProps

export type PopoverContentImplEmits = {
  /**
   * Event handler called when auto-focusing on open.
   * Can be prevented.
   */
  openAutoFocus: [event: Event]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]
} & Omit<DismissableLayerEmits, 'dismiss'>
