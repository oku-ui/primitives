import type { PropType, Ref } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'
import { createRovingFocusGroupScope } from '@oku-ui/roving-focus'
import type { RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { separatorProps } from '@oku-ui/separator'
import type { SeparatorElement, SeparatorNativeElement, SeparatorProps } from '@oku-ui/separator'
import { createToggleGroupScope, toggleGroupItemProps, toggleGroupProps } from '@oku-ui/toggle-group'
import type { ToggleGroupElement, ToggleGroupItemElement, ToggleGroupItemEmits, ToggleGroupItemNativeElement, ToggleGroupItemProps, ToggleGroupMultipleProps, ToggleGroupNativeElement, ToggleGroupSingleProps } from '@oku-ui/toggle-group'

export type ScopeToolbar<T> = T & { scopeOkuToolbar?: Scope }

export const scopeToolbarProps = {
  scopeOkuToolbar: {
    ...ScopePropObject,
  },
}

export const TOOLBAR_NAME = 'OkuToolbar'
export const TOOLBAR_SEPARATOR_NAME = 'OkuToolbarSeparator'
export const TOOLBAR_BUTTON_NAME = 'OkuToolbarButton'
export const TOOLBAR_LINK_NAME = 'OkuToolbarLink'
export const TOOLBAR_TOGGLE_GROUP_NAME = 'OkuToolbarToggleGroup'
export const TOOLBAR_TOGGLE_ITEM_NAME = 'OkuToolbarToggleItem'

/* -------------------------------------------------------------------------------------------------
 * Toolbar - toolbar.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarNativeElement = OkuElement<'div'>
export type ToolbarElement = HTMLDivElement

export const [createToolbarProvider, createToolbarScope] = createProvideScope(TOOLBAR_NAME, [
  createRovingFocusGroupScope,
  createToggleGroupScope,
])

export const useRovingFocusGroupScope = createRovingFocusGroupScope()
export const useToggleGroupScope = createToggleGroupScope()

type ToolbarProvideValue = {
  orientation: Ref<RovingFocusGroupProps['orientation']>
  dir: Ref<RovingFocusGroupProps['dir']>
}

export const [toolbarProvider, useToolbarInject]
  = createToolbarProvider<ToolbarProvideValue>(TOOLBAR_NAME)

export interface ToolbarProps extends PrimitiveProps {
  orientation?: RovingFocusGroupProps['orientation']
  loop?: RovingFocusGroupProps['loop']
  dir?: RovingFocusGroupProps['dir']
}

export const toolbarProps = {
  props: {
    orientation: {
      type: String as PropType<RovingFocusGroupProps['orientation']>,
      default: 'horizontal',
    },
    loop: {
      type: Boolean as PropType<RovingFocusGroupProps['loop']>,
      default: true,
    },
    dir: {
      type: String as PropType<RovingFocusGroupProps['dir']>,
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToolbarSeparator - toolbar-separator.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarSeparatorNativeElement = SeparatorNativeElement
export type ToolbarSeparatorElement = SeparatorElement

export interface ToolbarSeparatorProps extends SeparatorProps { }

export const toolbarSeparatorProps = {
  props: {
    ...separatorProps.props,
  },
  emits: {
    ...separatorProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToolbarButton - toolbar-button.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarButtonNativeElement = OkuElement<'button'>
export type ToolbarButtonElement = HTMLButtonElement

export interface ToolbarButtonProps extends PrimitiveProps { }

export const toolbarButtonProps = {
  props: {
    disabled: {
      type: Boolean,
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * ToolbarLink - toolbar-link.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarLinkNativeElement = OkuElement<'a'>
export type ToolbarLinkElement = HTMLAnchorElement

export interface ToolbarLinkProps extends PrimitiveProps { }

export type ToolbarLinkEmits = {
  keydown: [event: KeyboardEvent]
}

export const toolbarLinkProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    keydown: (event: ToolbarLinkEmits['keydown'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToolbarToggleGroup - toolbar-toggle-group.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarToggleGroupNativeElement = ToggleGroupNativeElement
export type ToolbarToggleGroupElement = ToggleGroupElement

export interface ToolbarToggleGroupSingleProps extends Extract<ToggleGroupSingleProps, { type: 'single' }> { }
export interface ToolbarToggleGroupMultipleProps extends Extract<ToggleGroupMultipleProps, { type: 'multiple' }> { }

export const toolbarToggleGroupProps = {
  props: {
    ...toggleGroupProps.props,
  },
  emits: {
    ...toggleGroupProps.emits,
  },
}

/* -------------------------------------------------------------------------------------------------
 * ToolbarToggleItem - toolbar-toggle-item.ts
 * ----------------------------------------------------------------------------------------------- */

export type ToolbarToggleItemNativeElement = ToggleGroupItemNativeElement
export type ToolbarToggleItemElement = ToggleGroupItemElement

export interface ToolbarToggleItemProps extends ToggleGroupItemProps { }
export interface ToolbarToggleItemEmits extends ToggleGroupItemEmits { }

export const toolbarToggleItemProps = {
  props: {
    ...toggleGroupItemProps.props,
  },
  emits: {
    ...toggleGroupItemProps.emits,
  },
}
