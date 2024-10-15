import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { type MutableRefObject, useRef } from '../hooks/index.ts'
import { type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from '../roving-focus/index.ts'
import { mergePrimitiveAttrs } from '../shared/index.ts'
import { useTabsContext } from './TabsRoot.ts'

export interface TabsListProps {
  loop?: RovingFocusGroupRootProps['loop']
}

export const DEFAULT_TABS_LIST_PROPS = {
  loop: undefined,
} satisfies PrimitiveDefaultProps<TabsListProps>

export interface UseTabsListProps {
  elRef?: MutableRefObject<HTMLElement | undefined>
  loop?: RovingFocusGroupRootProps['loop']
}

export function useTabsList(props: UseTabsListProps): RadixPrimitiveReturns {
  const elRef = props.elRef || useRef<HTMLElement>()
  const setTemplateEl = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const context = useTabsContext('TabsList')

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    elRef,
    currentTabStopId: undefined,
    orientation: context.orientation,
    loop: props.loop ?? true,
    dir: context.dir,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        'elRef': setTemplateEl,
        'role': 'tablist',
        'aria-orientation': context.orientation,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupRoot.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
