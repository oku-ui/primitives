import type { DismissableLayerEmits } from '../dismissable-layer'

export type DialogContentImplEmits = {
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
