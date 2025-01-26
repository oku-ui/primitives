import type { MutableRefObject } from '../hooks/index.ts'
import type { RovingFocusGroupRootProps } from '../roving-focus/index.ts'
import type { PrimitiveDefaultProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { useRef } from '../hooks/index.ts'
import { useRovingFocusGroupRoot } from '../roving-focus/index.ts'
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
  const {
    loop = true,
  } = props

  const elRef = props.elRef || useRef<HTMLElement>()
  const setElRef = props.elRef ? undefined : (value: HTMLElement | undefined) => elRef.value = value

  const context = useTabsContext('TabsList')

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    elRef,
    currentTabStopId: undefined,
    orientation: context.orientation,
    loop,
    dir: context.dir,
  })

  return {
    attrs(extraAttrs = []) {
      const attrs = {
        'elRef': setElRef,
        'role': 'tablist',
        'aria-orientation': context.orientation,
      }

      mergePrimitiveAttrs(attrs, [rovingFocusGroupRoot.attrs(), ...extraAttrs])

      return attrs
    },
  }
}
