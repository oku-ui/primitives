import type { DismissableLayerEmits } from '../dismissable-layer/index.ts'
import type { MenuContentImplEmits } from '../menu/MenuContentImpl.ts'

// eslint-disable-next-line ts/consistent-type-definitions
export type DropdownMenuContentEmits = {
  closeAutoFocus: MenuContentImplEmits['closeAutoFocus']
  interactOutside: DismissableLayerEmits['interactOutside']
}
