import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { MenuContentImplSharedEmits } from '../menu/MenuContentImpl.ts'

export type DropdownMenuContentEmits = {
  closeAutoFocus: MenuContentImplSharedEmits['closeAutoFocus']
  interactOutside: DismissableLayerEmits['interactOutside']
}
