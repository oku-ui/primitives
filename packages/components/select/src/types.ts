import type { CollectionPropsType } from '@oku-ui/collection'
import type { OkuElement } from '@oku-ui/primitive'
import type { Ref } from 'vue'

type Direction = 'ltr' | 'rtl'

export type SelectTriggerElement = OkuElement<'button'>
export type SelectValueElement = OkuElement<'span'>
export type SelectItemElement = OkuElement<'div'>

export type SelectProvideValue = {
  trigger: Ref<SelectTriggerElement | null>
  onTriggerChange(node: SelectTriggerElement | null): void
  valueNode: Ref<SelectValueElement | null>
  onValueNodeChange(node: SelectValueElement): void
  valueNodeHasChildren: Ref<boolean>
  onValueNodeHasChildrenChange(hasChildren: boolean): void
  contentId: Ref<string>
  value?: Ref<string>
  onValueChange(value: string): void
  open: Ref<boolean>
  required?: Ref<boolean>
  onOpenChange(open: boolean): void
  dir: SelectProps['dir']
  triggerPointerDownPosRef: Ref<{ x: number; y: number } | null>
  disabled?: Ref<boolean>
}

export interface SelectProps {
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?(open: boolean): void
  dir?: Direction
  name?: string
  autoComplete?: string
  disabled?: boolean
  required?: boolean
}

export type ItemData = {
  value: string
  disabled: boolean
  textValue: string
} & CollectionPropsType
