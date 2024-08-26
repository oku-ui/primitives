import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { DialogContentImplEmits } from './DialogContentImpl.ts'

// eslint-disable-next-line ts/consistent-type-definitions
export type DialogContentNonModalEmits = {
  closeAutoFocus: DialogContentImplEmits['closeAutoFocus']

  interactOutside: DismissableLayerEmits['interactOutside']
}
