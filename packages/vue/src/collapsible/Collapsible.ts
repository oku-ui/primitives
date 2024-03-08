import type { Scope } from '@oku-ui/provide'
import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import { createScope } from '@oku-ui/provide'
import { COLLAPSIBLE_NAME } from './constants'

// Props

export interface CollapsibleProps extends PrimitiveProps {
  /**
   * The open state of the collapsible when it is initially rendered. <br> Use when you do not need to control its open state.
   */
  defaultOpen?: boolean

  /**
   * The controlled open state of the collapsible. Can be binded with `v-model`.
   */
  open?: boolean

  /**
   * When `true`, prevents the user from interacting with the collapsible.
   */
  disabled?: boolean

  scopeOkuCollapsible?: Scope
}

// Emits

export type CollapsibleEmits = {
  'update:open': [open: boolean]
}

// Context

export type CollapsibleProvideValue = {
  contentId: string
  disabled?: Ref<boolean | undefined>
  open: Ref<boolean>
  onOpenToggle: () => void
}

export const [createCollapsibleProvide, createCollapsibleScope] = createScope(COLLAPSIBLE_NAME)

export const [collapsibleProvider, useCollapsibleInject] = createCollapsibleProvide<CollapsibleProvideValue>(COLLAPSIBLE_NAME)
