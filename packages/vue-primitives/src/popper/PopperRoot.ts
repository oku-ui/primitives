import type { Ref } from 'vue'
import { createContext } from '../hooks/index.ts'

export interface Measurable {
  getBoundingClientRect: () => DOMRect
}

export interface PopperContext {
  anchor: Ref<Measurable | undefined>
  onAnchorChange: (newAnchor: Measurable | undefined) => void
}

export const [providePopperContext, usePopperContext] = createContext<PopperContext>('Popper')
