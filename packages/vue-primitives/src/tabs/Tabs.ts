import type { Ref } from 'vue'
import { createContext } from '~/hooks/createContext.ts'
import type { PrimitiveProps } from '~/primitive/index.ts'
import type { RovingFocusGroupProps } from '~/roving-focus'

export interface TabsProps extends PrimitiveProps {
  /** The value for the selected tab, if controlled */
  value?: string
  /** The value of the tab to select by default, if uncontrolled */
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
  activationMode?: 'automatic' | 'manual'
}

// eslint-disable-next-line ts/consistent-type-definitions
export type TabsEmits = {
  /** A function called when a new tab is selected */
  'update:value': [value: string]
}

export interface TabsContext {
  baseId: string
  value: Ref<string>
  onValueChange: (value: string) => void
  orientation: TabsProps['orientation']
  dir: Ref<TabsProps['dir']>
  activationMode: TabsProps['activationMode']
}

export const [provideTabsContext, useTabsContext] = createContext<TabsContext>('Tabs')
