import type { Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { RovingFocusGroupRootProps } from '../roving-focus/RovingFocusGroupRoot.ts'
import { createCollection } from '../collection/index.ts'
import { createContext } from '../hooks/index.ts'

export interface MenubarRootProps {
  value?: string
  defaultValue?: string
  loop?: RovingFocusGroupRootProps['loop']
  dir?: RovingFocusGroupRootProps['dir']
}

// eslint-disable-next-line ts/consistent-type-definitions
export type MenubarRootEmits = {
  'update:value': [value: string]
}

export interface MenubarContextValue {
  value: Ref<string | undefined>
  dir: Ref<Direction>
  loop: () => boolean
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

export const [Collection, useCollection] = createCollection<HTMLButtonElement, ItemData>('Menubar')
