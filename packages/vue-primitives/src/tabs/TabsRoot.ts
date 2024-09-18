import type { Ref } from 'vue'
import type { RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import { createContext } from '../hooks/index.ts'

export interface TabsRootProps {
  /** The value for the selected tab, if controlled */
  value?: string
  /** The value of the tab to select by default, if uncontrolled */
  defaultValue?: string
  /**
   * The orientation the tabs are layed out.
   * Mainly so arrow navigation is done accordingly (left & right vs. up & down)
   * @defaultValue horizontal
   */
  orientation?: RovingFocusGroupRootProps['orientation']
  /**
   * The direction of navigation between toolbar items.
   */
  dir?: RovingFocusGroupRootProps['dir']
  /**
   * Whether a tab is activated automatically or manually.
   * @defaultValue automatic
   */
  activationMode?: 'automatic' | 'manual'
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TabsRootEmits = {
  /** A function called when a new tab is selected */
  'update:value': [value: string]
}

export interface TabsContext {
  baseId: string
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
  orientation: Required<TabsRootProps['orientation']>
  dir: Ref<Exclude<TabsRootProps['dir'], undefined>>
  activationMode: Required<TabsRootProps['activationMode']>
}

export const [provideTabsContext, useTabsContext] = createContext<TabsContext>('Tabs')
