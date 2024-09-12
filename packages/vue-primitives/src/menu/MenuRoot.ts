import { onBeforeUnmount, onMounted, type Ref } from 'vue'
import { createCollection } from '../collection/Collection.ts'
import { createContext, type MutableRefObject, useRef } from '../hooks/index.ts'
import type { Direction } from '../direction/index.ts'

export interface MenuRootProps {
  open?: boolean
  dir?: Direction
  modal?: boolean
}

// eslint-disable-next-line ts/consistent-type-definitions
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

export interface ItemData { menu: { disabled: boolean, textValue: string } }
export const [Collection, useCollection] = createCollection< HTMLDivElement, ItemData>('Menu')

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

export function useIsUsingKeyboard() {
  if (subscribers > 0)
    return isUsingKeyboardRef

  function handlePointer() {
    isUsingKeyboardRef.current = false
  }

  function handleKeyDown() {
    isUsingKeyboardRef.current = true
  }

  onMounted(() => {
    if (subscribers > 0)
      return
    subscribers += 1
    document.addEventListener('keydown', handleKeyDown, { capture: true, passive: true })
    document.addEventListener('pointerdown', handlePointer, { capture: true, passive: true })
    document.addEventListener('pointermove', handlePointer, { capture: true, passive: true })
  })

  onBeforeUnmount(() => {
    subscribers -= 1

    if (subscribers !== 0)
      return

    document.removeEventListener('pointerdown', handlePointer, { capture: true })
    document.removeEventListener('pointermove', handlePointer, { capture: true })

    document.removeEventListener('keydown', handleKeyDown, { capture: true })
  })

  return isUsingKeyboardRef
}
