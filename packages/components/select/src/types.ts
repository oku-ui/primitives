import type { CollectionPropsType } from '@oku-ui/collection'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { ComputedRef, Ref, VNode } from 'vue'
import type {
  PopperArrowNaviteElement,
  PopperArrowProps,
  PopperContentElement,
  PopperContentProps,
} from '@oku-ui/popper'
import type { FocusScopeProps } from '@oku-ui/focus-scope'
import type {
  DismissableLayerEmits,
  DismissableLayerProps,
} from '@oku-ui/dismissable-layer'

export type SelectNativeElement = OkuElement<'select'>

export type Direction = 'ltr' | 'rtl'

export type SelectScrollButtonImplElement = OkuElement<'button'>

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

/* -------------------------------------------------------------------------------------------------
 * SelectIcon
 * ----------------------------------------------------------------------------------------------- */
export type SelectIconElement = OkuElement<'span'>
export interface SelectIconProps extends PrimitiveProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * ----------------------------------------------------------------------------------------------- */
export interface SelectContentProps extends SelectContentImplProps {}

export type SelectContentElement = SelectContentImplElement

/* -------------------------------------------------------------------------------------------------
 * SelectContentImpl
 * ----------------------------------------------------------------------------------------------- */

export const CONTENT_MARGIN = 10

export type SelectContentContextValue = {
  content?: Ref<SelectContentElement | null>
  viewport?: Ref<SelectViewportElement | null>
  onViewportChange?: (node: SelectViewportElement | null) => void
  itemRefCallback?: (
    node: SelectItemElement | null,
    value: string,
    disabled: boolean
  ) => void
  selectedItem?: Ref<SelectItemElement | null>
  onItemLeave?: () => void
  itemTextRefCallback?: (
    node: SelectItemTextElement | null,
    value: string,
    disabled: boolean
  ) => void
  focusSelectedItem?: () => void
  selectedItemText?: Ref<SelectItemTextElement | null>
  position?: Ref<SelectContentProps['position']>
  isPositioned?: ComputedRef<boolean> | Ref<boolean>
  searchRef?: Ref<string>
}

export type SelectPopperPrivateProps = {
  onPlaced?: PopperContentProps['onPlaced']
}

export interface SelectContentImplProps
  extends Omit<SelectPopperPositionProps, keyof SelectPopperPrivateProps>,
  Omit<SelectItemAlignedPositionProps, keyof SelectPopperPrivateProps> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus?: FocusScopeProps['onUnmountAutoFocus']
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeyDown?: DismissableLayerProps['onEscapeKeyDown']
  /**
   * Event handler called when the a `pointerdown` event happens outside of the `DismissableLayer`.
   * Can be prevented.
   */
  pointerdownOutside?: DismissableLayerProps['onPointerDownOutside']

  position?: 'item-aligned' | 'popper'
}

export type SelectContentImplEmits = {
  /**
   * Event handler called when the escape key is down.
   * Can be prevented.
   */
  escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown'][0]]
  /**
   * Event handler called when the a `pointerdown` event happens`.
   * Can be prevented.
   */
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOut'][0]]

  /**
   * Event handler called when the a `autofocus` event happens`.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeProps['onUnmountAutoFocus'][0]]
}

export type SelectContentImplElement =
  | SelectPopperPositionElement
  | SelectItemAlignedPositionElement

/* -------------------------------------------------------------------------------------------------
 * SelectPopperPosition
 * ----------------------------------------------------------------------------------------------- */
export type SelectPopperPositionElement = typeof PopperContentElement
export interface SelectPopperPositionProps
  extends PopperContentProps,
  SelectPopperPrivateProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectItemAlignedPosition
 * ----------------------------------------------------------------------------------------------- */
export type SelectItemAlignedPositionElement = OkuElement<'div'>
export interface SelectItemAlignedPositionProps
  extends PrimitiveProps,
  SelectPopperPrivateProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * ----------------------------------------------------------------------------------------------- */
export type SelectViewportElement = OkuElement<'div'>

export interface SelectViewportProps extends PrimitiveProps {}

export type SelectViewportContextValue = {
  contentWrapper?: Ref<HTMLDivElement | null>
  shouldExpandOnScrollRef?: Ref<boolean>
  onScrollButtonChange?: (node: SelectScrollButtonImplElement | null) => void
}

/* -------------------------------------------------------------------------------------------------
 * SelectGroup
 * ----------------------------------------------------------------------------------------------- */

export type SelectGroupContextValue = { id: string }

export type SelectGroupElement = OkuElement<'div'>
export interface SelectGroupProps extends PrimitiveProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectLabel
 * ----------------------------------------------------------------------------------------------- */

export type SelectLabelElement = OkuElement<'div'>
export interface SelectLabelProps extends PrimitiveProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectSeparator
 * ----------------------------------------------------------------------------------------------- */
export type SelectSeparatorElement = OkuElement<'div'>
export interface SelectSeparatorProps extends PrimitiveProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectArrow
 * ----------------------------------------------------------------------------------------------- */

export type SelectArrowElement = PopperArrowNaviteElement
export interface SelectArrowProps extends PopperArrowProps {}

/* -------------------------------------------------------------------------------------------------
 * SelectItem
 * ----------------------------------------------------------------------------------------------- */

export type SelectItemContextValue = {
  value: Ref<string>
  disabled: Ref<boolean>
  textId: string
  isSelected: Ref<boolean>
  onItemTextChange(node: SelectItemTextElement | null): void
}

export type SelectItemElement = OkuElement<'div'>
export interface SelectItemProps extends PrimitiveProps {
  value: string
  disabled?: boolean
  textValue?: string
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemText
 * ----------------------------------------------------------------------------------------------- */

export type SelectItemTextElement = OkuElement<'span'>
export interface SelectItemTextProps extends PrimitiveProps {}
