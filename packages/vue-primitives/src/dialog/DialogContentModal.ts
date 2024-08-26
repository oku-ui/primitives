import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { DialogContentImplEmits } from './DialogContentImpl.ts'

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogContentModal = {
  closeAutoFocus: DialogContentImplEmits['closeAutoFocus']

  pointerdownOutside: DismissableLayerEmits['pointerdownOutside']
  focusOutside: DismissableLayerEmits['focusOutside']
}
