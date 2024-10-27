import type { MaybeRefOrGetter, Ref } from 'vue'
import { createContext, type MutableRefObject } from '@oku-ui/hooks'

export interface SelectContentContext {
  content: Ref<HTMLElement | undefined>
  viewport: Ref<HTMLElement | undefined>
  onViewportChange: (node: HTMLElement | undefined) => void
  itemRefCallback: (node: HTMLElement | undefined, value: string, disabled: boolean) => void
  selectedItem: Ref<HTMLElement | undefined>
  onItemLeave: () => void
  itemTextRefCallback: (
    node: HTMLElement | undefined,
    value: string,
    disabled: boolean
  ) => void
  focusSelectedItem: () => void
  selectedItemText: Ref<HTMLElement | undefined>
  position?: 'item-aligned' | 'popper'
  isPositioned: Ref<boolean>
  searchRef: MaybeRefOrGetter<string>
}

export const [provideSelectContentContext, useSelectContentContext] = createContext<SelectContentContext>('SelectContent')

export const CONTENT_MARGIN = 10
