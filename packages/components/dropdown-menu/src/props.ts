import type { PropType, Ref } from 'vue'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import type { Direction } from '@oku-ui/direction'
import type { DismissableLayerEmits } from '@oku-ui/dismissable-layer'
import type { FocusScopeEmits } from '@oku-ui/focus-scope'
import { createMenuScope, menuArrowProps, menuCheckboxItemProps, menuContentProps, menuGroupProps, menuItemIndicatorProps, menuItemProps, menuLabelProps, menuPortalProps, menuRadioGroupProps, menuRadioItemProps, menuSeparatorProps, menuSubContentProps, menuSubTriggerProps } from '@oku-ui/menu'
import type { MenuArrowElement, MenuArrowNativeElement, MenuArrowProps, MenuCheckboxItemElement, MenuCheckboxItemEmits, MenuCheckboxItemNativeElement, MenuCheckboxItemProps, MenuContentElement, MenuContentNativeElement, MenuContentProps, MenuGroupElement, MenuGroupNativeElement, MenuGroupProps, MenuItemElement, MenuItemEmits, MenuItemIndicatorElement, MenuItemIndicatorNativeElement, MenuItemIndicatorProps, MenuItemNativeElement, MenuItemProps, MenuLabelElement, MenuLabelNativeElement, MenuLabelProps, MenuPortalProps, MenuRadioGroupElement, MenuRadioGroupNativeElement, MenuRadioGroupProps, MenuRadioItemElement, MenuRadioItemEmits, MenuRadioItemNativeElement, MenuRadioItemProps, MenuSeparatorElement, MenuSeparatorNativeElement, MenuSeparatorProps, MenuSubContentElement, MenuSubContentEmits, MenuSubContentNativeElement, MenuSubContentProps, MenuSubTriggerElement, MenuSubTriggerEmits, MenuSubTriggerNativeElement, MenuSubTriggerProps } from '@oku-ui/menu'

export type ScopedDropdownMenu<P> = P & { scopeOkuDropdownMenu?: Scope }

export const scopedDropdownMenuProps = {
  scopeOkuDropdownMenu: {
    ...ScopePropObject,
  },
}

// NAMES
export const DROPDOWN_MENU_NAME = 'OkuDropdownMenu'
export const DROPDOWN_MENU_TRIGGER_NAME = 'OkuDropdownMenuTrigger'
export const DROPDOWN_MENU_PORTAL_NAME = 'OkuDropdownMenuPortal'
export const DROPDOWN_MENU_CONTENT_NAME = 'OkuDropdownMenuContent'
export const DROPDOWN_MENU_GROUP_NAME = 'OkuDropdownMenuGroup'
export const DROPDOWN_MENU_LABEL_NAME = 'OkuDropdownMenuLabel'
export const DROPDOWN_MENU_ITEM_NAME = 'OkuDropdownMenuItem'
export const DROPDOWN_MENU_CHECKBOX_ITEM_NAME = 'OkuDropdownMenuCheckboxItem'
export const DROPDOWN_MENU_RADIO_GROUP_NAME = 'OkuDropdownMenuRadioGroup'
export const DROPDOWN_MENU_RADIO_ITEM_NAME = 'OkuDropdownMenuRadioItem'
export const DROPDOWN_MENU_ITEM_INDICATOR_NAME = 'OkuDropdownMenuItemIndicator'
export const DROPDOWN_MENU_SEPARATOR_NAME = 'OkuDropdownMenuSeparator'
export const DROPDOWN_MENU_ARROW_NAME = 'OkuDropdownMenuArrow'
export const DROPDOWN_MENU_SUB_NAME = 'OkuDropdownMenuSub'
export const DROPDOWN_MENU_SUB_TRIGGER_NAME = 'OkuDropdownMenuSubTrigger'
export const DROPDOWN_MENU_SUB_CONTENT_NAME = 'OkuDropdownMenuSubContent'

/* -------------------------------------------------------------------------------------------------
 * DropdownMenu - dropdown-menu.ts
 * ----------------------------------------------------------------------------------------------- */

export const [createDropdownMenuProvide, createDropdownMenuScop] = createProvideScope(DROPDOWN_MENU_NAME, [
  createMenuScope,
])

export const useMenuScope = createMenuScope()

export type DropdownMenuInjectValue = {
  triggerId: Ref<string>
  triggerRef: Ref<HTMLButtonElement | null>
  contentId: Ref<string>
  open: Ref<boolean>
  onOpenChange(open: boolean): void
  onOpenToggle(): void
  modal: Ref<boolean>

}

export const [dropdownMenuProvider, useDropdownMenuInject]
  = createDropdownMenuProvide<DropdownMenuInjectValue>(DROPDOWN_MENU_NAME)

export interface DropdownMenuProps {
  dir?: Direction
  open?: boolean
  defaultOpen?: boolean
  modelValue?: boolean
  modal: boolean
}

export type DropdownMenuEmits = {
  openChange: [open: boolean]
  'update:modelValue': [open: boolean]
}

export const dropdownMenuProps = {
  props: {
    dir: {
      type: String as PropType<DropdownMenuProps['dir']>,
    },
    open: {
      type: Boolean as PropType<DropdownMenuProps['open']>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<DropdownMenuProps['defaultOpen']>,
      default: undefined,
    },
    modelValue: {
      type: Boolean as PropType<DropdownMenuProps['modelValue']>,
      default: undefined,
    },
    modal: {
      type: Boolean as PropType<DropdownMenuProps['modal']>,
      default: true,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: DropdownMenuEmits['openChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: DropdownMenuEmits['update:modelValue'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuTrigger - dropdown-menu-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuTriggerNativeElement = OkuElement<'button'>
export type DropdownMenuTriggerElement = HTMLButtonElement

export interface DropdownMenuTriggerProps extends PrimitiveProps {
  disabled: boolean
}

export type DropdownMenuTriggerEmits = {
  pointerdown: [event: PointerEvent]
  keydown: [event: KeyboardEvent]
}

export const dropdownMenuTriggerProps = {
  props: {
    disabled: {
      type: Boolean as PropType<DropdownMenuTriggerProps['disabled']>,
      default: false,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    pointerdown: (event: DropdownMenuTriggerEmits['pointerdown'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: DropdownMenuTriggerEmits['keydown'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuPortal - dropdown-menu-portal.ts
 * ----------------------------------------------------------------------------------------------- */

export interface DropdownMenuPortalProps extends MenuPortalProps { }

export const dropdownMenuPortalProps = {
  props: {
    ...menuPortalProps.props,
  },
  emits: {
    ...menuPortalProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuContent - dropdown-menu-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuContentNativeElement = MenuContentNativeElement
export type DropdownMenuContentElement = MenuContentElement

export interface DropdownMenuContentProps extends MenuContentProps { }

export type DropdownMenuContentEmits = {
  closeAutoFocus: [event: FocusScopeEmits['unmountAutoFocus'][0]]
  interactOutside: [event: DismissableLayerEmits['interactOutside'][0]]
}

export const dropdownMenuContentProps = {
  props: {
    ...menuContentProps.props,
  },
  emits: {
    ...propsOmit(menuContentProps.emits, ['entryFocus']),
    // eslint-disable-next-line unused-imports/no-unused-vars
    closeAutoFocus: (event: DropdownMenuContentEmits['closeAutoFocus'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    interactOutside: (event: DropdownMenuContentEmits['interactOutside'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuGroup - dropdown-menu-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuGroupNativeElement = MenuGroupNativeElement
export type DropdownMenuGroupElement = MenuGroupElement

export interface DropdownMenuGroupProps extends MenuGroupProps { }

export const dropdownMenuGroupProps = {
  props: {
    ...menuGroupProps.props,
  },
  emits: {
    ...menuGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuLabel - dropdown-menu-label.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuLabelNativeElement = MenuLabelNativeElement
export type DropdownMenuLabelElement = MenuLabelElement

export interface DropdownMenuLabelProps extends MenuLabelProps { }

export const dropdownMenuLabelProps = {
  props: {
    ...menuLabelProps.props,
  },
  emits: {
    ...menuLabelProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItem - dropdown-menu-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuItemNativeElement = MenuItemNativeElement
export type DropdownMenuItemElement = MenuItemElement

export interface DropdownMenuItemProps extends MenuItemProps { }

export interface DropdownMenuItemEmits extends MenuItemEmits { }

export const dropdownMenuItemProps = {
  props: {
    ...menuItemProps.props,
  },
  emits: {
    ...menuItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuCheckboxItem - dropdown-menu-Checkbox-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuCheckboxItemNativeElement = MenuCheckboxItemNativeElement
export type DropdownMenuCheckboxItemElement = MenuCheckboxItemElement

export interface DropdownMenuCheckboxItemProps extends MenuCheckboxItemProps { }

export interface DropdownMenuCheckboxItemEmits extends MenuCheckboxItemEmits { }

export const dropdownMenuCheckboxItemProps = {
  props: {
    ...menuCheckboxItemProps.props,
  },
  emits: {
    ...menuCheckboxItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioGroup - dropdown-menu-radio-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuRadioGroupNativeElement = MenuRadioGroupNativeElement
export type DropdownMenuRadioGroupElement = MenuRadioGroupElement

export interface DropdownMenuRadioGroupProps extends MenuRadioGroupProps { }

export const dropdownMenuRadioGroupProps = {
  props: {
    ...menuRadioGroupProps.props,
  },
  emits: {
    ...menuRadioGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuRadioItem - dropdown-menu-radio-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuRadioItemNativeElement = MenuRadioItemNativeElement
export type DropdownMenuRadioItemElement = MenuRadioItemElement

export interface DropdownMenuRadioItemProps extends MenuRadioItemProps { }

export interface DropdownMenuRadioItemEmits extends MenuRadioItemEmits { }

export const dropdownMenuRadioItemProps = {
  props: {
    ...menuRadioItemProps.props,
  },
  emits: {
    ...menuRadioItemProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuItemIndicator - dropdown-menu--item-indicator.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuItemIndicatorNativeElement = MenuItemIndicatorNativeElement
export type DropdownMenuItemIndicatorElement = MenuItemIndicatorElement

export interface DropdownMenuItemIndicatorProps extends MenuItemIndicatorProps { }

export const dropdownMenuItemIndicatorProps = {
  props: {
    ...menuItemIndicatorProps.props,
  },
  emits: {
    ...menuItemIndicatorProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSeparator - dropdown-menu-separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuSeparatorNativeElement = MenuSeparatorNativeElement
export type DropdownMenuSeparatorElement = MenuSeparatorElement

export interface DropdownMenuSeparatorProps extends MenuSeparatorProps { }

export const dropdownMenuSeparatorProps = {
  props: {
    ...menuSeparatorProps.props,
  },
  emits: {
    ...menuSeparatorProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuArrow - dropdown-menu-arrow.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuArrowNativeElement = MenuArrowNativeElement
export type DropdownMenuArrowElement = MenuArrowElement

export interface DropdownMenuArrowProps extends MenuArrowProps { }

export const dropdownMenuArrowProps = {
  props: {
    ...menuArrowProps.props,
  },
  emits: {
    ...menuArrowProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSub - dropdown-menu-sub.ts
 * ----------------------------------------------------------------------------------------------- */

export interface DropdownMenuSubProps {
  open?: boolean
  defaultOpen?: boolean
  modelValue?: boolean
}

export type DropdownMenuSubEmits = {
  openChange: [open: boolean]
  'update:modelValue': [open: boolean]
}

export const dropdownMenuSubProps = {
  props: {
    open: {
      type: Boolean as PropType<DropdownMenuSubProps['open']>,
      default: undefined,
    },
    defaultOpen: {
      type: Boolean as PropType<DropdownMenuSubProps['defaultOpen']>,
      default: undefined,
    },
    modelValue: {
      type: Boolean as PropType<DropdownMenuSubProps['modelValue']>,
      default: undefined,
    },
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: DropdownMenuSubEmits['openChange'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: DropdownMenuSubEmits['update:modelValue'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubTrigger - dropdown-menu-sub-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuSubTriggerNativeElement = MenuSubTriggerNativeElement
export type DropdownMenuSubTriggerElement = MenuSubTriggerElement

export interface DropdownMenuSubTriggerProps extends MenuSubTriggerProps { }

export interface DropdownMenuSubTriggerEmits extends MenuSubTriggerEmits { }

export const dropdownMenuSubTriggerProps = {
  props: {
    ...menuSubTriggerProps.props,
  },
  emits: {
    ...menuSubTriggerProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * DropdownMenuSubContent - dropdown-menu-sub-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type DropdownMenuSubContentNativeElement = MenuSubContentNativeElement
export type DropdownMenuSubContentElement = MenuSubContentElement

export interface DropdownMenuSubContentProps extends MenuSubContentProps { }

export interface DropdownMenuSubContentEmits extends MenuSubContentEmits { }

export const dropdownMenuSubContentProps = {
  props: {
    ...menuSubContentProps.props,
  },
  emits: {
    ...menuSubContentProps.emits,
  },
}
