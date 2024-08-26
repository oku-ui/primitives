import type { PopoverContentImplEmits } from './PopoverContentImpl'

// eslint-disable-next-line ts/consistent-type-definitions
export type PopoverContentModalEmits = {
  closeAutoFocus: PopoverContentImplEmits['closeAutoFocus']
  pointerdownOutside: PopoverContentImplEmits['pointerdownOutside']
  focusOutside: PopoverContentImplEmits['focusOutside']
}
