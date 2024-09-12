import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer'
import type { FocusScopeProps } from '../focus-scope'
import type { RovingFocusGroupRootEmits, RovingFocusGroupRootProps } from '../roving-focus'

export interface MenuContentImplProps {
  disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents']

  disableOutsideScroll?: boolean

  trapFocus?: FocusScopeProps['trapped']

  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: RovingFocusGroupRootProps['loop']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenuContentImplEmits = {
  openAutoFocus: [event: Event]
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: Event]

  escapeKeydown: DismissableLayerEmits['escapeKeydown']

  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']

  focusOutside: DismissableLayerEmits['focusOutside']

  interactOutside: DismissableLayerEmits['interactOutside']

  dismiss: DismissableLayerEmits['dismiss']

  entryFocus: RovingFocusGroupRootEmits['entryFocus']

  keydowm: [event: KeyboardEvent]

  blur: [event: FocusEvent]

  pointermove: [event: PointerEvent]

  mousedown: RovingFocusGroupRootEmits['mousedown']
  focus: RovingFocusGroupRootEmits['focus']
  focusout: RovingFocusGroupRootEmits['focusout']
}
