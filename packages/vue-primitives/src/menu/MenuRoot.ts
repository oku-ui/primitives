import type { EmitsToHookProps } from '../shared/typeUtils.ts'
import { type MaybeRefOrGetter, onBeforeUnmount, onMounted, type Ref } from 'vue'
import { createCollection } from '../collection/Collection.ts'
import { type Direction, useDirection } from '../direction/index.ts'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'
import { usePooperRoot } from '../popper/PopperRoot.ts'

export interface MenuRootProps {
  open?: boolean
  dir?: Direction
  modal?: boolean
}

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
  const { open = () => false } = props
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
    modal: props.modal ?? true,
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
