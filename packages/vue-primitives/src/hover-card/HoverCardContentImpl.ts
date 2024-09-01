import type { DismissableLayerEmits } from '../dismissable-layer'

export interface HoverCardContentImplProps {

}

// eslint-disable-next-line ts/consistent-type-definitions
export type HoverCardContentImplEmits = {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeydown: DismissableLayerEmits['escapeKeydown']
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `HoverCard`.
   * Can be prevented.
   */
  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
  /**
   * Event handler called when the focus moves outside of the `HoverCard`.
   * Can be prevented.
   */
  focusOutside: DismissableLayerEmits['focusOutside']
  /**
   * Event handler called when an interaction happens outside the `HoverCard`.
   * Specifically, when a `pointerdown` event happens outside or focus moves outside of it.
   * Can be prevented.
   */
  interactOutside: DismissableLayerEmits['interactOutside']

  pointerdown: [event: PointerEvent]
}
