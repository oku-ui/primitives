import type { PropType, Ref } from 'vue'
import { ScopePropObject, createProvideScope } from '@oku-ui/provide'
import type { Scope } from '@oku-ui/provide'
import { primitiveProps, propsOmit } from '@oku-ui/primitive'
import type { OkuElement, PrimitiveProps } from '@oku-ui/primitive'

export type ScopeCollapsible<T> = T & { scopeOkuCollapsible?: Scope }

export const scopeCollapsibleProps = {
  scopeOkuCollapsible: {
    ...ScopePropObject,
  },
}

export const COLLAPSIBLE_NAME = 'OkuCollapsible'
export const COLLAPSIBLE_TRIGGER_NAME = 'OkuCollapsibleTrigger'
export const COLLAPSIBLE_CONTENT_NAME = 'OkuCollapsibleContent'
export const COLLAPSIBLE_CONTENT_IMPL_NAME = 'OkuCollapsibleContentImpl'

/* -------------------------------------------------------------------------------------------------
 * Collapsible - collapsible.ts
 * ----------------------------------------------------------------------------------------------- */

export type CollapsibleNativeElement = OkuElement<'div'>
export type CollapsibleElement = HTMLDivElement

export const [createCollapsibleProvide, createCollapsibleScope] = createProvideScope(COLLAPSIBLE_NAME)

export type CollapsibleProvideValue = {
  contentId: Ref<string>
  disabled?: Ref<boolean | undefined>
  open: Ref<boolean>
  onOpenToggle(): void
}

export const [collapsibleProvider, useCollapsibleInject]
  = createCollapsibleProvide<CollapsibleProvideValue>(COLLAPSIBLE_NAME)

export interface CollapsibleProps extends PrimitiveProps {
  defaultOpen?: boolean
  open?: boolean
  disabled?: boolean
  modelValue?: boolean
}

export type CollapsibleEmits = {
  'update:modelValue': [open: boolean]
  'openChange': [open: boolean]
}

export const collapsibleProps = {
  props: {
    defaultOpen: {
      type: Boolean as PropType<CollapsibleProps['defaultOpen']>,
      default: undefined,
    },
    open: {
      type: Boolean as PropType<CollapsibleProps['modelValue']>,
      default: undefined,
    },
    disabled: {
      type: Boolean as PropType<CollapsibleProps['disabled']>,
    },
    modelValue: {
      type: Boolean as PropType<CollapsibleProps['modelValue']>,
      default: undefined,
    },
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    'update:modelValue': (open: CollapsibleEmits['update:modelValue'][0]) => true,
    // eslint-disable-next-line unused-imports/no-unused-vars
    'openChange': (open: CollapsibleEmits['openChange'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * CollapsibleTrigger - collapsible-trigger.ts
 * ----------------------------------------------------------------------------------------------- */

export type CollapsibleTriggerNativeElement = OkuElement<'button'>
export type CollapsibleTriggerElement = HTMLButtonElement

export interface CollapsibleTriggerProps extends PrimitiveProps { }

export interface CollapsibleTriggerEmits {
  click: [event: MouseEvent]
}

export const collapsibleTriggerProps = {
  props: {
    ...primitiveProps,
  },
  emits: {
    // eslint-disable-next-line unused-imports/no-unused-vars
    click: (event: CollapsibleTriggerEmits['click'][0]) => true,
  },
}

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContentImpl - collapsible-content-impl.ts
 * ----------------------------------------------------------------------------------------------- */

export type CollapsibleContentImplNativeElement = OkuElement<'div'>
export type CollapsibleContentImplElement = HTMLDivElement

export interface CollapsibleContentImplProps extends PrimitiveProps {
  present: boolean
}

export const collapsibleContentImplProps = {
  props: {
    present: {
      type: Boolean as PropType<CollapsibleContentImplProps['present']>,
    },
    ...primitiveProps,
  },
  emits: { },
}

/* -------------------------------------------------------------------------------------------------
 * CollapsibleContent - collapsible-content.ts
 * ----------------------------------------------------------------------------------------------- */

export type CollapsibleContentNativeElement = CollapsibleContentImplNativeElement
export type CollapsibleContentElement = CollapsibleContentImplElement

export interface CollapsibleContentProps extends Omit<CollapsibleContentImplProps, 'present'> {
  /**
   * Used to force mounting when more control is needed. Useful when
   * controlling animation with React animation libraries.
   */
  forceMount?: true
}

export const collapsibleContentProps = {
  props: {
    forceMount: {
      type: Boolean as PropType<CollapsibleContentProps['forceMount']>,
      default: undefined,
    },
    ...propsOmit(collapsibleContentImplProps.props, ['present']),
  },
  emits: { },
}
