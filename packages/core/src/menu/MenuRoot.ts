import type { MaybeRefOrGetter, Ref } from 'vue'
import type { Direction } from '../direction/index.ts'
import type { MutableRefObject } from '../hooks/index.ts'
import type { EmitsToHookProps, PrimitiveDefaultProps } from '../shared/index.ts'
import { onBeforeUnmount, onMounted } from 'vue'
import { createCollection } from '../collection/index.ts'
import { useDirection } from '../direction/index.ts'
import { createContext, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/index.ts'

export interface MenuRootProps {
  open?: boolean
  dir?: Direction
  modal?: boolean
}

export const DEFAULT_MENU_ROOT_PROPS = {
  open: false,
  modal: undefined,
} satisfies PrimitiveDefaultProps<MenuRootProps, 'open'>

export type MenuRootEmits = {
  'update:open': [open: boolean]
}

export interface MenuContext {
  open: () => boolean
  onOpenChange: (open: boolean) => void
  // content: Ref<HTMLDivElement | undefined>
  // onContentChange: (content: HTMLDivElement | undefined) => void
}

export const [provideMenuContext, useMenuContext] = createContext<MenuContext>('Menu')

export interface MenuRootContext {
  onClose: () => void
  isUsingKeyboardRef: MutableRefObject<boolean>
  dir: Ref<Direction>
  modal: boolean
}

export const [provideMenuRootContext, useMenuRootContext] = createContext<MenuRootContext>('MenuRoot')

export interface ItemData { menu: { disabled?: boolean, textValue: string } }
export const [Collection, useCollection] = createCollection<HTMLElement, ItemData>('Menu')

export interface UseMenuRootProps extends EmitsToHookProps<MenuRootEmits> {
  open?: () => boolean
  dir?: MaybeRefOrGetter<Direction | undefined>
  modal?: boolean
}

export function useMenuRoot(props: UseMenuRootProps = {}) {
  const { open = () => false, modal = true } = props
  const isUsingKeyboardRef = useIsUsingKeyboard()
  const direction = useDirection(props.dir)

  provideMenuContext({
    open,
    onOpenChange(open) {
      props.onUpdateOpen?.(open)
    },
  })

  provideMenuRootContext({
    onClose() {
      props.onUpdateOpen?.(false)
    },
    isUsingKeyboardRef,
    dir: direction,
    modal,
  })

  usePooperRoot()
}

// UTILS

export const SELECTION_KEYS = ['Enter', ' ']
export const FIRST_KEYS = ['ArrowDown', 'PageUp', 'Home']
export const LAST_KEYS = ['ArrowUp', 'PageDown', 'End']
export const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS]
export const SUB_OPEN_KEYS: Record<Direction, string[]> = {
  ltr: [...SELECTION_KEYS, 'ArrowRight'],
  rtl: [...SELECTION_KEYS, 'ArrowLeft'],
}
export const SUB_CLOSE_KEYS: Record<Direction, string[]> = {
  ltr: ['ArrowLeft'],
  rtl: ['ArrowRight'],
}

let subscribers = 0
const isUsingKeyboardRef = useRef(false)

function handlePointer() {
  isUsingKeyboardRef.value = false
}

function handleKeyDown() {
  isUsingKeyboardRef.value = true
}

export function useIsUsingKeyboard() {
  if (subscribers > 0)
    return isUsingKeyboardRef

  onMounted(() => {
    if (subscribers > 0)
      return

    subscribers += 1
    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: true })
    document.addEventListener('pointerdown', handlePointer, { capture: true, passive: true })
    document.addEventListener('pointermove', handlePointer, { capture: true, passive: true })
  })

  onBeforeUnmount(() => {
    if (subscribers <= 0)
      return
    subscribers -= 1

    document.removeEventListener('pointerdown', handlePointer, { capture: true })
    document.removeEventListener('pointermove', handlePointer, { capture: true })

    document.removeEventListener('keydown', handleKeyDown, { capture: true })
  })

  return isUsingKeyboardRef
}
