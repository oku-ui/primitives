import type { PropType, Ref } from 'vue'
import { ref } from 'vue'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import { createPopperScope, popperAnchorProps, popperArrowProps, popperContentProps } from '@oku-ui/popper'
import type { PopperAnchorElement, PopperAnchorNaviteElement, PopperAnchorProps, PopperArrowElement, PopperArrowNaviteElement, PopperArrowProps, PopperContentElement, PopperContentNaviteElement, PopperContentProps } from '@oku-ui/popper'
import type { Direction } from '@oku-ui/direction'
import type { PortalProps } from '@oku-ui/portal'
import { createCollection } from '@oku-ui/collection'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import type { DismissableLayerEmits, DismissableLayerProps } from '@oku-ui/dismissable-layer'
import { dismissableLayerProps } from '@oku-ui/dismissable-layer'
import type { FocusScopeEmits, FocusScopeProps } from '@oku-ui/focus-scope'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import type { RovingFocusGroupImplEmits } from '../../../core/roving-focus/src/RovingFocusGroupImpl'
import type { GraceIntent } from './utils'

export type ScopedMenu<P> = P & { scopeOkuMenu?: Scope }

export const scopedMenuProps = {
  scopeOkuMenu: {
    ...ScopePropObject,
  },
}

// NAMES
export const MENU_NAME = 'OkuMenu'
export const MENU_ANCHOR_NAME = 'OkuMenuAnchor'
export const MENU_PORTAL_NAME = 'OkuMenuPortal'
export const MENU_CONTENT_NAME = 'OkuMenuContent'
export const MENU_NON_MODAL_NAME = 'OkuMenuContentNonModal'
export const MENU_ROOT_CONTENT_MODAL_NAME = 'OkuMenuRootContentModal'
export const MENU_CONTENT_IMPL_NAME = 'OkuMenuContentImpl'
export const MENU_GROUP_NAME = 'OkuMenuGroup'
export const MENU_LABEL_NAME = 'OkuMenuLabel'
export const MENU_ITEM_NAME = 'OkuMenuItem'
export const MENU_ITEM_IMPL_NAME = 'OkuMenuItemImpl'
export const MENU_CHECKBOX_ITEM_NAME = 'OkuMenuCheckboxItem'
export const MENU_RADIO_GROUP_NAME = 'OkuMenuRadioGroup'
export const MENU_RADIO_ITEM_NAME = 'OkuMenuRadioItem'
export const MENU_ITEM_INDICATOR_NAME = 'OkuMenuItemIndicator'
export const MENU_SEPARATOR_NAME = 'OkuMenuSeparator'
export const MENU_ARROW_NAME = 'OkuMenuArrow'
export const MENU_SUB_NAME = 'OkuMenuSub'
export const MENU_SUB_TRIGGER_NAME = 'OkuMenuSubTrigger'
export const MENU_SUB_CONTENT_NAME = 'OkuMenuSubContent'

/* -------------------------------------------------------------------------------------------------
 * Menu - menu.ts
 * ----------------------------------------------------------------------------------------------- */

export const SELECTION_KEYS = ['Enter', ' ']
export const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home']
export const LAST_KEYS = ['ArrowUp', 'PageDown', 'End']
export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]
export const SUB_OPEN_KEYS: Record<Direction, string[]> = {
  ltr: [...SELECTION_KEYS, 'ArrowRight'],
  rtl: [...SELECTION_KEYS, 'ArrowLeft'],
}
export const SUB_CLOSE_KEYS: Record<Direction, string[]> = {
  ltr: ['ArrowLeft'],
  rtl: ['ArrowRight'],
}

type ItemData = { disabled: boolean; textValue: string }

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection, createCollectionScope } = createCollection<MenuItemElement, ItemData>(MENU_NAME)

export const [createMenuProvide, createMenuScope] = createProvideScope(MENU_NAME,
  [
    createCollectionScope,
    createPopperScope,
    createRovingFocusGroupScope,
  ],
)

export const usePopperScope = createPopperScope()
export const useRovingFocusGroupScope = createRovingFocusGroupScope()

type MenuInjectValue = {
  open: Ref<boolean | undefined>
  onOpenChange(open: boolean): void
  content: Ref<MenuContentElement | null>
  onContentChange(content: MenuContentElement | null): void
}

export const [menuProvider, useMenuInject] = createMenuProvide<MenuInjectValue>(MENU_NAME)

type MenuRootInjectValue = {
  onClose(): void
  isUsingKeyboardRef: Ref<boolean>
  dir: Ref<Direction>
  modal: Ref<boolean>
}

export const [menuRootProvider, useMenuRootInject] = createMenuProvide<MenuRootInjectValue>(MENU_NAME)

export interface MenuProps {
  open: Ref<boolean>
  onOpenChange?(open: boolean): void
  dir: Ref<Direction>
  modal: Ref<boolean>
}

export const menuProps = {
  props: {
    open: {
      type: Boolean as unknown as PropType<MenuProps['open']>,
      default: false,
    },
    dir: {
      type: String as PropType<Direction>,
    },
    modal: {
      type: Boolean,
      default: true,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openChange: (open: boolean) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuAnchor - menu-anchor.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuAnchorNativeElement = PopperAnchorNaviteElement
export type MenuAnchorElement = PopperAnchorElement

export interface MenuAnchorProps extends PopperAnchorProps { }

export const menuAnchorProps = {
  props: {
    ...popperAnchorProps.props,
  },
  emits: {
    ...popperAnchorProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuPortal - menu-portal.ts
* ----------------------------------------------------------------------------------------------- */

export type MenuPortalNativeElement = OkuElement<'div'>
export type MenuPortalElement = HTMLDivElement

type PortalInjectValue = {
  forceMount?: Ref<true | undefined>
}

export const [portalProvider, usePortalInject] = createMenuProvide<PortalInjectValue>(MENU_PORTAL_NAME,
  {
    forceMount: ref<true | undefined>(undefined),
  },
)

export interface MenuPortalProps {
  /**
   * Specify a container element to portal the content into.
   */
  container?: PortalProps['container']
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const menuPortalProps = {
  props: {
    container: {
      type: Object as PropType<PortalProps['container']>,
    },
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 *  MenuContentImpl - menu-content-impl
 * ----------------------------------------------------------------------------------------------- */

export type MenuContentImplNativeElement = PopperContentNaviteElement
export type MenuContentImplElement = PopperContentElement

// export type FocusScopeProps = FocusScopeElement
// export type DismissableLayerProps = DismissableLayerElement
// export type RovingFocusGroupProps = RovingFocusGroupElement

// export type PopperContentProps = PopperContentElement

export type MenuContentImplPrivateProps = {
  disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents']

  /**
   * Whether scrolling outside the `MenuContent` should be prevented
   * (default: `false`)
   */
  disableOutsideScroll?: boolean

  /**
   * Whether focus should be trapped within the `MenuContent`
   * (default: false)
   */
  trapFocus?: FocusScopeProps['trapped']
}

export type MenuContentImplPrivateEmits = {
  openAutoFocus: [event: FocusScopeEmits['mountAutoFocus'][0]]
  dismiss: [event: DismissableLayerEmits['dismiss']]
}

const menuContentImplPrivateProps = {
  props: {
    disableOutsidePointerEvents: {
      type: Boolean as PropType<DismissableLayerProps['disableOutsidePointerEvents']>,
      default: undefined,
    },
    disableOutsideScroll: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    trapFocus: {
      type: Boolean as PropType<FocusScopeProps['trapped']>,
      default: false,
    },
  },

  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openAutoFocus: (event: FocusScopeEmits['mountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    dismiss: (event: DismissableLayerEmits['dismiss']) => true,
  },
  propsKeys: ['disableOutsidePointerEvents', 'disableOutsideScroll', 'trapFocus'] as ['disableOutsidePointerEvents', 'disableOutsideScroll', 'trapFocus'],
  emitsKeys: ['openAutoFocus', 'dismiss'] as ['openAutoFocus', 'dismiss'],
}

export interface MenuContentImplProps extends MenuContentImplPrivateProps, Omit<PopperContentProps, 'dir'> {
  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: RovingFocusGroupProps['loop']
}

export type MenuContentImplEmits = {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]

  entryFocus: [event: RovingFocusGroupImplEmits['entryFocus'][0]]
  escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown'][0]]
  pointerdownOutside: [event: DismissableLayerEmits['pointerdownOutside'][0]]
  focusoutSide: [event: DismissableLayerEmits['focusoutSide'][0]]
  interactOutside: [event: DismissableLayerEmits['interactOutside'][0]]

  // TODO
  mountAutoFocus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  blur: [event: FocusEvent]
  pointermove: [event: PointerEvent]
} & MenuContentImplPrivateEmits

export const menuContentImplProps = {
  props: {
    ...dismissableLayerProps.props,
    ...menuContentImplPrivateProps.props,
    ...propsOmit(popperContentProps.props, ['dir']),
    loop: {
      type: Boolean as PropType<RovingFocusGroupProps['loop']>,
      default: false,
    },
  },
  emits: {
    ...propsOmit(popperContentProps.emits, ['placed']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    openAutoFocus: (event: FocusScopeEmits['mountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    closeAutoFocus: (event: FocusScopeEmits['unmountAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    entryFocus: (event: RovingFocusGroupImplEmits['entryFocus'][0]) => true,
    dismiss: () => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    escapeKeyDown: (event: DismissableLayerEmits['escapeKeyDown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdownOutside: (event: DismissableLayerEmits['pointerdownOutside'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusoutSide: (event: DismissableLayerEmits['focusoutSide'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: DismissableLayerEmits['interactOutside'][0]) => true,

    // TODO
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  MenuRootContentModal - menu-root-content-modal.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuRootContentTypeNativeElement = MenuContentImplNativeElement
export type MenuRootContentTypeElement = MenuContentImplElement

export interface MenuRootContentTypeProps extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> { }

export type MenuRootContentTypeEmits = Omit<MenuContentImplEmits, keyof MenuContentImplPrivateEmits>
export const menuRootContentTypeProps = {
  props: {
    ...propsOmit(menuContentImplProps.props, menuContentImplPrivateProps.propsKeys),
  },
  emits: {
    ...propsOmit(menuContentImplProps.emits, menuContentImplPrivateProps.emitsKeys),
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuContent - menu-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuContentNativeElement = MenuRootContentTypeNativeElement
export type MenuContentElement = MenuRootContentTypeElement

type MenuContentInjectValue = {
  onItemEnter(event: PointerEvent): void
  onItemLeave(event: PointerEvent): void
  onTriggerLeave(event: PointerEvent): void
  searchRef: Ref<string>
  pointerGraceTimerRef: Ref<number>
  onPointerGraceIntentChange(intent: GraceIntent | null): void
}
export const [menuContentProvider, useMenuContentInject] = createMenuProvide<MenuContentInjectValue>(MENU_CONTENT_NAME)

/**
 * We purposefully don't union MenuRootContent and MenuSubContent props here because
 * they have conflicting prop types. We agreed that we would allow MenuSubContent to
 * accept props that it would just ignore.
 */
export interface MenuContentProps extends MenuRootContentTypeProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const menuContentProps = {
  props: {
    ...menuRootContentTypeProps.props,
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
    ...menuRootContentTypeProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuRootContentNonModal - menu-root-content-non-modal.ts
 * ----------------------------------------------------------------------------------------------- */

export const menuRootContentNonModalProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuGroup - menu-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuGroupNativeElement = OkuElement<'div'>
export type MenuGroupElement = HTMLDivElement

export interface MenuGroupProps extends PrimitiveProps {}

export const menuGroupProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuLabel - menu-label.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuLabelNativeElement = OkuElement<'div'>
export type MenuLabelElement = HTMLDivElement

export interface MenuLabelProps extends PrimitiveProps { }

export const menuLabelProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuItemImpl - menu-item-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuItemImplNativeElement = OkuElement<'div'>
export type MenuItemImplElement = HTMLDivElement

export interface MenuItemImplProps extends PrimitiveProps {
  disabled?: boolean
  textValue?: string
}
// TODO
export type MenuItemImplEmits = {
  pointermove: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
  focus: [event: FocusEvent]
  blur: [event: FocusEvent]
}

export const menuItemImplProps = {
  props: {
    textValue: {
      type: String as PropType<string>,
    },
    disabled: {
      type: Boolean as PropType<false | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerleave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    focus: (event: FocusEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    blur: (event: FocusEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuItem - menu-item.ts
 * ----------------------------------------------------------------------------------------------- */

export const ITEM_SELECT = 'menu.itemSelect'

export type MenuItemNativeElement = MenuItemImplNativeElement
export type MenuItemElement = MenuItemImplElement

export interface MenuItemProps extends Omit<MenuItemImplProps, 'onSelect'> {
  onSelect?: (event: Event) => void
}

export type MenuItemEmits = Omit<MenuItemImplEmits, 'select'> & {
  select: [event: Event]
  pointerdown: [event: PointerEvent]
  pointerup: [event: PointerEvent]
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}

export const menuItemProps = {
  props: {
    ...menuItemImplProps.props,
  },
  emits: {
    ...menuItemImplProps.emits,
    // eslint-disable-next-line unused-imports/no-unused-vars
    select: (event: Event) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuCheckboxItem - menu-checkbox-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuCheckboxItemNativeElement = MenuItemNativeElement
export type MenuCheckboxItemElement = MenuItemElement

export type CheckedState = boolean | 'indeterminate'

export interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState
}

export type MenuCheckboxItemEmits = {
  select: [event: Event]
  // `onCheckedChange` can never be called with `"indeterminate"` from the inside
  checkedChange: [checked: boolean]
}

export const menuCheckboxItemProps = {
  props: {
    checked: {
      type: Boolean as PropType<CheckedState>,
      default: false,
    },
    ...menuItemProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    checkedChange: (checked: boolean) => true,
    ...menuItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuRadioGroup - menu-radio-group.ts
 * ----------------------------------------------------------------------------------------------- */

export const [radioGroupProvider, useRadioGroupInject] = createMenuProvide<MenuRadioGroupProps>(
  MENU_RADIO_GROUP_NAME,
  { value: undefined, onValueChange: () => {} },
)

export type MenuRadioGroupNativeElement = MenuGroupNativeElement
export type MenuRadioGroupElement = MenuGroupElement

export interface MenuRadioGroupProps extends MenuGroupProps {
  value?: Ref<string | undefined>
  onValueChange?: (value: string) => void
}

export const menuRadioGroupProps = {
  props: {
    value: {
      type: String,
    },
    ...menuGroupProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string) => true,
    ...menuGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuRadioItem - menu-radio-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuRadioItemNativeElement = MenuItemNativeElement
export type MenuRadioItemElement = MenuItemElement

export interface MenuRadioItemProps extends MenuItemProps {
  value: Ref<string>
}
// TODO
export type MenuRadioItemEmits = {
  select: [event: Event]
}

export const menuRadioItemProps = {
  props: {
    value: {
      type: String,
    },
    ...menuItemProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openChange: (open: boolean) => true,
    ...menuItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuItemIndicator - menu-item-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

type CheckboxInjectValue = { checked: Ref<CheckedState> }

export const [itemIndicatorProvider, useItemIndicatorInject] = createMenuProvide<CheckboxInjectValue>(
  MENU_ITEM_INDICATOR_NAME,
  { checked: ref(false) },
)

export type MenuItemIndicatorNativeElement = OkuElement<'span'>
export type MenuItemIndicatorElement = HTMLSpanElement

// export type PrimitiveSpanProps = Radix.ComponentPropsWithoutRef<typeof Primitive.span>;
export interface MenuItemIndicatorProps extends PrimitiveProps {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const menuItemIndicatorProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator - menu-separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuSeparatorNativeElement = OkuElement<'div'>
export type MenuSeparatorElement = HTMLDivElement

export interface MenuSeparatorProps extends PrimitiveProps { }

export const menuSeparatorProps = {
  props: {
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuArrow - menu-arrow.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuArrowNativeElement = PopperArrowNaviteElement
export type MenuArrowElement = PopperArrowElement
export interface MenuArrowProps extends PopperArrowProps {}

export const menuArrowProps = {
  props: {
    ...popperArrowProps.props,
  },
  emits: {
    ...popperArrowProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuSub - menu-sub.ts
 * ----------------------------------------------------------------------------------------------- */

type MenuSubInjectValue = {
  contentId: Ref<string>
  triggerId: Ref<string>
  trigger: Ref<MenuSubTriggerElement | null>
  onTriggerChange(trigger: MenuSubTriggerElement | null): void
}

export const [menuSubProvider, useMenuSubInject] = createMenuProvide<MenuSubInjectValue>(MENU_SUB_NAME)

export interface MenuSubProps {
  open?: Ref<boolean>
}

export type MenuSubEmits = {
  openChange: [open: boolean]
  triggerChange: [trigger: MenuSubTriggerElement | null]
}

export const menuSubProps = {
  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openChange: (open: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    triggerChange: (trigger: MenuSubTriggerElement | null) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuSubTrigger - menu-sub-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuSubTriggerNativeElement = MenuItemImplNativeElement
export type MenuSubTriggerElement = MenuItemImplElement

export interface MenuSubTriggerProps extends MenuItemImplProps {
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}

// TODO
// export type MenuSubTriggerEmits = {
//   click: [event: MouseEvent]
//   pointermove: [event: PointerEvent]
//   pointerleave: [event: PointerEvent]
//   Keydown: [event: KeyboardEvent]
// }

export interface MenuSubTriggerEmits extends MenuItemImplEmits {
  click: [event: MouseEvent]
  keydown: [event: KeyboardEvent]
}

export const menuSubTriggerProps = {
  props: {
    ...menuItemImplProps.props,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: MouseEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: KeyboardEvent) => true,
    ...menuItemImplProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuSubContent - menu-sub-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuSubContentNativeElement = Omit<MenuContentImplNativeElement, 'side' | 'align'>
export type MenuSubContentElement = Omit<MenuContentImplElement, 'side' | 'align'>

export interface MenuSubContentProps extends Omit<MenuContentImplProps, 'side' | 'align'> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

// TODO
// export type MenuSubContentEmits = {
//   openAutoFocus: [event: FocusScopeEmits['mountAutoFocus'][0]]
//   focusoutSide: [event: DismissableLayerEmits['focusoutSide'][0]]
//   keydown: [event: KeyboardEvent]
//   escapeKeyDown: [event: DismissableLayerEmits['escapeKeyDown'][0]]
// }

export interface MenuSubContentEmits extends Omit<
MenuContentImplEmits,
 keyof MenuContentImplPrivateEmits | 'closeAutoFocus' | 'entryFocus'
 > {
}

export const menuSubContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    ...propsOmit(menuContentImplProps.props, ['side', 'align']),
  },
  emits: {
    ...propsOmit(menuContentImplProps.emits, ['closeAutoFocus', 'entryFocus']),
  },
}
