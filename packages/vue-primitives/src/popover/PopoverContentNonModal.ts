import type { PopoverContentImplEmits } from './PopoverContentImpl'

// eslint-disable-next-line ts/consistent-type-definitions
export type PopoverContentNonModal = {
  closeAutoFocus: PopoverContentImplEmits['closeAutoFocus']
  interactOutside: PopoverContentImplEmits['interactOutside']
}
