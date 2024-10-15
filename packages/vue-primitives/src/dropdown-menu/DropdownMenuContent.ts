import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { MenuContentImplEmits } from '../menu/MenuContentImpl.ts'

export type DropdownMenuContentEmits = {
  closeAutoFocus: MenuContentImplEmits['closeAutoFocus']
  interactOutside: DismissableLayerEmits['interactOutside']
}
