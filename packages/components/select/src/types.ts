import type { CollectionPropsType } from '@oku-ui/collection'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { ComputedRef, Ref, VNode } from 'vue'

export type SelectNativeElement = OkuElement<'select'>

export type Direction = 'ltr' | 'rtl'

export type SelectItemElement = OkuElement<'div'>

export type SelectProvideValue = {
  trigger: Ref<SelectTriggerElement | null | undefined>
  onTriggerChange(node: SelectTriggerElement | null): void
  valueNode: Ref<SelectValueElement | null>
  onValueNodeChange(node: SelectValueElement): void
  valueNodeHasChildren: Ref<boolean>
  onValueNodeHasChildrenChange(hasChildren: boolean): void
  contentId: string
  value?: ComputedRef<string | undefined>
  onValueChange(value: string): void
  open: ComputedRef<boolean | undefined>
  required?: Ref<boolean | undefined>
  onOpenChange(open: boolean): void
  dir: ComputedRef<SelectProps['dir']>
  triggerPointerDownPosRef: Ref<{ x: number; y: number } | null>
  disabled?: Ref<boolean | undefined>
}

export type NativeOption = VNode<Record<string, any>>

export type SelectNativeOptionsContextValue = {
  onNativeOptionAdd(option: NativeOption): void
  onNativeOptionRemove(option: NativeOption): void
}

export interface SelectProps extends PrimitiveProps {
  value?: string
  defaultValue?: string
  valueChange?(value: string): void
  open?: boolean
  defaultOpen?: boolean
  openChange?(open: boolean): void
  dir?: Direction
  name?: string
  autoComplete?: string
  /**
   * Whether or not select is disabled from user interaction.
   *
   * @defaultValue undefined
   */
  disabled?: boolean
  /**
   * Whether or not select is required from user interaction.
   *
   * @defaultValue undefined
   */
  required?: boolean
}

export interface SelectEmits {
  valueChange: [value: string]
  openChange: [open: boolean]
  keydown: [event: KeyboardEvent]
}

export interface SelectSingleEmits extends SelectEmits {
  /**
   * The callback that fires when the value state of the select changes.
   */
  valueChange: [value: string]
  /**
   * The callback that fires when the open state of the select changes.
   */
  openChange: [open: boolean]
}

export type ItemData = {
  value: string
  disabled: boolean
  textValue: string
} & CollectionPropsType

export type SelectTriggerElement = OkuElement<'button'>
export interface SelectTriggerProps extends PrimitiveProps {
  /**
   * Whether or not select is disabled from user interaction.
   *
   * @defaultValue undefined
   */
  disabled?: boolean
}

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * ----------------------------------------------------------------------------------------------- */
export type SelectValueElement = OkuElement<'span'>
export interface SelectValueProps extends PrimitiveProps {
  placeholder?: string | Record<string, unknown>
}
