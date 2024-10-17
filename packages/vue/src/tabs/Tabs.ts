import type { PrimitiveProps } from '@oku-ui/primitive'
import type { Ref } from 'vue'
import type { ActivationMode, TabsScopeProps } from './types'
import { createScope } from '@oku-ui/provide'
import { createRovingFocusGroupScope, type RovingFocusGroupProps } from '@oku-ui/roving-focus'
import { TAB_NAME } from './constants'

// Props

export interface TabsProps extends PrimitiveProps, TabsScopeProps {
  /**
   * The value for the selected tab, if controlled
   */
  value?: string

  /**
   * The value of the tab to select by default, if uncontrolled
   */
  defaultValue?: string

  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: RovingFocusGroupProps['orientation']

  /**
   * The direction of navigation between toolbar items.
   */
  dir?: RovingFocusGroupProps['dir']

  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   */
  activationMode?: ActivationMode
}

// Emits

export type TabsEmits = {
  /** Event handler called when the value changes */
  'update:value': [payload: string]
}

// Context

export interface TabsContext {
  baseId: string
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
  orientation: Ref<TabsProps['orientation']>
  dir: Ref<TabsProps['dir']>
  activationMode: Ref<TabsProps['activationMode']>
}

const [createTabsProvider, createTabsScope] = createScope(TAB_NAME, [
  createRovingFocusGroupScope,
])

export { createTabsScope }

export const [tabsProvider, useTabsContext] = createTabsProvider<TabsContext>(TAB_NAME)

export const useRovingFocusGroupScope = createRovingFocusGroupScope()
