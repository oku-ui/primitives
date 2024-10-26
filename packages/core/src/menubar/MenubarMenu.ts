import { computed, useId, watch } from 'vue'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'
import { useMenuRoot } from '../menu/MenuRoot.ts'
import { useMenubarContext } from './MenubarRoot.ts'

export interface MenubarMenuProps {
  value?: string
}

export interface MenubarMenuContextValue {
  value: string
  triggerId: string
  triggerRef: MutableRefObject<HTMLElement | undefined>
  contentId: string
  wasKeyboardTriggerOpenRef: MutableRefObject<boolean>
}

export const [provideMenubarMenuContext, useMenubarMenuContext] = createContext<MenubarMenuContextValue>('MenubarMenu')

export interface UseMenubarMenuProps {
  value?: string
}

export function useMenubarMenu(props: UseMenubarMenuProps) {
  const value = props.value || useId()
  const context = useMenubarContext('MenubarMenu')
  const triggerRef = useRef<HTMLElement>()
  const wasKeyboardTriggerOpenRef = useRef(false)
  const open = computed(() => context.value.value === value)

  watch(open, (v) => {
    if (!v)
      wasKeyboardTriggerOpenRef.value = false
  })

  provideMenubarMenuContext({
    value,
    triggerId: useId(),
    triggerRef,
    contentId: useId(),
    wasKeyboardTriggerOpenRef,
  })

  useMenuRoot({
    open() {
      return open.value
    },
    onUpdateOpen(v) {
      // Menu only calls `onOpenChange` when dismissing so we
      // want to close our MenuBar based on the same events.
      if (!v)
        context.onMenuClose()
    },
    dir() {
      return context.dir.value
    },
    modal: false,
  })
}
