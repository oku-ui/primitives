import { type MutableRefObject, createContext } from '@oku-ui/hooks'

export interface MenuSubProps {
  open?: boolean
}

export type MenuSubEmits = {
  'update:open': [open: boolean]
}

export interface MenuSubContext {
  contentId: string
  triggerId: string
  trigger: MutableRefObject<HTMLDivElement | undefined>
  onTriggerChange: (trigger: HTMLDivElement | undefined) => void
}

export const [provideMenuSubContext, useMenuSubContext] = createContext<MenuSubContext>('MenuSub')
