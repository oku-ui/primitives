import type { DismissableLayerEmits, DismissableLayerProps } from '../dismissable-layer/index.ts'
import type { FocusScopeProps } from '../focus-scope/FocusScope.ts'
import type { PrimitiveProps } from '../primitive/Primitive.ts'
// import type { PopperContentProps } from '../popper/PopperContent.ts'

// export interface PopoverContentImplProps extends PopperContentProps, DismissableLayerProps
export interface PopoverContentImplProps extends PrimitiveProps {
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
