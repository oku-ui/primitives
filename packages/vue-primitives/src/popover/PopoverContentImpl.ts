import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer/index.ts'
import type { FocusScopeProps } from '../focus-scope/FocusScope.ts'

// export interface PopoverContentImplProps extends PopperContentProps, DismissableLayerProps
export interface PopoverContentImplProps {
  disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents']
  /**
   * Whether focus should be trapped within the `MenuContent`
   * @defaultValue false
   */
  trapFocus?: FocusScopeProps['trapped']
}

export type PopoverContentImplEmits = DismissableLayerEmits & {
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
}
