import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { ComputedRef, PropType, Ref, VNode } from 'vue'
import { createCollection } from '@oku-ui/collection'
import type { CollectionPropsType } from '@oku-ui/collection'

import {
  createPopperScope,
  popperArrowProps,
  popperContentProps,
} from '@oku-ui/popper'
import { dismissableLayerProps } from '@oku-ui/dismissable-layer'
import { focusScopeProps } from '@oku-ui/focus-scope'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps } from '@oku-ui/primitive'
import type {
  PopperArrowElement,
  PopperArrowNaviteElement,
  PopperArrowProps,
  PopperContentElement,

  PopperContentEmits,

  PopperContentNaviteElement,

  PopperContentProps,
} from '@oku-ui/popper'
import type { FocusScopeEmits } from '@oku-ui/focus-scope'
import type {
  DismissableLayerEmits,
} from '@oku-ui/dismissable-layer'
import type { PortalProps } from '@oku-ui/portal'

export const SELECT_NAME = 'OkuSelect'
export const TRIGGER_NAME = 'OkuSelectTrigger'
export const VALUE_NAME = 'OkuSelectValue'
export const LABEL_NAME = 'OkuSelectLabel'
export const GROUP_NAME = 'OkuSelectGroup'
export const ITEM_ALIGNED_POSITION_NAME = 'OkuSelectItemAlignedPosition'
export const POPPER_POSITION_NAME = 'OkuSelectPopperPosition'
export const CONTENT_IMPL_NAME = 'OkuSelectContentImpl'
export const ICON_NAME = 'OkuSelectIcon'
export const CONTENT_NAME = 'OkuSelectContent'
export const SEPARATOR_NAME = 'OkuSelectSeparator'
export const ARROW_NAME = 'OkuSelectArrow'
export const ITEM_NAME = 'OkuSelectItem'
export const ITEM_INDICATOR_NAME = 'OkuSelectItemIndicator'
export const ITEM_TEXT_NAME = 'OkuSelectItemText'
export const VIEWPORT_NAME = 'OkuSelectViewport'
export const SELECT_SCROLL_BUTTON = 'OkuSelectScrollButton'
export const PORTAL_NAME = 'OkuSelectPortal'

/* -------------------------------------------------------------------------------------------------
 * Select
 * ----------------------------------------------------------------------------------------------- */

export type SelectNativeElement = OkuElement<'select'>

export type Direction = 'ltr' | 'rtl'

export type SelectProvideValue = {
  trigger: Ref<SelectTriggerNativeElement | null | undefined>
  onTriggerChange(node: SelectTriggerNativeElement | null): void
  valueNode: Ref<SelectValueNativeElement | null>
  onValueNodeChange(node: SelectValueNativeElement): void
  valueNodeHasChildren: Ref<boolean>
  onValueNodeHasChildrenChange(hasChildren: boolean): void
  contentId: string
  value?: ComputedRef<string>
  onValueChange(value: string): void
  open: ComputedRef<boolean>
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

export interface SelectProps {
  value?: string
  defaultValue?: string
  open?: boolean
  defaultOpen?: boolean
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

export type SelectTriggerNativeElement = OkuElement<'button'>
export type SelectTriggerElement = HTMLButtonElement

export interface SelectTriggerProps extends PrimitiveProps {
  /**
   * Whether or not select is disabled from user interaction.
   *
   * @defaultValue undefined
   */
  disabled?: boolean
}

export const scopeSelectProps = {
  scopeOkuSelect: {
    ...ScopePropObject,
  },
}

export const selectProps = {
  props: {
    ...primitiveProps,
    value: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    modelValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    defaultValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    dir: {
      type: String as PropType<Direction>,
      default: 'single',
    },
    open: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    openValue: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    defaultOpen: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    autoComplete: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    name: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
    required: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'valueChange': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: string) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:openValue': (open: boolean) => true,
  },
}

export const {
  CollectionItemSlot,
  CollectionProvider,
  CollectionSlot,
  useCollection,
  createCollectionScope,
} = createCollection<HTMLSelectElement, ItemData>(SELECT_NAME)

export const [createSelectProvide, createSelectScope] = createProvideScope(
  SELECT_NAME,
  [createCollectionScope, createPopperScope],
)

export const [createSelectNativeProvide, createSelectNativeScope]
  = createProvideScope(SELECT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
  ])

export const usePopperScope = createPopperScope()

export const [selectProvider, useSelectInject]
  = createSelectProvide<SelectProvideValue>(SELECT_NAME)

export const [SelectNativeOptionsProvider, useSelectNativeOptionsInject]
  = createSelectNativeProvide<SelectNativeOptionsContextValue>(SELECT_NAME)

/* -------------------------------------------------------------------------------------------------
 * SelectTrigger
 * ----------------------------------------------------------------------------------------------- */

export const selectTriggerProps = {
  props: {
    ...primitiveProps,
    disabled: {
      type: [Boolean, undefined] as PropType<boolean | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: Event) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectValue
 * ----------------------------------------------------------------------------------------------- */

export type SelectValueNativeElement = Omit<OkuElement<'span'>, 'placeholder'>
export type SelectValueElement = Omit<HTMLSpanElement, 'placeholder'>

export interface SelectValueProps extends PrimitiveProps {
  placeholder?: string | Record<string, unknown>
}

export const selectValueProps = {
  props: {
    ...primitiveProps,
    placeholder: {
      type: [String, Object] as PropType<VNode | string | undefined>,
      default: '',
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectIcon
 * ----------------------------------------------------------------------------------------------- */
export type SelectIconNativeElement = OkuElement<'span'>
export type SelectIconElement = HTMLSpanElement

export interface SelectIconProps extends PrimitiveProps {}

export const selectIconProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectContent
 * ----------------------------------------------------------------------------------------------- */

export interface SelectContentProps extends SelectContentImplProps {}

export type SelectContentNativeElement = SelectContentImplNativeElement
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

export type SelectPopperPrivateProps = object

export type SelectPopperPrivateEmits = {
  placed: [event: PopperContentEmits['placed']]
}

interface SelectContentImplProps
  extends Omit<SelectPopperPositionProps, keyof SelectPopperPrivateProps>,
  Omit<SelectItemAlignedPositionProps, keyof SelectPopperPrivateProps> {
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
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]

  /**
   * Event handler called when the a `autofocus` event happens`.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]
} & Omit<SelectPopperPositionEmits, keyof SelectPopperPrivateEmits> & Omit<
  SelectItemAlignedPositionEmits,
  keyof SelectPopperPrivateEmits
>

export type SelectContentImplNativeElement =
 | SelectPopperPositionNativeElement
 | SelectItemAlignedPositionNativeElement

export type SelectContentImplElement =
  | SelectPopperPositionElement
  | SelectItemAlignedPositionElement

export const [createSelectContentProvide, createSelectContentScope]
  = createProvideScope(CONTENT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
  ])

export const [SelectContentProvider, useSelectContentInject]
  = createSelectContentProvide<SelectContentContextValue>(CONTENT_NAME)

export const selectContentImplProps = {
  props: {
    ...primitiveProps,
    ...popperContentProps.props,
    position: {
      type: String as PropType<'item-aligned' | 'popper'>,
      default: 'item-aligned',
    },
  },
  emits: {
    escapeKeyDown: dismissableLayerProps.emits.escapeKeyDown,
    pointerdownOutside: dismissableLayerProps.emits.pointerdownOutside,
    closeAutoFocus: focusScopeProps.emits.unmountAutoFocus,
  },
}

export const selectContentProps = {
  ...selectContentImplProps,
}

/* -------------------------------------------------------------------------------------------------
 * SelectPopperPosition
 * ----------------------------------------------------------------------------------------------- */
export type SelectPopperPositionNativeElement = PopperContentNaviteElement
export type SelectPopperPositionElement = PopperContentElement

export interface SelectPopperPositionProps
  extends PopperContentProps,
  SelectPopperPrivateProps {}

export type SelectPopperPositionEmits = object

export const selectPopperPositionProps = {
  props: {
    ...primitiveProps,
    align: {
      ...popperContentProps.props.align,
      default: 'start',
    },
    collisionPadding: {
      ...popperContentProps.props.collisionPadding,
      default: CONTENT_MARGIN,
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemAlignedPosition
 * ----------------------------------------------------------------------------------------------- */

export type SelectItemAlignedPositionNativeElement = OkuElement<'div'>
export type SelectItemAlignedPositionElement = HTMLDivElement

export interface SelectItemAlignedPositionProps
  extends PrimitiveProps,
  SelectPopperPrivateProps {}

export type SelectItemAlignedPositionEmits = object

export const selectItemAlignedPositionProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    placed: popperContentProps.emits.placed,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectViewport
 * ----------------------------------------------------------------------------------------------- */

export type SelectViewportNativeElement = OkuElement<'div'>
export type SelectViewportElement = HTMLDivElement

export interface SelectViewportProps extends PrimitiveProps {}

export type SelectViewportContextValue = {
  contentWrapper?: Ref<HTMLDivElement | null>
  shouldExpandOnScrollRef?: Ref<boolean>
  onScrollButtonChange?: (node: SelectScrollButtonImplElement | null) => void
}

export const [createSelectViewpointProvide, createSelectViewpointScope]
  = createProvideScope(VIEWPORT_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectViewportProvider, useSelectViewportContext]
  = createSelectViewpointProvide<SelectViewportContextValue>(VIEWPORT_NAME)

export const selectViewportProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    onscroll: (event: Event) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectGroup
 * ----------------------------------------------------------------------------------------------- */

export type SelectGroupContextValue = { id: string }

export type SelectGroupNativeElement = OkuElement<'div'>
export type SelectGroupElement = HTMLDivElement

export interface SelectGroupProps extends PrimitiveProps {}

export const [createSelectGroupProvide, createSelectGroupScope]
  = createProvideScope(GROUP_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectGroupProvider, useSelectGroupInject]
  = createSelectViewpointProvide<SelectGroupContextValue>(GROUP_NAME)

export const selectGroupProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectLabel
 * ----------------------------------------------------------------------------------------------- */
export type SelectLabelNativeElement = OkuElement<'div'>
export type SelectLabelElement = HTMLDivElement
export interface SelectLabelProps extends PrimitiveProps {}

export const selectLabelProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectSeparator
 * ----------------------------------------------------------------------------------------------- */
export type SelectSeparatorNativeElement = OkuElement<'div'>
export type SelectSeparatorElement = HTMLDivElement
export interface SelectSeparatorProps extends PrimitiveProps {}

export const selectSeperatorProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectArrow
 * ----------------------------------------------------------------------------------------------- */

export type SelectArrowNativeElement = PopperArrowNaviteElement
export type SelectArrowElement = PopperArrowElement
export interface SelectArrowProps extends PopperArrowProps {}

export const selectArrowProps = {
  props: {
    ...primitiveProps,
    ...popperArrowProps.props,
  },
}

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

export type SelectItemNativeElement = OkuElement<'div'>
export type SelectItemElement = HTMLDivElement

export interface SelectItemProps extends PrimitiveProps {
  value: string
  disabled?: boolean
  textValue?: string
}
export const [createSelectItemProvide, createSelectItemScope]
  = createProvideScope(ITEM_NAME, [
    createCollectionScope,
    createPopperScope,
    createSelectScope,
    createSelectContentScope,
  ])

export const [SelectItemProvider, useSelectItemInject]
  = createSelectViewpointProvide<SelectItemContextValue>(ITEM_NAME)

export const selectItemProps = {
  props: {
    ...primitiveProps,
    value: {
      type: String as PropType<string>,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    textValue: {
      type: [String, undefined] as PropType<string | undefined>,
      default: undefined,
    },
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemText
 * ----------------------------------------------------------------------------------------------- */
export type SelectItemTextNativeElement = OkuElement<'span'>
export type SelectItemTextElement = HTMLSpanElement
export interface SelectItemTextProps extends PrimitiveProps {}

export const selectItemTextProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectItemIndicator
 * ----------------------------------------------------------------------------------------------- */
export type SelectItemIndicatorNativeElement = OkuElement<'span'>
export type SelectItemIndicatorElement = HTMLSpanElement
export interface SelectItemIndicatorProps extends PrimitiveProps {}

export const selectItemIndicatorProps = {
  props: {
    ...primitiveProps,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectScrollButtonImpl
 * ----------------------------------------------------------------------------------------------- */
export type SelectScrollButtonImplNativeElement = OkuElement<'div'>
export type SelectScrollButtonImplElement = HTMLDivElement
export interface SelectScrollButtonImplProps extends PrimitiveProps {
  autoScroll?(): void
}

export const selectScrollButtonProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    autoScroll: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * SelectPortal
 * ----------------------------------------------------------------------------------------------- */

export interface SelectPortalProps {
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
}
