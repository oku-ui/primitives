import type { MaybeRefOrGetter, Ref } from 'vue'
import type { RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import type { PrimitiveDefaultProps } from '../shared/typeUtils.ts'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2, useId } from '../hooks/index.ts'
import { type EmitsToHookProps, mergePrimitiveAttrs, type RadixPrimitiveReturns } from '../shared/index.ts'

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

export const TabsRootDefaltProps = {} satisfies PrimitiveDefaultProps<TabsRootProps>

export type TabsRootEmits = {
  /** A function called when a new tab is selected */
  'update:value': [value: string]
}

export interface TabsContext {
  baseId: string
  value: Ref<string | undefined>
  onValueChange: (value: string) => void
  orientation: Exclude<TabsRootProps['orientation'], undefined>
  dir: Ref<Direction>
  activationMode: Exclude<TabsRootProps['activationMode'], undefined>
}

export const [provideTabsContext, useTabsContext] = createContext<TabsContext>('Tabs')

export interface UseTabsRootProps extends EmitsToHookProps<TabsRootEmits> {
  value?: () => string | undefined
  defaultValue?: string
  orientation?: TabsRootProps['orientation']
  dir?: MaybeRefOrGetter<Direction | undefined>
  activationMode?: TabsRootProps['activationMode']
}

export function useTabsRoot(props: UseTabsRootProps): RadixPrimitiveReturns {
  const { orientation = 'horizontal' } = props
  const direction = useDirection(props.dir)

  const value = useControllableStateV2(props.value, props.onUpdateValue, props.defaultValue)

  provideTabsContext({
    baseId: useId(),
    value,
    onValueChange(newValue) {
      value.value = newValue
    },
    orientation,
    dir: direction,
    activationMode: props.activationMode || 'automatic',
  })

  return {
    attrs(extraAttrs) {
      const attrs = {
        'dir': direction.value,
        'data-orientation': orientation,
      }

      if (extraAttrs && extraAttrs.length > 0) {
        mergePrimitiveAttrs(attrs, extraAttrs)
      }

      return attrs
    },
  }
}
