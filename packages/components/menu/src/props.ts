import { primitiveProps } from '@oku-ui/primitive'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { PropType, Ref } from 'vue'
import type { PopperAnchorElement, PopperAnchorNaviteElement, PopperAnchorProps, PopperContentElement, PopperContentNaviteElement } from '@oku-ui/popper'
import type { Direction } from '@oku-ui/direction'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import type { Scope } from '@oku-ui/provide'
import { createCollection } from '@oku-ui/collection'
import type { PortalProps } from '@oku-ui/portal'
import { createPopperScope } from '@oku-ui/popper'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
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
export const MENU_NON_MODEL_NAME = 'OkuMenuContentNonModel'
export const MENU_ROOT_CONTENT_TYPE_NAME = 'OkuMenuRootContentType'
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

export const { CollectionProvider, CollectionSlot, CollectionItemSlot, useCollection, createCollectionScope } = createCollection<MenuItemNaviteElement, ItemData>(MENU_NAME)

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
  open: Ref<boolean>
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
  open?: Ref<boolean>
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

export type MenuAnchorElement = PopperAnchorElement
export type MenuAnchorNaviteElement = PopperAnchorNaviteElement

export interface MenuAnchorProps extends PopperAnchorProps { }

export const menuAnchorProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuPortal - menu-portal.ts
* ----------------------------------------------------------------------------------------------- */

export type MenuPortalNaviteElement = OkuElement<'div'>
export type MenuPortalElement = HTMLDivElement

type PortalInjectValue = {
  forceMount?: Ref<true | undefined>
}

export const [portalProvider, usePortalInject] = createMenuProvide<PortalInjectValue>(MENU_PORTAL_NAME,
  {
    forceMount: undefined,
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
    ...primitiveProps,
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuContent - menu-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuContentElement = MenuRootContentTypeElement
export type MenuContentNaviteElement = MenuRootContentTypeNaviteElement

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
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    itemEnter: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    itemLeave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    triggerLeave: (event: PointerEvent) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerGraceIntentChange: (intent: GraceIntent | null) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuContentNonModel - menu-root-content-non-modal.ts
 * ----------------------------------------------------------------------------------------------- */

export const menuRootContentNonModalProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 *  MenuRootContentType - menu-root-content-type.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuRootContentTypeElement = MenuContentImplElement
export type MenuRootContentTypeNaviteElement = MenuContentImplNaviteElement

export interface MenuRootContentTypeProps extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps> { }
// TODO
export type MenuRootContentTypeEmits = {
  focusOutside: [event: FocusEvent]
}

export const menuRootContentTypeProps = {
  props: {},
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    focusOutside: (event: FocusEvent) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  MenuContentImpl - menu-content-impl
 * ----------------------------------------------------------------------------------------------- */

export type MenuContentImplElement = PopperContentElement
export type MenuContentImplNaviteElement = PopperContentNaviteElement

export type FocusScopeProps = FocusScopeElement
export type DismissableLayerProps = DismissableLayerElement
export type RovingFocusGroupProps = RovingFocusGroupElement
export type PopperContentProps = PopperContentElement

export type MenuContentImplPrivateProps = {
  onOpenAutoFocus?: FocusScopeProps['onMountAutoFocus']
  onDismiss?: DismissableLayerProps['onDismiss']
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

export interface MenuContentImplProps extends MenuContentImplPrivateProps, Omit<PopperContentProps, 'dir' | 'onPlaced'> {
  /**
   * Event handler called when auto-focusing on close.
   * Can be prevented.
   */
  onCloseAutoFocus?: FocusScopeProps['onUnmountAutoFocus']

  /**
   * Whether keyboard navigation should loop around
   * @defaultValue false
   */
  loop?: RovingFocusGroupProps['loop']

  onEntryFocus?: RovingFocusGroupProps['onEntryFocus']
  onEscapeKeyDown?: DismissableLayerProps['onEscapeKeyDown']
  onPointerDownOutside?: DismissableLayerProps['onPointerDownOutside']
  onFocusOutside?: DismissableLayerProps['onFocusOutside']
  onInteractOutside?: DismissableLayerProps['onInteractOutside']
}
// TODO
export type MenuContentImplEmits = {
  mountAutoFocus: [event: FocusEvent]
  entryFocus: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  blur: [event: FocusEvent]
  pointermove: [event: PointerEvent]
}

export const menuContentImplProps = {
  props: {
    loop: {
      type: Boolean as PropType<RovingFocusGroupProps['loop']>,
      default: undefined,
    },
  },
  emits: {

    // openAutoFocus?: FocusScopeProps['onMountAutoFocus']
    // dismiss?: DismissableLayerProps['onDismiss']
    // disableOutsidePointerEvents?: DismissableLayerProps['disableOutsidePointerEvents']
    // closeAutoFocus?: FocusScopeProps['onUnmountAutoFocus']
    // entryFocus?: RovingFocusGroupProps['onEntryFocus']
    // escapeKeyDown?: DismissableLayerProps['onEscapeKeyDown']
    // pointerDownOutside?: DismissableLayerProps['onPointerDownOutside']
    // focusOutside?: DismissableLayerProps['onFocusOutside']
    // interactOutside?: DismissableLayerProps['onInteractOutside']
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuGroup - menu-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuGroupElement = OkuElement<'div'>
export type MenuGroupNaviteElement = HTMLDivElement

export interface MenuGroupProps extends PrimitiveProps {}

export const menuGroupProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuLabel - menu-label.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuLabelElement = OkuElement<'div'>
export type MenuLabelNaviteElement = HTMLDivElement

export interface MenuLabelProps extends PrimitiveProps { }

export const menuLabelProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuItem - menu-item.ts
 * ----------------------------------------------------------------------------------------------- */

export const ITEM_SELECT = 'menu.itemSelect'

export type MenuItemElement = MenuItemImplElement
export type MenuItemNaviteElement = MenuItemImplNaviteElement

export interface MenuItemProps extends Omit<MenuItemImplProps, 'onSelect'> {
  onSelect?: (event: Event) => void
}
// TODO
export type MenuItemEmits = {
  pointerup: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
}

export const menuItemProps = {
  props: {
    disabled: {
      type: Boolean as PropType<false | undefined>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    select: (event: Event) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuItemImpl - menu-item-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuItemImplElement = OkuElement<'div'>
export type MenuItemImplNaviteElement = HTMLDivElement

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
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuCheckboxItem - menu-checkbox-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuCheckboxItemElement = MenuItemElement
export type MenuCheckboxItemNaviteElement = MenuItemNaviteElement

export type CheckedState = boolean | 'indeterminate'

export interface MenuCheckboxItemProps extends MenuItemProps {
  checked?: CheckedState
  // `onCheckedChange` can never be called with `"indeterminate"` from the inside
  onCheckedChange?: (checked: boolean) => void
}
// TODO
export type MenuCheckboxItemEmits = {
  select: [event: Event]
}

export const menuCheckboxItemProps = {
  props: {
    checked: {
      type: Boolean as PropType<CheckedState>,
      default: false,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    checkedChange: (checked: boolean) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuRadioGroup - menu-radio-group.ts
 * ----------------------------------------------------------------------------------------------- */

export const [radioGroupProvider, useRadioGroupInject] = createMenuProvide<MenuRadioGroupProps>(
  MENU_RADIO_GROUP_NAME,
  { value: undefined, onValueChange: () => {} },
)

export type MenuRadioGroupElement = MenuGroupElement
export type MenuRadioGroupNaviteElement = MenuGroupNaviteElement

export interface MenuRadioGroupProps extends MenuGroupProps {
  value?: Ref<string>
  onValueChange?: (value: string) => void
}

export const menuRadioGroupProps = {
  props: {
    value: {
      type: String,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    valueChange: (value: string) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuRadioItem - menu-radio-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuRadioItemElement = MenuItemElement
export type MenuRadioItemNaviteElement = MenuItemNaviteElement

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
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openChange: (open: boolean) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * MenuItemIndicator - menu-item-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

type CheckboxInjectValue = { checked: CheckedState }

export const [itemIndicatorProvider, useItemIndicatorInject] = createMenuProvide<CheckboxInjectValue>(
  MENU_ITEM_INDICATOR_NAME,
  { checked: false },
)

export type MenuItemIndicatorElement = OkuElement<'span'>
export type MenuItemIndicatorNaviteElement = HTMLSpanElement

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
  },
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuSeparator - menu-separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuSeparatorElement = OkuElement<'div'>
export type MenuSeparatorNaviteElement = HTMLDivElement

export interface MenuSeparatorProps extends PrimitiveProps { }

export const menuSeparatorProps = {
  props: {},
  emits: {},
}

/* -------------------------------------------------------------------------------------------------
 * MenuArrow - menu-arrow.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuArrowElement = PopperArrowElement
export type MenuArrowNaviteElement = PopperArrowNaviteElement
export interface MenuArrowProps extends PopperArrowProps {}

export const menuArrowProps = {
  props: {},
  emits: {},
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
  onOpenChange?(open: boolean): void
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

export type MenuSubTriggerElement = MenuItemImplElement
export type MenuSubTriggerNaviteElement = MenuItemImplNaviteElement
export interface MenuSubTriggerProps extends MenuItemImplProps {}
// TODO
export type MenuSubTriggerEmits = {
  Keydown: [event: KeyboardEvent]
  pointermove: [event: PointerEvent]
  pointerleave: [event: PointerEvent]
}

/* -------------------------------------------------------------------------------------------------
 * MenuSubContent - menu-sub-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type MenuSubContentElement = MenuContentImplElement
export type MenuSubContentNaviteElement = MenuContentImplNaviteElement

interface MenuSubContentProps extends Omit<MenuContentImplProps, keyof MenuContentImplPrivateProps | 'onCloseAutoFocus' | 'onEntryFocus' | 'side' | 'align'> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const menuSubContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<true | undefined>,
      default: undefined,
    },
    // ...propsOmit(menuContentImplProps.props, ['onCloseAutoFocus' | 'onEntryFocus' | 'side' | 'align']),
  },
  emits: {
    // ...menuContentImplProps.emits,
  },
}

// TODO
export type MenuSubContentEmits = {
  focusOutside: [event: FocusEvent]
  keydown: [event: KeyboardEvent]
  escapeKeydown: [event: KeyboardEvent]
}
