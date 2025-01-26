import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { shallowRef } from 'vue'
import { createContext } from '../hooks/index.ts'
import { useMenuRoot } from '../menu/MenuRoot.ts'

export interface ContextMenuRootProps {
  dir?: Direction
  modal?: boolean
}

export const DEFAULT_CONTEXT_MENU_ROOT_PROPS = {
  modal: undefined,
} satisfies PrimitiveDefaultProps<ContextMenuRootProps>

export type ContextMenuRootEmits = {
  'update:open': [open: boolean]
}

export interface ContextMenuContextValue {
  open: Ref<boolean>
  onOpenChange: (open: boolean) => void
  modal: boolean
}

export const [provideContextMenuContext, useContextMenuContext] = createContext<ContextMenuContextValue>('ContextMenu')

export interface UseContextMenuRootProps extends EmitsToHookProps<ContextMenuRootEmits> {
  dir?: MaybeRefOrGetter<Direction | undefined>
  modal?: boolean
}

export function useContextMenuRoot(props: UseContextMenuRootProps) {
  const { modal = true } = props
  const open = shallowRef(false)

  function onOpenChange(v: boolean) {
    open.value = v
    props.onUpdateOpen?.(v)
  }

  provideContextMenuContext({
    open,
    onOpenChange,
    modal,
  })

  useMenuRoot({
    open() {
      return open.value
    },
    onUpdateOpen(v) {
      open.value = v
    },
    dir: props.dir,
    modal,
  })
}
