import { type Ref, shallowRef } from 'vue'
import { createContext } from '../hooks/index.ts'

export interface Measurable {
  getBoundingClientRect: () => DOMRect
}

export interface PopperContext {
  content: Ref<HTMLElement | undefined>
  anchor: Ref<Measurable | undefined>
  onAnchorChange: (newAnchor: Measurable | undefined) => void
}

export const [providePopperContext, usePopperContext] = createContext<PopperContext>('Popper')

export interface UsePooperRootProps {
  content?: Ref<HTMLElement | undefined>
  anchor?: Ref<Measurable | undefined>
}

export function usePooperRoot(props?: UsePooperRootProps) {
  const content = props?.content ?? shallowRef<HTMLElement>()
  const anchor = props?.anchor ?? shallowRef<Measurable>()

  providePopperContext({
    content,
    anchor,
    onAnchorChange(newAnchor) {
      anchor.value = newAnchor
    },
  })
}
