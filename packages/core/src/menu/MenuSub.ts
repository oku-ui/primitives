import type { MutableRefObject } from '../hooks/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { onWatcherCleanup, useId, watchEffect } from 'vue'
import { createContext, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/index.ts'
import { provideMenuContext, useMenuContext } from './MenuRoot.ts'

export interface MenuSubProps {
  open?: boolean
}

export const DEFAULT_MENU_SUB_PROPS = {
  open: false,
} satisfies PrimitiveDefaultProps<MenuSubProps, 'open'>

export type MenuSubEmits = {
  'update:open': [open: boolean]
}

export interface MenuSubContext {
  contentId: string
  triggerId: string
  trigger: MutableRefObject<HTMLElement | undefined>
  onTriggerChange: (trigger: HTMLElement | undefined) => void
}

export const [provideMenuSubContext, useMenuSubContext] = createContext<MenuSubContext>('MenuSub')

export interface UseMenuSubProps extends Required<EmitsToHookProps<MenuSubEmits>> {
  open: () => boolean
}

export function useMenuSub(props: UseMenuSubProps) {
  const parentMenuContext = useMenuContext('MenuSub')
  const trigger = useRef<HTMLElement>()

  // Prevent the parent menu from reopening with open submenus.
  watchEffect(() => {
    if (parentMenuContext.open() === false)
      props.onUpdateOpen(false)

    onWatcherCleanup(() => {
      props.onUpdateOpen(false)
    })
  })

  provideMenuContext({
    open: props.open,
    onOpenChange: props.onUpdateOpen,
  })

  provideMenuSubContext({
    contentId: useId(),
    triggerId: useId(),
    trigger,
    onTriggerChange(el) {
      trigger.value = el
    },
  })

  usePooperRoot()
}
