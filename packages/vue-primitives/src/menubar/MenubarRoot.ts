import type { EmitsToHookProps, RadixPrimitiveReturns } from '../shared/index.ts'
import { type MaybeRefOrGetter, type Ref, shallowRef } from 'vue'
import { createCollection } from '../collection/index.ts'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, useControllableStateV2, useRef } from '../hooks/index.ts'
import { type RovingFocusGroupRootProps, useRovingFocusGroupRoot } from '../roving-focus/index.ts'

export interface MenubarRootProps {
  value?: string
  defaultValue?: string
  loop?: RovingFocusGroupRootProps['loop']
  dir?: RovingFocusGroupRootProps['dir']
}

export type MenubarRootEmits = {
  'update:value': [value: string]
}

export interface MenubarContextValue {
  value: Ref<string | undefined>
  dir: Ref<Direction>
  loop: boolean
  onMenuOpen: (value: string) => void
  onMenuClose: () => void
  onMenuToggle: (value: string) => void
}

export const [provideMenubarContext, useMenubarContext] = createContext<MenubarContextValue>('Menubar')

export interface ItemData {
  $menubar: {
    value: string
    disabled: boolean
  }
}

export const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('Menubar')

export interface UseMenubarRootProps extends EmitsToHookProps<MenubarRootEmits> {
  value?: () => string | undefined
  defaultValue?: string
  loop?: boolean
  dir?: MaybeRefOrGetter<Direction | undefined>
}

export function useMenuvarRoot(props: UseMenubarRootProps = {}): RadixPrimitiveReturns {
  const { loop = true } = props

  const direction = useDirection(props.dir)
  const value = useControllableStateV2(props.value, props.onUpdateValue, props.defaultValue ?? '')

  // We need to manage tab stop id manually as `RovingFocusGroup` updates the stop
  // based on focus, and in some situations our triggers won't ever be given focus
  // (e.g. click to open and then outside to close)
  const currentTabStopId = shallowRef<string>()

  provideMenubarContext({
    value,
    onMenuOpen(id) {
      value.value = id
      currentTabStopId.value = id
    },
    onMenuClose() {
      value.value = ''
    },
    onMenuToggle(id) {
      value.value = (value.value ? '' : id)
      // `openMenuOpen` and `onMenuToggle` are called exclusively so we
      // need to update the id in either case
      currentTabStopId.value = id
    },
    dir: direction,
    loop,
  })

  const elRef = useRef<HTMLElement>()
  Collection.provideCollectionContext(elRef)

  function setTemplateEl(el: HTMLElement | undefined) {
    elRef.value = el
  }

  const rovingFocusGroupRoot = useRovingFocusGroupRoot({
    elRef,
    orientation: 'horizontal',
    loop,
    dir: direction,
    currentTabStopId() {
      return currentTabStopId.value
    },
    onUpdateCurrentTabStopId(tabStopId) {
      currentTabStopId.value = tabStopId
    },
  })

  const rovingFocusGroupRootAttrs = {
    elRef: setTemplateEl,
    role: 'menubar',
  }

  return {
    attrs(extraAttrs = []) {
      return rovingFocusGroupRoot.attrs([rovingFocusGroupRootAttrs, ...extraAttrs])
    },
  }
}
