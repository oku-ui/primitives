import type { PropType, Ref } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import type { Direction } from '@oku-ui/direction'
import { createMenuScope, menuArrowProps, menuCheckboxItemProps, menuContentProps, menuGroupProps, menuItemIndicatorProps, menuItemProps, menuLabelProps, menuPortalProps, menuRadioGroupProps, menuRadioItemProps, menuSeparatorProps, menuSubContentProps, menuSubTriggerProps } from '@oku-ui/menu'
import type { MenuArrowElement, MenuArrowNativeElement, MenuArrowProps, MenuCheckboxItemElement, MenuCheckboxItemEmits, MenuCheckboxItemNativeElement, MenuCheckboxItemProps, MenuContentElement, MenuContentNativeElement, MenuContentProps, MenuGroupElement, MenuGroupNativeElement, MenuGroupProps, MenuItemElement, MenuItemEmits, MenuItemIndicatorElement, MenuItemIndicatorNativeElement, MenuItemIndicatorProps, MenuItemNativeElement, MenuItemProps, MenuLabelElement, MenuLabelNativeElement, MenuLabelProps, MenuPortalProps, MenuRadioGroupElement, MenuRadioGroupNativeElement, MenuRadioGroupProps, MenuRadioItemElement, MenuRadioItemEmits, MenuRadioItemNativeElement, MenuRadioItemProps, MenuSeparatorElement, MenuSeparatorNativeElement, MenuSeparatorProps, MenuSubContentElement, MenuSubContentEmits, MenuSubContentNativeElement, MenuSubContentProps, MenuSubTriggerElement, MenuSubTriggerEmits, MenuSubTriggerNativeElement, MenuSubTriggerProps } from '@oku-ui/menu'

export type ScopedContextMenu<P> = P & { scopeOkuContextMenu?: Scope }

export const scopedContextMenuProps = {
  scopeOkuContextMenu: {
    ...ScopePropObject,
  },
}

// NAMES
export const CONTEXT_MENU_NAME = 'OkuContextMenu'
export const CONTEXT_MENU_TRIGGER_NAME = 'OkuContextMenuTrigger'
export const CONTEXT_MENU_PORTAL_NAME = 'OkuContextMenuPortal'
export const CONTEXT_MENU_CONTENT_NAME = 'OkuContextMenuContent'
export const CONTEXT_MENU_GROUP_NAME = 'OkuContextMenuGroup'
export const CONTEXT_MENU_LABEL_NAME = 'OkuContextMenuLabel'
export const CONTEXT_MENU_ITEM_NAME = 'OkuContextMenuItem'
export const CONTEXT_MENU_CHECKBOX_ITEM_NAME = 'OkuContextMenuCheckboxItem'
export const CONTEXT_MENU_RADIO_GROUP_NAME = 'OkuContextMenuRadioGroup'
export const CONTEXT_MENU_RADIO_ITEM_NAME = 'OkuContextMenuRadioItem'
export const CONTEXT_MENU_ITEM_INDICATOR_NAME = 'OkuContextMenuItemIndicator'
export const CONTEXT_MENU_SEPARATOR_NAME = 'OkuContextMenuSeparator'
export const CONTEXT_MENU_ARROW_NAME = 'OkuContextMenuArrow'
export const CONTEXT_MENU_SUB_NAME = 'OkuContextMenuSub'
export const CONTEXT_MENU_SUB_TRIGGER_NAME = 'OkuContextMenuSubTrigger'
export const CONTEXT_MENU_SUB_CONTENT_NAME = 'OkuContextMenuSubContent'

/* -------------------------------------------------------------------------------------------------
 * ContextMenu - Context-menu.ts
 * ----------------------------------------------------------------------------------------------- */

export type Point = { x: number; y: number }

export const [createMenuContextProvide, createContextMenuScop] = createProvideScope(CONTEXT_MENU_NAME, [
  createMenuScope,
])

export const useMenuScope = createMenuScope()

export type ContextMenuProvideValue = {
  open: Ref<boolean>
  onOpenChange(open: boolean): void
  modal: Ref<boolean>
}

export const [ContextMenuProvider, useContextMenuInject]
  = createMenuContextProvide<ContextMenuProvideValue>(CONTEXT_MENU_NAME)

export interface ContextMenuProps {
  dir?: Direction
  modal: boolean
}

export const contextMenuProps = {
  props: {
    dir: {
      type: String as PropType<ContextMenuProps['dir']>,
    },
    modal: {
      type: Boolean as PropType<ContextMenuProps['modal']>,
      default: true,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    openChange: (open: boolean) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ContextMenuTrigger - context-menu-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuTriggerNativeElement = OkuElement<'span'>
export type ContextMenuTriggerElement = HTMLSpanElement

export interface ContextMenuTriggerProps extends PrimitiveProps {
  disabled?: boolean
}

export type ContextMenuTriggerEmits = {
  contextMenu: [event: Event]
  pointerdown: [event: PointerEvent]
  pointermove: [event: PointerEvent]
  pointercancel: [event: PointerEvent]
  pointerup: [event: PointerEvent]
}

export const contextMenuTriggerProps = {
  props: {
    disabled: {
      type: Boolean as PropType<ContextMenuTriggerProps['disabled']>,
      default: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    contextMenu: (event: ContextMenuTriggerEmits['contextMenu'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: ContextMenuTriggerEmits['pointerdown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointermove: (event: ContextMenuTriggerEmits['pointermove'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointercancel: (event: ContextMenuTriggerEmits['pointercancel'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerup: (event: ContextMenuTriggerEmits['pointerup'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ContextMenuPortal - context-menu-portal.ts
 * ----------------------------------------------------------------------------------------------- */

export interface ContextMenuPortalProps extends MenuPortalProps { }

export const contextMenuPortalProps = {
  props: {
    ...menuPortalProps.props,
  },
  emits: {
    ...menuPortalProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ContextMenuContent - context-menu-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuContentNativeElement = MenuContentNativeElement
export type ContextMenuContentElement = MenuContentElement

export interface ContextMenuContentProps extends Omit<MenuContentProps, 'side' | 'sideOffset' | 'align'> { }

export const contextMenuContentProps = {
  props: {
    ...propsOmit(menuContentProps.props, ['side', 'sideOffset', 'align']),
  },
  emits: {
    ...propsOmit(menuContentProps.emits, ['entryFocus']),
  },
}
/* -------------------------------------------------------------------------------------------------
 * ContextMenuGroup - context-menu-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuGroupNativeElement = MenuGroupNativeElement
export type ContextMenuGroupElement = MenuGroupElement

export interface ContextMenuGroupProps extends MenuGroupProps { }

export const contextMenuGroupProps = {
  props: {
    ...menuGroupProps.props,
  },
  emits: {
    ...menuGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuLabel - context-menu-label.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuLabelNativeElement = MenuLabelNativeElement
export type ContextMenuLabelElement = MenuLabelElement

export interface ContextMenuLabelProps extends MenuLabelProps { }

export const contextMenuLabelProps = {
  props: {
    ...menuLabelProps.props,
  },
  emits: {
    ...menuLabelProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuItem - context-menu-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuItemNativeElement = MenuItemNativeElement
export type ContextMenuItemElement = MenuItemElement

export interface ContextMenuItemProps extends MenuItemProps { }

export interface ContextMenuItemEmits extends MenuItemEmits { }

export const contextMenuItemProps = {
  props: {
    ...menuItemProps.props,
  },
  emits: {
    ...menuItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuCheckboxItem - context-menu-Checkbox-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuCheckboxItemNativeElement = MenuCheckboxItemNativeElement
export type ContextMenuCheckboxItemElement = MenuCheckboxItemElement

export interface ContextMenuCheckboxItemProps extends MenuCheckboxItemProps { }
export interface ContextMenuCheckboxItemEmits extends MenuCheckboxItemEmits { }

export const contextMenuCheckboxItemProps = {
  props: {
    ...menuCheckboxItemProps.props,
  },
  emits: {
    ...menuCheckboxItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuRadioGroup - context-menu-radio-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuRadioGroupNativeElement = MenuRadioGroupNativeElement
export type ContextMenuRadioGroupElement = MenuRadioGroupElement

export interface ContextMenuRadioGroupProps extends MenuRadioGroupProps { }

export const contextMenuRadioGroupProps = {
  props: {
    ...menuRadioGroupProps.props,
  },
  emits: {
    ...menuRadioGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuRadioItem - context-menu-radio-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuRadioItemNativeElement = MenuRadioItemNativeElement
export type ContextMenuRadioItemElement = MenuRadioItemElement

export interface ContextMenuRadioItemProps extends MenuRadioItemProps { }
export interface ContextMenuRadioItemEmits extends MenuRadioItemEmits { }

export const contextMenuRadioItemProps = {
  props: {
    ...menuRadioItemProps.props,
  },
  emits: {
    ...menuRadioItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuItemIndicator - context-menu--item-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuItemIndicatorNativeElement = MenuItemIndicatorNativeElement
export type ContextMenuItemIndicatorElement = MenuItemIndicatorElement

export interface ContextMenuItemIndicatorProps extends MenuItemIndicatorProps { }

export const contextMenuItemIndicatorProps = {
  props: {
    ...menuItemIndicatorProps.props,
  },
  emits: {
    ...menuItemIndicatorProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuSeparator - context-menu-separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuSeparatorNativeElement = MenuSeparatorNativeElement
export type ContextMenuSeparatorElement = MenuSeparatorElement

export interface ContextMenuSeparatorProps extends MenuSeparatorProps { }

export const contextMenuSeparatorProps = {
  props: {
    ...menuSeparatorProps.props,
  },
  emits: {
    ...menuSeparatorProps.emits,
  },
}
/* -------------------------------------------------------------------------------------------------
 *  ContextMenuArrow - context-menu-arrow.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuArrowNativeElement = MenuArrowNativeElement
export type ContextMenuArrowElement = MenuArrowElement

export interface ContextMenuArrowProps extends MenuArrowProps { }

export const contextMenuArrowProps = {
  props: {
    ...menuArrowProps.props,
  },
  emits: {
    ...menuArrowProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuSub - context-menu-sub.ts
 * ----------------------------------------------------------------------------------------------- */

export interface ContextMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
}

export type ContextMenuSubEmits = {
  'update:modelValue': [value: boolean]
  openChange: [open: boolean]
}

export const contextMenuSubProps = {
  props: {
    modelValue: {
      type: Boolean as PropType<boolean>,
      default: undefined,
    },
    open: {
      type: Boolean as PropType<ContextMenuSubProps['open']>,
    },
    defaultOpen: {
      type: Boolean as PropType<ContextMenuSubProps['defaultOpen']>,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (value: boolean) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (value: boolean) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuSubTrigger - context-menu-sub-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuSubTriggerNativeElement = MenuSubTriggerNativeElement
export type ContextMenuSubTriggerElement = MenuSubTriggerElement

export interface ContextMenuSubTriggerProps extends MenuSubTriggerProps { }
export interface ContextMenuSubTriggerEmits extends MenuSubTriggerEmits { }

export const contextMenuSubTriggerProps = {
  props: {
    ...menuSubTriggerProps.props,
  },
  emits: {
    ...menuSubTriggerProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 *  ContextMenuSubContent - context-menu-sub-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type ContextMenuSubContentNativeElement = MenuSubContentNativeElement
export type ContextMenuSubContentElement = MenuSubContentElement

export interface ContextMenuSubContentProps extends MenuSubContentProps { }
export interface ContextMenuSubContentProps extends MenuSubContentEmits { }

export const contextMenuSubContentProps = {
  props: {
    ...menuSubContentProps.props,
  },
  emits: {
    ...menuSubContentProps.emits,
  },
}
