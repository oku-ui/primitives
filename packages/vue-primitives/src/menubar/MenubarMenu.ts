import { type MutableRefObject, createContext } from '@oku-ui/hooks'

export interface MenubarMenuProps {
  value?: string
}

export interface MenubarMenuContextValue {
  value: string
  triggerId: string
  triggerRef: MutableRefObject<HTMLButtonElement | undefined>
  contentId: string
  wasKeyboardTriggerOpenRef: MutableRefObject<boolean>
}

export const [provideMenubarMenuContext, useMenubarMenuContext] = createContext<MenubarMenuContextValue>('MenubarMenu')
